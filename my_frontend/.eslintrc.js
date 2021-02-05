module.exports = {
  root: true,
  settings: {
    react: {
      version: '999.999.999',
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',

    // Prettier plugin and recommended rules
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  rules: {
    // Include .prettierrc.js rules
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],

    'react/prop-types': 'off',
    '@typescript-eslint/no-empty-interface': 0,
    'import/no-default-export': 2,
    'import/no-unresolved': 0,
  },
  overrides: [
    {
      files: ['*.stories.*'],
      rules: {
        'import/no-default-export': 0,
      },
    },
  ],
}
