import styles from "./Help.module.css";
import { useState, useEffect } from "preact/hooks";
import { marked } from "marked";
import { defaultProgram } from "../defaultProgram.js";
import { loadCodeFromString } from "../loadCodeFromString.ts";
import { patchStore, getStore } from "../state.ts";
// import Prism from "prismjs";
import hljs from "highlight.js";

const renderer = new marked.Renderer();

renderer.heading = (text, level, raw, slugger) => {
  
  if (level === 1) return `<h1 class=${styles.h1}>${text}</h1>`;
  if (level === 2) return `<h1 class=${styles.h2}>${text}</h1>`;
  if (level === 3) return `<h1 class=${styles.h3}>${text}</h1>`;
  else return `<h1>${text}</h1>`
};

renderer.paragraph = (text) => {
  return `<p class="font-sans">${text}</p>`
};

renderer.list = (...args) => {
  console.log(args);
  return `${args[0]}`
};

renderer.code = (code, infostring, escaped) => {
  const highlighted = infostring === "js"
    ? hljs.highlight(code, { language: infostring }).value
    : code;
  return `<pre class="overflow-x-auto"><code>${highlighted}</code></pre>`;
};

marked.setOptions({
  renderer
});

export default function Help({
  toggleClose,
  helpHeight,
}: {
  toggleClose: () => void;
  helpHeight: number;
}) {
  const { theme } = getStore()
  
  let css = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"
  let isDark = false
  if(theme == "dark"){
    css = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
    isDark = true
  }
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
        `/TOOLKIT.md`,
      );
      const helpData = await helpRes.text();

      const htmlString = marked(helpData);

      setHelpContent(htmlString);

      if (workshop === null) return;

      if (confirm("Reset text editor?"))
        loadCodeFromString(`${defaultProgram}`);

      // TODO Oz added this hack 2024-03-13 to save his sanity while developing the
      // getting started guide. But hey, wouldn't the sane thing be to serve from our own server
      // anyway, ideally having already converted to html at compile time?
      const path = workshop === 'start' ? '/getting-started/index.md' :
        `https://raw.githubusercontent.com/hackclub/blot/main/guides/${workshop}.md`;

      const res = await fetch(path);
      const data = await res.text();

      const result = parseMDFrontMatter(data);

      setWorkshopContent(result);
      setTab("workshop");
    };

    fetchData();
  }, []);

  return (
   
    <>
       <link rel="stylesheet" href={css}></link>
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
                  tab == "workshop" ?  (isDark ? "rgba(15, 57, 77, 0.89)" : "rgba(var(--primary-rgb), 0.9)") : "",
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
                tab == "toolkit" ? (isDark ? "rgba(15, 57, 77, 0.89)" : "rgba(var(--primary-rgb), 0.9)") : "",
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
            <h1 class={styles.h2}>{workshopContent.frontMatter.title}</h1>
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
