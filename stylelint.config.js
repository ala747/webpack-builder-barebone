module.exports = {
  files: ['*.scss', '**/*.scss', '**/*.vue'],
  plugins: [
    '@stylistic/stylelint-plugin',
    'stylelint-scss'
  ],
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-clean-order',
    'stylelint-config-recommended-vue/scss'
  ],
  rules: {
    'no-invalid-position-at-import-rule': null,
    'no-duplicate-selectors': true,
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-redundant-longhand-properties': true,
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'scss/selector-no-redundant-nesting-selector': true,
    'scss/load-no-partial-leading-underscore': null,
    '@stylistic/indentation': 2,
    '@stylistic/max-empty-lines': 1,
    '@stylistic/no-extra-semicolons': true,
    '@stylistic/no-eol-whitespace': true,
    '@stylistic/block-opening-brace-space-before': 'always'
  }
}
