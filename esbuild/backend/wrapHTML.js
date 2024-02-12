export function wrapHTML(inner) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta name="description" content="Blot!" />
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link rel="stylesheet" href="./styles.css">
        <script src="https://cdn.tailwindcss.com"></script>
        
        <!-- <link rel="stylesheet" href="../tailwind.css"> -->
        
        <!-- <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"></script> -->

        <!-- <script leave-it src="./tailwindjit.js"></script> -->
      </head>
      <body>
        ${inner}
      </body>
    </html>

  `
}