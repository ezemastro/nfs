module.exports = {
  overrides: [
    {
      extends: ['standard-with-typescript', 'plugin:@typescript-eslint/recommended', 'eslint-config-standard'],
      plugins: ['@typescript-eslint'],
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './api/tsconfig.json',
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-confusing-void-expression': 'off',
        '@typescript-eslint/no-extraneous-class': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
};