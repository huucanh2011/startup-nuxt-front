module.exports = {
  purge: [
    './component/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.js',
    './nuxt.config.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'tag-red': '#f50',
        'tag-blue-1': '#2db7f5',
        'tag-green': '#87d068',
        'tag-blue-2': '#108ee9',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
