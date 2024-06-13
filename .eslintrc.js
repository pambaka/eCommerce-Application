module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  noInlineConfig: true,
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'airbnb-base', 'plugin:@typescript-eslint/recommended', 'prettier'],
  overrides: [
    {
      files: ['**/__tests__/**', '**/*.test.js', '**/*.test.ts'],
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 2,
    'import/extensions': [2, {}],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    // 'no-console': 'off' for more convenient testing:
    'no-console': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
    },
  },
};
