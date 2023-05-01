/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'azul': '#3AA0FF',
      'white': '#fff',
      'tomEscuro': '#170F49',
      'cinza': '#5E597A',
      'cinzaClaro': '#EFF0F6'
    },
    fontFamily: {
      'dmsans': ['DM Sans', 'sans-serif'],
      'robot': ['Roboto', 'sans-serif']
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#3AA0FF",
          "secondary": "#170F49",
          "accent": "#979797",
          "neutral": "#1E1E1E",
          "base-100": "#fff",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
