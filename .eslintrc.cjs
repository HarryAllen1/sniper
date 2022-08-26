module.exports = {
  ignorePatterns: ['**/out/*.*', '**/dist/*.*', '**/node_modules/*.*'],
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:node/recommended',
  ],
  env: {
    node: true,
    amd: false,
    browser: false,
  },
  rules: {
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-missing-import': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'node/no-unpublished-import': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'node/no-unpublished-require': 'off',
  },
};
