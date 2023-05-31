module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/no-shadow': 'off',
        'no-shadow': 'off',
        'no-undef': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': ['warn'],
        quotes: [2, 'single'],
        semi: [2, 'never'],
        'comma-dangle': [2, 'only-multiline'],
        'no-trailing-spaces': [2],
        'prettier/prettier': 2,
        'space-before-function-paren': 0,
      },
    },
  ],
}
