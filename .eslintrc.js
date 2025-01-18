const stylistic = require('@stylistic/eslint-plugin')

const customizedStylistic = stylistic.configs.customize({
  indent: 2,
  quotes: 'single',
  semi: false,
  jsx: false
})

module.exports = {
  root: true,
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  extends: [
    'plugin:unicorn/recommended',
    'plugin:vue/essential',
    'plugin:vue/recommended'
  ],
  plugins: [
    '@stylistic',
    'unicorn',
    'vue'
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-useless-escape': 'error',
    'no-lonely-if': 'error',
    'no-unused-vars': 'error',
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    complexity: ['error', 15],
    'unicorn/filename-case': 'off',
    'unicorn/no-keyword-prefix': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prefer-string-raw': 'off',
    'unicorn/prefer-global-this': 'off',
    'unicorn/numeric-separators-style': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          dev: false,
          prod: false,
          conf: false,
          dir: false,
          env: false,
          loadedEnv: false,
          obj: false,
          el: false,
          err: false
        }
      }
    ],
    ...customizedStylistic.rules,
    '@stylistic/no-tabs': 'off',
    '@stylistic/comma-spacing': 'off',
    '@stylistic/eol-last': 'off',
    '@stylistic/comma-dangle': ['error', 'never'],
    '@stylistic/no-extra-parens': 'error',
    '@stylistic/space-infix-ops': ['error', { int32Hint: false }],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'ignore',
        asyncArrow: 'always'
      }
    ],
    '@stylistic/brace-style': ['error', '1tbs'],
    '@stylistic/quote-props': ['error', 'as-needed'],
    '@stylistic/arrow-parens': ['error', 'as-needed'],
    '@stylistic/generator-star-spacing': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/no-v-html': 'off'
  }
}
