/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'github': {
          100: "#9BA0A6",
          900: "#0D1117",
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

