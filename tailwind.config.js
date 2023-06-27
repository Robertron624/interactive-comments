/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Rubik', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
      },
    },
    colors: {
      'moderated-blue': 'hsl(238, 40%, 52%)',
      'soft-red' : 'hsl(358, 79%, 66%)',
      'light-grayish-blue': 'hsl(239, 57%, 85%)',
      'pale-red': 'hsl(357, 100%, 86%)',
      'dark-blue': 'hsl(212, 24%, 26%)',
      'grayish-blue': 'hsl(211, 10%, 45%)',
      'light-gray': 'hsl(223, 19%, 93%)',
      'very-light-gray': 'hsl(228, 33%, 97%)',
      'white': 'hsl(0, 0%, 100%)',
    }
  },
  plugins: [
    require('daisyui')
  ],
}
