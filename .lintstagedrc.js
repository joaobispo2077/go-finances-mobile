module.exports = {
  'src/**/*.[jt]s(x)?': [
    'prettier --write',
    'eslint --fix',
  ],
}
