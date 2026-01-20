module.exports = {
  theme: {
    extend: {
      keyframes: {
        'loading-bar': {
          '0%': { transform: 'scaleX(0)' },
          '50%': { transform: 'scaleX(0.7)' },
          '100%': { transform: 'scaleX(1)' },
        }
      },
      animation: {
        'loading-bar': 'loading-bar 2s ease-in-out infinite',
      }
    },
  },
}