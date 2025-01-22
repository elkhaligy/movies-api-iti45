/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./client/public/**/*.html", "./client/src/**/*.js"],
  theme: {
    extend: {
      animation: {
        borderPulse: 'borderPulse 2s infinite',
        spin: 'spin 1s linear infinite'
      },
      keyframes: {
        borderPulse: {
          '0%': { borderColor: '#ffffff' },
          '50%': { borderColor: '#ffaded' },
          '100%': { borderColor: '#ff5733' },
        },
        spin: {
          '0%' :{transform: 'rotate-0'},
          '100%':{transform: 'rotate-360'}
        }
      },  
    },
  },
  
  plugins: [],
  
}

