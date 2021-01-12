/**
 * @Author: Hans
 * @Date: 2021-01-12 15:10:22
 * @LastEditTime: 2021-01-12 16:04:42
 * @LastEditors: Do not edit
 * @FilePath: /create-rc-app/src/templates/stylelintrc.ts
 * @Description:
 */
const getStylelint = () => `module.exports = {
    extends: [
        "stylelint-config-standard",
        "stylelint-config-rational-order",
        "stylelint-config-prettier",
    ],
    plugins: ["stylelint-order", "stylelint-a11y", "stylelint-declaration-block-no-ignored-properties"],
    rules: {
        "color-no-invalid-hex": true,
        "font-family-no-duplicate-names": true,
        "font-family-no-missing-generic-family-keyword": [
            true,
            {
                ignoreFontFamilies: [
                    "Helvetica Neue",
                    "Helvetica",
                    "PingFang SC",
                    "Microsoft YaHei",
                    "Tahoma",
                    "Arial",
                ],
            },
        ],
        "function-calc-no-invalid": true,
        "function-calc-no-unspaced-operator": true,
        "function-linear-gradient-no-nonstandard-direction": true,
        "string-no-newline": true,
        "unit-no-unknown": true,
        "property-no-unknown": true,
        "keyframe-declaration-no-important": true,
        "declaration-block-no-duplicate-properties": true,
        "declaration-block-no-shorthand-property-overrides": true,
        "block-no-empty": true,
        "selector-pseudo-class-no-unknown": true,
        "selector-pseudo-element-no-unknown": true,
        "selector-type-no-unknown": true,
        "media-feature-name-no-unknown": true,
        "at-rule-no-unknown": true,
        "comment-no-empty": true,
        "no-descending-specificity": true,
        "no-duplicate-at-import-rules": true,
        "no-duplicate-selectors": true,
        "no-extra-semicolons": true,
        "no-invalid-double-slash-comments": true,
        indentation: 4,
        "rule-empty-line-before": [
            "always",
            {
                except: "inside-block",
            },
        ],
    },
};`;
export default getStylelint;