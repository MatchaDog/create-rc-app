/**
 * @Author: Hans
 * @Date: 2021-01-12 16:08:58
 * @LastEditTime: 2021-01-12 16:09:18
 * @LastEditors: Do not edit
 * @FilePath: /create-rc-app/src/templates/config/webpack.import.ts
 * @Description:
 */
const getImport = (): string => `const tsImportPluginFactory = require("ts-import-plugin");

const getCustomTransformers = () => ({
    before: [
        tsImportPluginFactory({
            libraryName: "antd",
            libraryDirectory: "es",
            style: true, // to less
        }),
    ],
});

module.exports = getCustomTransformers;
`;
export default getImport;
