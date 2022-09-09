module.exports = {
  root: true,
  extends: [
    '@huddo/eslint-config-node',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // this required when linting from kudos-boards-core as submodule
    tsconfigRootDir: __dirname,
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/no-unsafe-argument': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-unsafe-return': 'warn',
    '@typescript-eslint/no-explicit-any': 'off', // maybe later !!!
    'no-unused-vars': 'error',
    'no-use-before-define': 'error',
  }
};
