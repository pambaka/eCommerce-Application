module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  noInlineConfig: true,
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'airbnb-base', 'plugin:@typescript-eslint/recommended', 'prettier'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 2,
    'import/extensions': [2, {}],
    // 'no-console': 'off' for more convenient testing:
    'no-console': 0,
    // next 2 lines are to work around eslint bug with enums:
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': 2,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
    },
  },
};
