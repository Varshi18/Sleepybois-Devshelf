/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
      },
      height: {
        '128': '32rem',
      },
      colors: {
        
      },
      scale: {
        '135': '1.35',
      },
      colors: {
        'black': '#000000',
        'darkvader': '#14e481',
        'navcolor': '0f0f0f',
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}