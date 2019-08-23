module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: '2018',
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    },
    sourceType: 'module'
  },
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: 'standard',
  globals: {
    __static: true
  },
  plugins: [
    'html'
  ],
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': (process.env.NODE_ENV === 'production') * 2,
    // 'no-multiple-empty-lines': [ 2, {
    //   max: 2,
    //   maxEOF: 1
    // }],
    // 'keyword-spacing': [ 2, {
    //   before: true,
    //   after: true,
    //   overrides: {
    //     if: { after: false },
    //     for: { after: false },
    //     while: { after: false },
    //     catch: { after: false }
    //   }
    // }],
    // 'space-before-function-paren': [ 2, {
    //   anonymous: 'never',
    //   named: 'never',
    //   asyncArrow: 'always'
    // }],
    // 'space-infix-ops': 0,
    // 'padded-blocks': 0,
    // 'operator-linebreak': [ 2, 'before' ],
    // 'camelcase': 0
  }
}
