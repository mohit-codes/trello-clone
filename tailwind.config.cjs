module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    fontFamily: {
      poppins: ["Poppins"],
    },

    extend: {
      zIndex: {
        minus1: "-1",
        4: "4",
      },
      minWidth: { "12rem": "12rem" },
      minHeight: { "5rem": "5rem" },
      height: {
        400: "400px",
        300: "300px",
        600: "600px",
        500: "500px",
        800: "800px",
      },
      width: {
        300: "300px",
        600: "600px",
        500: "500px",
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
