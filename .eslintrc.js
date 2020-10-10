module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', '@typescript-eslint/tslint', 'autofix'],
  rules: {
    '@typescript-eslint/tslint/config': [
      'error',
      {
        rules: {
          'array-bracket-spacing': true,
          'block-spacing': true,
          'function-name': true,
          'lines-between-class-members': true,
          'no-else-after-return': true,
          'no-function-constructor-with-string-args': true,
          'object-curly-spacing': true,
          'prefer-array-literal': true,
          'prefer-switch': true,
          'space-in-parens': true,
          'ter-arrow-parens': true,
          'ter-computed-property-spacing': true,
          'ter-func-call-spacing': true,
          'ter-indent': true,
          'ter-prefer-arrow-callback': true,
          whitespace: true
        }
      }
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'autofix/no-debugger': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'always'],
    'arrow-spacing': 'warn',
    camelcase: 'error',
    'capitalized-comments': ['error', 'always'],
    complexity: 'warn',
    'computed-property-spacing': 'off',
    'constructor-super': 'error',
    curly: ['error', 'multi-line'],
    'eol-last': 'error',
    'for-direction': 'error',
    forin: 'off',
    'guard-for-in': 'off',
    'jsx-quotes': 'off',
    'lines-between-class-members': 'warn',
    'max-classes-per-file': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    'no-shadow': [
      'error',
      {
        hoist: 'never'
      }
    ],

    semi: 'off',
    'semi-spacing': 'off',
    'semi-style': 'off',
    'space-after-function-name': 'off',
    'space-after-keywords': 'off',
    'space-before-blocks': 'off',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never'
      }
    ]
  }
}
