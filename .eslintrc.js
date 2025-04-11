module.exports = {
  root: true,
  extends: ['next', 'plugin:prettier/recommended'],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
};
