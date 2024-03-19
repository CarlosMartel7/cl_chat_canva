/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "chat-user": "#d3dcfd",
        "chat-friend": "#fff",
        "chat-primary": "#111b21",
        "chat-secondary": "#6f8171"
      }
    },
  },
  plugins: [],
}
