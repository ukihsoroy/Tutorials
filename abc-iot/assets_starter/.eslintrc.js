module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:vue/recommended',
    '@vue/standard'],
  plugins: [
    'promise',
    'vue'
  ],
  rules: {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': [
      process.env.NODE_ENV === 'production' ? 2 : 0,
      {
        allow: ['warn', 'error']
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
