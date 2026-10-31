// tailwind.config.ts – central design tokens for the portfolio
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // enable class‑based dark mode (can be toggled via a "dark" class on <html>)
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00AEBB', // main teal accent
        secondary: '#E8E4D3', // warm ivory
        accent: '#2DD4BF', // complementary cyan for education type
        danger: '#FF5252', // optional for future use
        success: '#2DA44E', // existing green used for live badge
      },
      fontFamily: {
        // "editorial" is a custom display type used for headings – keep it if defined elsewhere
        display: ['"Inter"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      spacing: {
        // custom spacing tokens for consistent gutters
        4.5: '1.125rem',
        5.5: '1.375rem',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
};

export default config;
