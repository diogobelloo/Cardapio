/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
       "./index.html",
    "./styles/**/*.css",
    "./scripts/**/*.js"
  ],
  theme: {
    fontFamily:{
      'sans':['Poppins','Sanserif']
    },
    extend: {
      backgroundImage:{
        "home":"url('../images/bg.png')"
      }
    },
  },
  plugins: [],
}

