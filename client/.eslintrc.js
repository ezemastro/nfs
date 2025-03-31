// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'standard-with-typescript', 'eslint:recommended', 'plugin:react/recommended'],
  ignorePatterns: ['/dist/*'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: './client/tsconfig.json'
      },
      rules: {
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'react/jsx-indent': [2, 2, { indentLogicalExpressions: true, checkAttributes: true }],
        'react/react-in-jsx-scope': 'off'
      }
    }
  ]
}
