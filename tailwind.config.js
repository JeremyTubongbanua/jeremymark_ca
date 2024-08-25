/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
   theme: {
      extend: {
         colors: {
            purple: {
               400: "#9F7AEA",
            },
            bg: {
               100: "#482F9D",
            },
            secondary: {
               100: "#190B4A",
            },
         },
         spacing: {
            128: "32rem",
            144: "36rem",
         },
         fontSize: {
            "4xl": ["3rem", { lineHeight: "1.2" }],
         },
         borderRadius: {
            lg: "1rem",
         },
         keyframes: {
            fadeIn: {
               "0%": { opacity: "0" },
               "100%": { opacity: "1" },
            },
            slideIn: {
               "0%": { transform: "translateX(-100%)", opacity: "0" },
               "100%": { transform: "translateX(0)", opacity: "1" },
            },
         },
         animation: {
            fadeIn: "fadeIn 1s ease-in-out forwards",
            slideIn: "slideIn 1s ease-in-out forwards",
         },
         fontFamily: {
            jockey: ["Jockey One", "sans-serif"],
            inter: ["Inter", "sans-serif"],
         },
      },
   },
   plugins: [],
};
