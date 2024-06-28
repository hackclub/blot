/** @type {import('tailwindcss').Config} */
export default {
  content: ["./backend/**/*", "./src/**/*"],
  theme: {
    extend: {
      colors: {
        'dark-mode-blue': '#1E7898',
        'dark-mode-grey' : '#2e3235'
      },
    },
  },
  plugins: [],
}

