const plugin = require("@nipacloud/nc-design-system/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.{tsx,html}"],
  theme: {
    extend: {
      colors:{
        white:'#ffffff',
        black_theme:'#2C3333',
        dark_green_theme:'#2E4F4F',
        green_theme:'#0E8388',
        light_green_theme:'#CBE4DE'
      },
    },
  },
  plugins: plugin,
};
