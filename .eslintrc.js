module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: ["standard", "prettier", "plugin:prettier/recommended"],
    plugins: ["eslint-plugin-import-helpers", "prettier"],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {},
};
