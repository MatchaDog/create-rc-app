/*
 * @Date: 2020-02-28 14:23:31
 * @LastEditors: Hans
 * @description:
 * @LastEditTime: 2020-08-24 16:59:33
 * @FilePath: /react-cli/config/webpack/webpack.config.prod.js
 */
const webpack = require("webpack");
const paths = require("../paths");

const merge = require("webpack-merge");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const commonConfig = require("./webpack.config.common");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge.smart(commonConfig, {
    mode: "production",
    // stats: 'detailed',
    entry: paths.appIndex,
    output: {
        path: paths.appBuild,
        filename: `static/js/[name]_[hash:6].${new Date().getTime()}.js`,
        chunkFilename: `static/js/[name]_[hash:6].${new Date().getTime()}.js`,
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true, // 多线程
                parallel: true, // 缓存
                sourceMap: false, // 非生产调试不要开启sourceMap
                terserOptions: {
                    compress: {
                        drop_console: process.env.NODE_ENV === "production",
                    },
                },
            }),
            new OptimizeCssAssetsPlugin(),
        ],
        splitChunks: {
            cacheGroups: {
                dingVendor: {
                    test: /[\\/]node_modules[\\/](dingtalk-jsapi)/,
                    priority: 100,
                    name: "dingVendor",
                    chunks: "all",
                },
                echartsVendor: {
                    test: /[\\/]node_modules[\\/](echarts|zrender)/,
                    priority: 100,
                    name: "echartsVendor",
                    chunks: "async",
                },
                vendors: {
                    chunks: "all",
                    test: /[\\/]node_modules[\\/](react|react-dom|react-dom-router|history|axios|classnames)/,
                    priority: 100,
                    name: "vendors",
                },
                "async-commons": {
                    chunks: "async",
                    minChunks: 2,
                    name: "async-commons",
                    priority: 90,
                },
                commons: {
                    chunks: "initial",
                    minChunks: 2,
                    name: "commons",
                    priority: 80,
                },
            },
        },
    },
    plugins: [
        // 从缓存提升打包速度
        new HardSourceWebpackPlugin(),
        // GZIP
        new CompressionPlugin(),
        // 允许注入环境变量
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            "process.env.version": JSON.stringify(process.env.version),
        }),
        // //该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境。
        new webpack.HashedModuleIdsPlugin(),
        // 过去 webpack 打包时的一个取舍是将 bundle 中各个模块单独打包成闭包。
        // 这些打包函数使你的 JavaScript 在浏览器中处理的更慢。
        // 相比之下，一些工具像 Closure Compiler 和 RollupJS
        // 可以提升(hoist)或者预编译所有模块到一个闭包中，提升你的代码在浏览器中的执行速度。
        new webpack.optimize.ModuleConcatenationPlugin(),

        new CleanWebpackPlugin(),

        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: "./report.html",
        }),
    ],
});
