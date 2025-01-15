// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    'standard',
    'plugin:vue/essential'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // FIXME: "named" should be "never" after fix sitebroad code style
    'space-before-function-paren': [
      'error', {
        anonymous: 'always',
        named: 'ignore',
        asyncArrow: 'always'
      }
    ]
  }
}
