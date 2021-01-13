/**
 * @Author: Hans
 * @Date: 2021-01-12 15:45:15
 * @LastEditTime: 2021-01-13 14:38:55
 * @LastEditors: Do not edit
 * @FilePath: /create-rc-app/src/templates/babelrc.ts
 * @Description:
 */
const getBabel = (opts: any): string => {
    let basePlugins: any[] = [["@babel/plugin-transform-runtime"]];
    if (opts.antd) {
        basePlugins = [...basePlugins, ["babel-plugin-import", { libraryName: "antd", style: true }]];
    }

    return `module.exports = {
    presets: [["@babel/preset-env"], ["@babel/preset-react"]],
    plugins: ${basePlugins},
};`;
};
export default getBabel;
