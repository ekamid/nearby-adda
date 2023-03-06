module.exports = {
  extends: ["prettier", "eslint:recommended"],
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    mocha: true,
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
  },
};
