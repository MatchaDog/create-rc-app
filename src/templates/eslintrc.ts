/**
 * @Author: Hans
 * @Date: 2021-01-12 15:08:45
 * @LastEditTime: 2021-01-12 15:12:12
 * @LastEditors: Do not edit
 * @FilePath: /create-rc-app/src/templates/.eslintrc.ts
 * @Description:
 */
const getEslint = (): string => `module.exports = {
    extends: [
        "airbnb",
        "prettier",
        "plugin:jest/recommended",
        "plugin:react/recommended",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
        "prettier/react",
    ],
    env: {
        browser: true,
        node: true,
        jasmine: true,
        jest: true,
        es6: true,
    },
    parser: "@typescript-eslint/parser",
    plugins: ["react", "babel", "jest", "react-hooks", "@typescript-eslint", "prettier"],
    rules: {
        "react/prop-types": "off",
        "react/jsx-props-no-spreading": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/no-unused-vars": ["off"],
        "@typescript-eslint/no-empty-interface": "warn",
        "@typescript-eslint/ban-types": ["warn"],
        "@typescript-eslint/no-explicit-any": ["off"],
        "@typescript-eslint/no-empty-function": "warn",
        "@typescript-eslint/no-use-before-define": 1,

        "jest/no-test-callback": 0,
        "jest/expect-expect": 0,
        "jest/no-done-callback": 0,
        "jest/valid-title": 0,
        "jest/no-conditional-expect": 0,

        "react/jsx-filename-extension": [1, { extensions: ["tsx"] }],
        "no-use-before-define": 0,
        "import/extensions": [
            0,
            {
                tsx: "always",
            },
        ],
        "prettier/prettier": [
            "warn",
            {
                trailingComma: "all",
                tabWidth: 4,
                semi: true,
                singleQuote: false,
                arrowParens: "always",
                printWidth: 120,
            },
        ],
    },
}`;

export default getEslint;
