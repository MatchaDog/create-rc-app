module.exports = {
    extends: ["airbnb", "prettier", "plugin:import/typescript", "plugin:@typescript-eslint/recommended"],
    env: {
        browser: true,
        node: true,
        jasmine: true,
        jest: true,
        es6: true,
    },
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "prettier"],
    rules: {
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/no-unused-vars": ["off"],
        "@typescript-eslint/no-empty-interface": "warn",
        "@typescript-eslint/ban-types": ["warn"],
        "@typescript-eslint/no-explicit-any": ["off"],
        "@typescript-eslint/no-empty-function": "warn",
        "@typescript-eslint/no-use-before-define": 1,
        "no-use-before-define": 0,
        "import/no-unresolved": "off",
        "no-script-url": "off",
        "import/extensions": [
            0,
            {
                tsx: "always",
            },
        ],
        "import/prefer-default-export": "warn",
        "no-console": ["error", { allow: ["log", "error", "warn"] }],
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
};
