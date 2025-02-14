/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // 自定义背景色
        background: {
          DEFAULT: "#ffffff", // 默认背景色
          dark: "#141414", // 修改为 #141414
        },
      },
    },
  },
  plugins: [],
};
