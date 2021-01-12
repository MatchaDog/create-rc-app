/**
 * @Author: Hans
 * @Date: 2021-01-12 15:45:15
 * @LastEditTime: 2021-01-12 16:04:28
 * @LastEditors: Do not edit
 * @FilePath: /create-rc-app/src/templates/babelrc.ts
 * @Description:
 */
const getBabel = (): string => `module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            "@babel/preset-react",
    ],
    "plugins": [["@babel/plugin-transform-runtime"]]
}
`;
export default getBabel;
