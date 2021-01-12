/**
 * @Author: Hans
 * @Date: 2021-01-12 15:33:12
 * @LastEditTime: 2021-01-12 20:58:31
 * @LastEditors: Do not edit
 * @FilePath: /create-rc-app/src/templates/config/webpack.config.common.ts
 * @Description:
 */
const getCommonWebpack = (name: string, opts: any): string => {
    const moduleJSON = `{
        rules: [
            ${
                opts.ts
                    ? `{
                    test: ${/\.(jsx|tsx|js|ts)$/},
                    use: [
                        {
                            loader: "happypack/loader?id=ts",
                        },
                    ],
                    exclude: /node_modules/,
                },`
                    : `{
                        test: ${/\.(jsx|js)$/},
                        use: [
                            {
                                loader: "happypack/loader?id=babel",
                            },
                        ],
                        exclude: /node_modules/,
                    },`
            }
            {
                test: ${/\.css$/},
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: [require("autoprefixer")()],
                        },
                    },
                ],
            },
            ${
                opts?.css?.includes("less")
                    ? `{
                test: ${/\.less$/},
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: [require("autoprefixer")()],
                        },
                    },
                    {
                        loader: "less-loader",
                    },
                ],
            },`
                    : ""
            }
            ${
                opts?.css?.includes("scss")
                    ? `{
                test: ${/\.(scss|sass)$/},
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: [require("autoprefixer")()],
                        },
                    },
                    {
                        loader: "sass-loader",
                    },
                ],
            },`
                    : ""
            }
            ${
                opts?.css?.includes("stylus")
                    ? `{
                test: ${/\.styl$/},
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: [require("autoprefixer")()],
                        },
                    },
                    {
                        loader: "stylus-loader",
                    },
                ],
            },`
                    : ""
            }
            {
                test: ${/\.(jpg|png|gif)$/},
                use: {
                    loader: "url-loader",
                    options: {
                        name(file) {
                            if (process.env.NODE_ENV === "development") {
                                return "[path][name].[ext]";
                            }
                            return \`static/images/[name]_[hash:6].[ext]\`;
                        },
                        publicPath: "./",
                        outputPath: "/",
                        limit: 8192,
                        // 如果图片文件大于8kb用file-loader，
                        // 把图片正常打包成一个单独的图片文件到设置的目录下，
                        // 若是小于了8kb打包成base64的图片格式插入到bundle.js文件中
                    },
                },
            },
            {
                test: ${/\.(eot|ttf|svg|woff|woff2)$/},
                use: {
                    loader: "file-loader",
                    options: {
                        name: \`static/fonts/[name]_[hash:6].[ext]\`,
                        outputPath: "/",
                    },
                },
            },
        ],
    }`;
    return `const webpack = require("webpack");
const path = require("path");
const paths = require("./paths");
const WebpackBar = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HappyPack = require("happypack");

module.exports = {
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "../../src"),
        },
        extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
    },
    devtool: "source-map",
    stats: "errors-only",
    module: ${moduleJSON},
    plugins: [
        new HappyPack(${
            opts.ts
                ? `{
            id: "ts",
            loaders: [
                {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true,
                        getCustomTransformers: path.join(__dirname, "./webpack.import.js"),
                        compilerOptions: {
                            module: "es2015",
                        },
                        happyPackMode: true,
                    },
                },
            ],
        },`
                : `{
                    id: "babel",
                    loaders: [
                        {
                            loader: "babel-loader",
                        },
                    ],
                },`
        }),
        new WebpackBar({
            name: "App",
            color: "#af99ff",
        }),
        new MiniCssExtractPlugin({
            filename: \`static/css/[name]_[hash:6].css\`,
            chunkFilename: \`static/css/[name]_[hash:6].css\`,
            ignoreOrder: true,
        }),
        new HtmlWebpackPlugin({
            title: "${name}",
            template: paths.appHtml,
            inject: false,
        }),
    ],
};`;
};
export default getCommonWebpack;
