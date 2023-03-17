/* eslint-disable import/no-extraneous-dependencies */
const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      screen: {
        xs: '0px',
        sm: '600px',
        md: '900px',
        lg: '1200px',
        xl: '1536px',
        '2xl': '2100px',
      },
      colors: {
        primary: '#3c7daa',
        secondary: '#95251e',
      },
    },
  },
  variants: {},
  plugins: [
    plugin(({ addUtilities }) => { // Custom utilities
      const newUtilities = {
        '.row': {
          display: 'flex',
          'flex-wrap': 'wrap',
        },
        '.stack': {
          display: 'flex',
          'flex-direction': 'column',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    })
  ],
};
