module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "jest": true
  },
  "parserOptions": {
    "parser": "babel-eslint",
    "sourceType": "module"
  },
  "ecmaFeatures": {
    "destructuring": true
  },
  "extends": [
    'plugin:vue/essential',
    'airbnb'
  ],
  "plugins": [
    'vue'
  ],
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": "off",
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-console": "off",
    "no-debugger": "off",
    "experimentalDecorators": "off",
    "no-restricted-syntax": "off",
    "no-restricted-globals": "off",
    "no-underscore-dangle": "off",
    "import/prefer-default-export": "off",
    "import/no-webpack-loader-syntax": "off",
    "vue/no-duplicate-attributes": "off",
    "no-param-reassign": "off",
    "max-len": "off",
    "global-require": "off",
  },
};
