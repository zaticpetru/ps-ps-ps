module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'google',
  ],
  rules: {
    quotes: ['warn', 'single'],
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
};
