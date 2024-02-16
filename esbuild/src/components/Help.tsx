import styles from "./Help.module.css";
import { useState, useEffect } from "preact/hooks";
import { marked } from "marked";
import { loadCodeFromString } from "../lib/loadCodeFromString.ts";
// import Prism from "prismjs";
import hljs from "highlight.js";

marked.setOptions({
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "markup";

    // console.log(code);

    return hljs.highlight(code, { language }).value;

    // const validLanguage = Prism.languages[language] ? language : 'markup'
    // return Prism.highlight(code, Prism.languages[validLanguage], validLanguage)
  },
});

export default function Help({
  toggleClose,
  helpHeight,
}: {
  toggleClose: () => void;
  helpHeight: number;
}) {
  const closed = helpHeight <= 0;

  const [tab, setTab] = useState<"workshop" | "toolkit">("toolkit");

  const currentUrl = new URL(window.location.href);
  const workshop = currentUrl.searchParams.get("guide");
  const [workshopContent, setWorkshopContent] = useState({
    frontMatter: {},
    htmlContent: "",
  });

  const [helpContent, setHelpContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const helpRes = await fetch(
        `https://raw.githubusercontent.com/hackclub/blot/main/docs/TOOLKIT.md`,
      );
      const helpData = await helpRes.text();

      setHelpContent(marked(helpData));

      if (workshop === null) return;

      if (confirm("Clear text editor?"))
        loadCodeFromString(`// Check the workshop tab to get started

const { iteratePolylines, Turtle, cut, cover, pointInPolylines, scale, rotate, translate, originate, rand, randInRange, randIntInRange, setRandSeed, noise, getAngleAtT, getPointAtT, getNormalAtT, resample, simplify, trim, svgToPolylines, bounds, displace } = toolkit;

const width = 125;
const height = 125;

setDocDimensions(width, height);

setRandSeed(14);

const finalPolylines = [];
const t = new Turtle();

for (let i = 0; i < 52; i++) {
  t.forward(i);
  t.right(91);
}

// add turtle to final lines
finalPolylines.push(...t.polylines());

// center piece
const cc = bounds(finalPolylines).cc;
translate(finalPolylines, [width / 2, height / 2], cc);

// draw it
drawPolylines(finalPolylines);
`);

      const res = await fetch(
        `https://raw.githubusercontent.com/hackclub/blot/main/guides/${workshop}.md`,
      );
      const data = await res.text();

      const result = parseMDFrontMatter(data);

      setWorkshopContent(result);
      setTab("workshop");
    };

    fetchData();
  }, []);

  return (
    <>
      <div
        class={[styles.helpSection, "help-section"].join(" ")}
        style={{ height: `${helpHeight}%` }}
      >
        <div class={styles.helpSectionToolbar}>
          {workshop && (
            <a
              className={styles.helpSectionTab}
              style={{
                backgroundColor:
                  tab == "workshop" ? "rgba(var(--primary-rgb), 0.9)" : "",
              }}
              onClick={() => {
                setTab("workshop");
                if (closed) toggleClose();
              }}
            >
              Workshop
            </a>
          )}
          <a
            className={styles.helpSectionTab}
            style={{
              backgroundColor:
                tab == "toolkit" ? "rgba(var(--primary-rgb), 0.9)" : "",
            }}
            onClick={() => {
              setTab("toolkit");
              if (closed) toggleClose();
            }}
          >
            Toolkit
          </a>
          <a className={styles.helpSectionTab} onClick={toggleClose}>
            {closed ? "Open Help" : "Close Help"}
          </a>
        </div>
        {tab === "toolkit" && (
          <div
            dangerouslySetInnerHTML={{ __html: helpContent }}
            class={styles.helpContent}
          ></div>
        )}
        {tab === "workshop" && (
          <div class={styles.helpContent}>
            <h1>{workshopContent.frontMatter.title}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: workshopContent.htmlContent,
              }}
            ></div>
          </div>
        )}
      </div>
    </>
  );
}

function parseMDFrontMatter(mdString) {
  // Check if string starts and ends with ---
  if (!mdString.startsWith("---") || !mdString.includes("\n---\n")) {
    throw new Error("No frontmatter detected");
  }

  // Split the string at the second occurrence of ---
  const parts = mdString.split("---", 2);
  const frontMatterString = parts[1].trim();

  // Convert frontMatter string to an object (assuming YAML format)
  const frontMatter = frontMatterString.split("\n").reduce((acc, line) => {
    const [key, ...valueParts] = line.split(":");
    acc[key.trim()] = valueParts.join(":").trim();
    return acc;
  }, {});

  // Get the Markdown content without the frontMatter
  const contentString = mdString
    .replace(`---\n${frontMatterString}\n---`, "")
    .trim();
  const htmlContent = marked(contentString);

  return {
    frontMatter,
    htmlContent,
  };
}
