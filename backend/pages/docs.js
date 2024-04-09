import fs from 'fs';
import { extractFrontmatter } from "../extractFrontmatter.js";
import hljs from "highlight.js";
import { marked } from "marked";

const renderer = new marked.Renderer();

renderer.heading = (text, level, raw, slugger) => {
  if (level === 1) return `<h1 class="text-3xl font-sans font-semibold text-gray-800 py-2">${text}</h1>`;
  if (level === 2) return `<h2 id="${text.toLowerCase()}" class="text-2xl font-sans font-semibold text-gray-800 py-2">${text}</h1>`;
  if (level === 3) return `<h3 id="${text.slice(0, text.indexOf("("))}" class="text-xl font-sans font-semibold text-blue-500 py-2">${text}</h1>`;
  else return `<h1>${text}</h1>`
};

renderer.paragraph = (text) => {
  return `<p class="font-sans">${text}</p>`
};

renderer.list = (...args) => {
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

export default function() {

  const rawMarkdown = fs.readFileSync("./docs/DOCUMENTATION.md", 'utf8');
  
  const html = marked(rawMarkdown);



  return `
    <style>
      code {
        background: #eaeaea;
        border-radius: 0.25rem;
        padding-left: 0.25rem;
        padding-right: 0.25rem;
      }

      pre {
        background: #eaeaea;
        border-radius: 0.25rem;
        margin-top: .5rem;
        margin-bottom: .5rem;
        padding-left: 0.25rem;
        padding-right: 0.25rem;
      }

      .md-container {
        max-width: 800px;
        padding: 1rem;
        margin: auto;
      }
    </style>
    <div class="md-container">
      ${html}
    </div>
    <script>
      // Function to scroll to the element and briefly highlight it
      function scrollToElementAndHighlight(hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          // Briefly make the background yellow
          targetElement.style.backgroundColor = '#fceb80';

          // Calculate the position to scroll to
          const elementRect = targetElement.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.pageYOffset;
          const middlePosition = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);

          // Scroll to the element
          window.scrollTo({
            top: middlePosition,
            behavior: 'smooth'
          });

          // Optionally, revert the background color after scrolling
          setTimeout(() => {
            targetElement.style.backgroundColor = ''; // Revert to original or specified background color
          }, 1000); // Adjust time as needed
        }
      }

      // Handle initial hash, if present, on page load
      if (window.location.hash) {
        scrollToElementAndHighlight(window.location.hash);
      }

      // Listen for hash changes to handle in-page navigation or direct URL hash navigation
      window.addEventListener('hashchange', function() {
        scrollToElementAndHighlight(window.location.hash);
      });
    </script>
  `
}


