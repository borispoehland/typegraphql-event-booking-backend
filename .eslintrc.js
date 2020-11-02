module.exports = {
  extends: '@bpoehland/eslint-config-basic',
  parserOptions: {
    project: './tsconfig-lint.json',
  },
  rules: {
    '@typescript-eslint/typedef': [
      'error',
      {
        arrayDestructuring: true,
        arrowParameter: true,
        memberVariableDeclaration: true,
        objectDestructuring: false,
        parameter: true,
        propertyDeclaration: true,
        variableDeclaration: false,
        variableDeclarationIgnoreFunction: false,
      },
    ],
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
  },
};
