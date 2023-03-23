const defaultTheme = require("tailwindcss/defaultConfig");

module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  important: true,
  theme: {
    ...defaultTheme,
    // colors: {
    //   ...defaultTheme.colors,
    //   // primary: '#3b81f6',
    //   light: "#b0b0ff",
    //   lighter: "#d8d8ff",
    //   lightest: "#ebebff",
    //   dark: "#00008b",
    //   darker: "#00004e",
    //   darkest: "#000027",
    //   white: "#ffffff",
    //   text: {
    //     DEFAULT: "#1f2937",
    //     light: "#6c7281",
    //     danger: "#ff0000",
    //   },
    //   light: {
    //     DEFAULT: "#fafbfc",
    //     lighter: "#f3f4f6",
    //   },
    // },
    extend: {},
  },
  plugins: [],
};
