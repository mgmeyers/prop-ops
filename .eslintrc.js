module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'eol-last': 'warn',
    'no-alert': 'warn',
    'no-case-declarations': 'warn',
    'no-cond-assign': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'warn',
    'no-extra-boolean-cast': 'warn',
    'no-global-assign': 'error',
    'no-invalid-this': 'warn',
    'no-lonely-if': 'warn',
    'no-mixed-spaces-and-tabs': 'warn',
    'no-return-assign': ['error', 'always'],
    'no-sparse-arrays': 'off',
    'no-tabs': 'warn',
    'no-trailing-spaces': 'warn',
    'no-unneeded-ternary': 'warn',
    'no-unsafe-negation': 'error',
    'no-useless-return': 'warn',
    'no-var': 'warn',
    'prefer-const': 'warn',
    'prefer-template': 'warn',
    'require-await': 'warn',
    yoda: 'warn',

    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  },
}
