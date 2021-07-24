module.exports = {
  purge: [],
  // purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      poppins: ["Poppins"],
      // noto: ["Noto Sans"],
    },
    extend: {
      zIndex: {
        minus1: "-1",
      },
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      bggrey: "#f9fafc",
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
