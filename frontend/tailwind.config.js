/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      boxShadow: {
        '3D': '0.5px 2px 0 1px rgba(153, 137, 194, 100)',
      },
      
    },
    colors: {
      primary: {
        // 100: "#1877f2",
        100: "#FBCB34",
        80: "#FBCB34cc", // 80% opacity
        60: "#FBCB3499", // 60% opacity
        40: "#FBCB3466", // 40% opacity
        20: "#FBCB3433", // 20% opacity
        10: "#FBCB341a", // 10% opacity
      },
      dark: "#000",
      black: {
        100: "#181818",
        80: "#181818cc", // 80% opacity
        60: "#18181899", // 60% opacity
        40: "#18181866", // 40% opacity
        20: "#18181833", // 20% opacity
        10: "#8888881a", // 10% opacity
        0: "rgba(138,137,137,0.2)", // for border
      },
      white: {
        100: "#ffffff",
        80: "#ffffffcc", // 80% opacity
        60: "#ffffff99", // 60% opacity
        40: "#ffffff66", // 40% opacity
        20: "#ffffff33", // 20% opacity
        10: "#ffffff1a", // 10% opacity
        0 : "#303030",
      },
      gray: {
        100: "#f0f2f5",
      },
      success: {
        100: "#48DA5F",
        80: "#48DA5Fcc", // 80% opacity
        60: "#48DA5F99", // 60% opacity
        40: "#48DA5F66", // 40% opacity
        20: "#48DA5F33", // 20% opacity
        10: "#48DA5F1a", // 10% opacity
      },
      danger: {
        100: "#eb6161",
        80: "#eb6161cc", // 80% opacity
        60: "#eb616199", // 60% opacity
        40: "#eb616166", // 40% opacity
        20: "#eb616133", // 20% opacity
        10: "#eb61611a", // 10% opacity
      },
      warning: {
        100: "#DE911E",
      },
    },
    fontFamily: {
      sans: "RobotoMd",
      bold: "RobotoBold",
      md: "RobotoMd",
      sm : "RobotoSm"
    },
    fontSize: {
      "title-1": "64px",
      "title-2": "46px",
      "title-3": "40px",
      "subtitle-1": "32px",
      "subtitle-2": "24px",
      "subtitle-3": "20px",
      lead: "18px",
      base: "16px",
      "small-1": "14px",
      "small-2": "12px",
      "small-3" : "10px",
      icon: "20px",
    },
  },

  variants: {
    extend: {
      scrollbar: ['rounded', 'hover'],
      
    },
  },

  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/typography'),
  ],
}