/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,svelte,js,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["aqua", "dark",
      {
        mytheme: {
          "primary": "#489FB5",
          "secondary": "#82C0CC",
          "accent": "#FFA62B",
          "neutral": "#EDE7E3",
          "base-100": "#16697A",
          "info": "#489FB5",
          "success": "#82C0CC",
          "warning": "#a25800",
          "error": "#c50028",
        }
      },
    ]
  }
}

