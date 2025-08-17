import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"SF Pro Display"',
          'Inter',
          'system-ui',
          'Roboto',
          'Segoe UI',
          'Helvetica Neue',
          'Arial'
        ]
      },
      colors: {
        appleInk: '#0b0b0b',
        appleMist: '#f6f7fb',
        glassBorder: 'rgba(255,255,255,0.5)'
      },
      backdropBlur: {
        xs: '6px'
      }
    }
  },
  plugins: []
};

export default config;
