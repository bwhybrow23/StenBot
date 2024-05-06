export default {
  'env': {
    'es6': true,
    'es2021': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  'parser': 'esprima',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'windows'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};
