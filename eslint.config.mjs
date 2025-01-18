import vue from 'eslint-plugin-vue'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import eslintJs from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import neostandard from 'neostandard'
import unicorn from 'eslint-plugin-unicorn'
import stylistic from '@stylistic/eslint-plugin'

const customizedStylistic = stylistic.configs.customize({
  indent: 2,
  quotes: 'single',
  semi: false,
  jsx: false
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslintJs.configs.recommended,
  allConfig: eslintJs.configs.all
})

export default [
  {
    ignores: ['**/node_modules/', '**/dist/']
  },
  eslintJs.configs.recommended,
  ...compat.extends('plugin:vue/essential'),
  ...neostandard({
    noJsx: true,
    ts: false
  }),
  ...vue.configs['flat/vue2-recommended'],
  unicorn.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },

      sourceType: 'module',
      ecmaVersion: 2023,

      parserOptions: {
        parser: '@babel/eslint-parser',

        sourceType: 'module',
        ecmaVersion: 2023
      }
    },

    rules: {
      'no-debugger': 0,
      'no-useless-escape': 'error',
      'no-lonely-if': 'error',
      'no-unused-vars': 'error',
      'no-nested-ternary': 'error',
      'no-unneeded-ternary': ['error', { defaultAssignment: false }],
      complexity: ['error', 15],
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
      'unicorn/filename-case': 'off',
      'unicorn/no-keyword-prefix': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-string-raw': 'off',
      'unicorn/prefer-global-this': 'off',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/no-anonymous-default-export': 'off',
      'unicorn/no-process-exit': 'off',
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
      'vue/max-attributes-per-line': 'off',
      'vue/no-v-html': 'off'
    }
  }
]
