/**
 * @Author: Hans
 * @Date: 2021-01-12 15:54:08
 * @LastEditTime: 2021-01-12 20:58:39
 * @LastEditors: Do not edit
 * @FilePath: /create-rc-app/src/templates/config/webpack.config.prod.ts
 * @Description:
 */
const getProdWebpack = (): string => `
const webpack = require("webpack");
const paths = require("./paths");

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
   entry: paths.appIndex,
   output: {
       path: paths.appBuild,
       filename: \`static/js/[name]_[hash:6].js\`,
       chunkFilename: \`static/js/[name]_[hash:6].js\`,
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
               vendors: {
                   chunks: "all",
                   test: /[\\/]node_modules[\\/](react|react-dom|react-dom-router)/,
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
       // 该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境。
       new webpack.HashedModuleIdsPlugin(),

       new CleanWebpackPlugin(),

       new BundleAnalyzerPlugin({
           analyzerMode: "static",
           reportFilename: "./report.html",
       }),
   ],
});
`;
export default getProdWebpack;
