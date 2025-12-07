module.exports = {
  root: true,
  extends: '@react-native',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    requireConfigFile: false, // Add this
  },
  ignorePatterns: ['metro.config.js'], // Or add this
};