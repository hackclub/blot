// import { compiledContent } from '../../../interface/README.md'
import styles from './Help.module.scss'
import { useState, useEffect } from 'preact/hooks'
import { marked } from 'marked'

// const html = compiledContent()

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
  const workshop = currentUrl.searchParams.get('tutorial')
  const [workshopContent, setWorkshopContent] = useState({
    slug: `/guide/${workshop}`,
    frontMatter: {},
    htmlContent: ''
  })

  const [helpContent, setHelpContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const helpRes = await fetch(
        `https://raw.githubusercontent.com/hackclub/blot/main/interface/README.md`
      )
      const helpData = await helpRes.text()

      setHelpContent(marked(helpData));

      if (workshop === null) return

      const res = await fetch(
        `https://raw.githubusercontent.com/hackclub/blot/main/guides/${workshop}.md`
      )
      const data = await res.text()

      const result = parseMDFrontMatter(data)
      result.slug = `/guide/${workshop}`

      setWorkshopContent(result);
      setTab('workshop');
    }

    fetchData()
  }, [])

  return (
    <>
      <div class={styles.helpSection} style={{ height: `${helpHeight}%` }}>
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
            <p>
              <a href={`/guide/${workshopContent.slug}`}>Open as full page</a>
            </p>
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
