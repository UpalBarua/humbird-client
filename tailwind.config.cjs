/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '15rem',
        },
      },
      colors: {
        dark: {
          300: '#33454c',
          400: '#1a2e35',
          500: '#00171F',
        },
        light: {
          300: '#ffffff',
          400: '#e6e8e9',
          500: '#ccd1d2',
        },
        accent: {
          300: '#35baea',
          400: '#1eb2e8',
          500: '#1ba0d1',
        },
      },
      fontFamily: {
        primary: 'IBM Plex Sans',
        secondary: 'IBM Plex Sans Condensed',
      },
    },
  },
  plugins: [],
};
