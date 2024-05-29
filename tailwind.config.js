/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}", "./*.html"],
  darkMode:"class",
  theme: {
    extend: {
      colors: {
        bgBlack: "#212325",
        lightBlue: "#9CDAF1",
        darkBlue: "#368186",
        lightRed: "#F4CBB2",
        lightGrey: "#ABABAB",
        darkGrey: "#2E3136",
      },
      fontFamily: {
        primary: "Arvo",
      },
      screens: {
        xxl: "1751px",
        mmd: "851px",
        gsm: "571px",
        msm: "491px",
        vsm: "441px",
        vvsm: "351px",
      },
      boxShadow: {
        vsm: "0px 0px 3px #a5a8a8",
        mdm: "0px 0px 5px #727575",
      },
      backgroundColor: {
        'dark-bg': '#2E3136', 
      },
      textColor: {
        'dark-text': '#F4CBB2', 
      },
    },
  },
  plugins: [],
};
