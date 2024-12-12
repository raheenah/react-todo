/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FDF0F0",
        primary: "#F8C3D9",
        secondary: "#CFA2DD",
        text: {
          primary: "#4D3C4E",
          secondary: "#A88CA9",
        },
        button: {
          bg: "#FF7F9E",
          hover: "#F75D7D",
          delete: {
            bg: "#F28C8C",
            hover: "#E66B6B",
          },
          cancel: {
            bg: "#D9D9D9",
            hover: "#B3B3B3",
          },
        },
        border: "#E4A1CA",
        accent: "#E8D1E8",
      },
      boxShadow: {
        "custom-hover": "0 4px 6px rgba(0, 0, 0, 0.1)",
        "custom-focus": "0 0 8px 4px rgba(248, 195, 217, 0.6)",
        "custom-top": "-4px 0 6px rgba(248, 195, 217, 0.4)",
        "custom-bottom": "0 4px 6px rgba(248, 195, 217, 0.4)",
      },
    },
  },
  plugins: [],
};
