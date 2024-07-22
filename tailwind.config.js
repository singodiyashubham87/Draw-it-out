/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}", "./*.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bgBlack: "#212325",
        lightBlue: "#9CDAF1",
        darkBlue: "#368186",
        lightRed: "#F4CBB2",
        lightGrey: "#ABABAB",
        darkGrey: "#2E3136",
        linkedin: "#0077b5",
        twitter: "#1da1f2",
        youtube: "#c31a1e",
        github: "#333",
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
      backgroundImage: {
        instagram:
          "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%)",
      },
      textColor: {
        instagram: "#e1306c",
      },
    },
  },
  plugins: [],
};
