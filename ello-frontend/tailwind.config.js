/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14213D',
        graphite: '#263238',
        muted: '#667085',
        line: '#E6E8EC',
        cloud: '#F7F9FC',
        card: '#FFFFFF',
        brand: '#0B7A75',
        brandDark: '#075E59',
        coral: '#FF6B5F',
        gold: '#F2B84B',
        sky: '#DDF3FF'
      },
      boxShadow: {
        premium: '0 18px 60px rgba(20, 33, 61, 0.12)',
        soft: '0 10px 30px rgba(20, 33, 61, 0.08)'
      },
      borderRadius: {
        shell: '28px',
        panel: '20px'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
