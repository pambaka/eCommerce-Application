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
    'no-console': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
    },
  },
};
