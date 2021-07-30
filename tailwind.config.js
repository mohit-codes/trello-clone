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
        4: "4",
      },
      width: {
        800: "800px",
      },
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      bggray: "#f6f7fb",
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
