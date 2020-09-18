/*
 * @Date: 2020-06-11 18:31:39
 * @LastEditors: Hans
 * @description:
 * @LastEditTime: 2020-06-11 22:16:26
 * @FilePath: /okr/config/webpack/webpack.import.js
 */

const tsImportPluginFactory = require("ts-import-plugin");

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
