module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        keyboardBg : '#D3D6DA',
        keyAbsent: '#787c7e',
        keyCorrect: '#6aaa64',
        keyPresent: '#eab308',
        white: '#FFFFFF'
      },
      height:{
        'header': '6vh',
        'game': '85vh'
      }
    },
    
  },
  plugins: [],
}