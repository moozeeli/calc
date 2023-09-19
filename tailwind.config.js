
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      scale: {
        flip: "-1" // https://github.com/tailwindlabs/tailwindcss/discussions/2146#discussioncomment-1996102
      },
      screens: {
        "max-md": { max: "767px" }
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
};
