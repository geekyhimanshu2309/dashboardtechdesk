module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect', 
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended', 
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', 
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error', 
    '@typescript-eslint/explicit-module-boundary-types': 'off', 
    '@typescript-eslint/no-explicit-any': 'off', 
  },
}
