export function wrapHTML(inner) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link rel="stylesheet" href="./styles.css">
        <!-- <link rel="stylesheet" href="../tailwind.css"> -->
        
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        ${inner}
      </body>
    </html>

  `
}