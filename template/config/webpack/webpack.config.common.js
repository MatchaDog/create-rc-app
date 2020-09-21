const webpack = require("webpack");
const path = require("path");
const paths = require("../paths");
const WebpackBar = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HappyPack = require("happypack");

module.exports = {
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "../../src"),
        },
        extensions: [".tsx", ".ts", ".js", ".json"],
    },
    devtool: "source-map",
    stats: "errors-only",
    module: {
        rules: [
            {
                test: /\.(jsx|tsx|js|ts)$/,
                use: [
                    {
                        loader: "happypack/loader?id=ts",
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
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
            {
                test: /\.less$/,
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
                        options: {
                            modifyVars: {
                                hack: `true;@import "${path.resolve(__dirname, "../../src/styles/override.less")}";`,
                            },
                            javascriptEnabled: true,
                        },
                    },
                ],
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name(file) {
                            if (process.env.NODE_ENV === "development") {
                                return "[path][name].[ext]";
                            }

                            return `static/images/[name]_[hash:6].[${new Date().getTime()}].[ext]`;
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
                test: /\.(eot|ttf|svg|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: `static/fonts/[name]_[hash:6].[${new Date().getTime()}].[ext]`,
                        outputPath: "/",
                    },
                },
            },
        ],
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
        new HappyPack({
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
        }),
        new WebpackBar({
            name: "App",
            color: "#af99ff",
        }),
        // 压缩css
        new MiniCssExtractPlugin({
            filename: `static/css/[name]_[hash:6].${new Date().getTime()}.css`,
            chunkFilename: `static/css/[name]_[hash:6].${new Date().getTime()}.css`,
            ignoreOrder: true,
        }),
        new HtmlWebpackPlugin({
            title: "App",
            template: paths.appHtml,
            inject: false,
        }),
    ],
};
