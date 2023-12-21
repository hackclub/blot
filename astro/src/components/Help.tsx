import styles from './Help.module.css'
import { useState, useEffect } from 'preact/hooks'
import { Marked } from 'marked'
import { loadCodeFromString } from '../lib/loadCodeFromString.ts'
// import Prism from "prismjs";
import hljs from 'highlight.js';
import {markedHighlight} from "marked-highlight";

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);


export default function Help({
  toggleClose,
  helpHeight
}: {
  toggleClose: () => void
  helpHeight: number
}) {
  const closed = helpHeight <= 0

  const [tab, setTab] = useState<'workshop' | 'toolkit'>('toolkit')

  const currentUrl = new URL(window.location.href)
  const workshop = currentUrl.searchParams.get('guide')
  const [workshopContent, setWorkshopContent] = useState({
    frontMatter: {},
    htmlContent: ''
  })

  const [helpContent, setHelpContent] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const helpRes = await fetch(
        `https://raw.githubusercontent.com/hackclub/blot/main/docs/TOOLKIT.md`
      )
      const helpData = await helpRes.text()

      setHelpContent(marked(helpData))

      if (workshop === null) return

      if (confirm('Clear text editor?'))
        loadCodeFromString(`// Check the workshop tab to get started

const width = 125;
const height = 125;

setDocDimensions(width, height);

const testTurtle = createTurtle();

testTurtle.forward(100);

testTurtle.translate(
  [width/2, height/2], 
  testTurtle.cc
);

drawTurtles([
    testTurtle
]);
`)

      const res = await fetch(
        `https://raw.githubusercontent.com/hackclub/blot/main/guides/${workshop}.md`
      )
      const data = await res.text()

      const result = parseMDFrontMatter(data)

      setWorkshopContent(result)
      setTab('workshop')
    }

    fetchData()
  }, [])

  return (
    <>
      <div
        class={[styles.helpSection, 'help-section'].join(' ')}
        style={{ height: `${helpHeight}%` }}>
        <div class={styles.helpSectionToolbar}>
          {workshop && (
            <a
              className={styles.helpSectionTab}
              style={{
                backgroundColor:
                  tab == 'workshop' ? 'rgba(var(--primary-rgb), 0.9)' : ''
              }}
              onClick={() => {
                setTab('workshop')
                if (closed) toggleClose()
              }}>
              Workshop
            </a>
          )}
          <a
            className={styles.helpSectionTab}
            style={{
              backgroundColor:
                tab == 'toolkit' ? 'rgba(var(--primary-rgb), 0.9)' : ''
            }}
            onClick={() => {
              setTab('toolkit')
              if (closed) toggleClose()
            }}>
            Toolkit
          </a>
          <a className={styles.helpSectionTab} onClick={toggleClose}>
            {closed ? 'Open Help' : 'Close Help'}
          </a>
        </div>
        {tab === 'toolkit' && (
          <div
            dangerouslySetInnerHTML={{ __html: helpContent }}
            class={styles.helpContent}></div>
        )}
        {tab === 'workshop' && (
          <div class={styles.helpContent}>
            <h1>{workshopContent.frontMatter.title}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: workshopContent.htmlContent
              }}></div>
          </div>
        )}
      </div>
    </>
  )
}

function parseMDFrontMatter(mdString) {
  // Check if string starts and ends with ---
  if (!mdString.startsWith('---') || !mdString.includes('\n---\n')) {
    throw new Error('No frontmatter detected')
  }

  // Split the string at the second occurrence of ---
  const parts = mdString.split('---', 2)
  const frontMatterString = parts[1].trim()

  // Convert frontMatter string to an object (assuming YAML format)
  const frontMatter = frontMatterString.split('\n').reduce((acc, line) => {
    const [key, ...valueParts] = line.split(':')
    acc[key.trim()] = valueParts.join(':').trim()
    return acc
  }, {})

  // Get the Markdown content without the frontMatter
  const contentString = mdString
    .replace(`---\n${frontMatterString}\n---`, '')
    .trim()
  const htmlContent = marked(contentString)

  return {
    frontMatter,
    htmlContent
  }
}
