/**
 * @Author: Hans
 * @Date: 2021-01-13 14:45:48
 * @LastEditTime: 2021-01-13 14:46:32
 * @LastEditors: Do not edit
 * @FilePath: /create-rc-app/src/templates/prettier.ts
 * @Description:
 */
const getPrettier = (): string => `{
    "trailingComma": "all",
    "tabWidth": 4,
    "semi": true,
    "singleQuote": false,
    "arrowParens": "always",
    "jsxBracketSameLine": true,
    "printWidth": 120
}
`;
export default getPrettier;
