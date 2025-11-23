/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex:{
        '100': '100'
      },
      backgroundImage:{
        "netflix-image": "url('https://assets.nflxext.com/ffe/siteui/vlv3/6cefb2f5-90be-4f57-adc4-f6c3c579273d/3943990c-f4e0-4147-82ad-f531e2b547f3/IN-en-20240401-popsignuptwoweeks-perspective_alpha_website_medium.jpg')",
        "strange-things": "url('https://wallpapercave.com/wp/wp14499896.jpg')",
      }
    },
  },
  plugins: [],
}

