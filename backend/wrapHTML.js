export function wrapHTML(inner) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta name="description" content="Blot!" />
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="title" content="blot">
        <script defer data-domain="blot.hackclub.com" src="https://plausible.io/js/script.js"></script>

        <link rel="icon" type="image/svg+xml" href="/assets/borpheus.svg" id="favicon">
        <script>
          function changeFavicon() {
            const favicon = document.getElementById('favicon');
            const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            if (darkModeMediaQuery.matches) {
              favicon.href = '/assets/borpheus.svg'; // White favicon for dark mode
            } else {
              favicon.href = '/assets/black-borpheus.svg'; // Black favicon for light mode
            }
          }

          // Initial check
          changeFavicon();

          // Listener for changes in color scheme
          window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', changeFavicon);
        </script>

        <link rel="stylesheet" href="./styles.css">
        <script src="https://cdn.tailwindcss.com"></script>
        
        <!-- <link rel="stylesheet" href="../tailwind.css"> -->
        
        <!-- <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"></script> -->

        <!-- <script leave-it src="./tailwindjit.js"></script> -->
      </head>
      <body class="overflow-x-hidden">
        ${inner}
      </body>
    </html>

  `
}




