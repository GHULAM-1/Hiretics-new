import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#16A34A',
        secondary: '#9333EA',
        accent: '#F59E0B',
        green: 'var(--green)',
      },
    },
  },
  plugins: [],
};

export default config;
