const paths = require("./paths.js");
const PrettierPlugin = require("prettier-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack-common.js");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
require("dotenv").config();

module.exports = merge(common, {
    mode: "development",
    devtool: "cheap-module-source-map",
    output: {
        filename: "main.js",
        path: paths.appPublic,
        publicPath: "/"
    },
    devServer: {
        allowedHosts: ["localhost", "0.0.0.0", ".gitpod.io"],
        host: "0.0.0.0",
        port: 3000,
        hot: true,
        open: true,
        contentBase: [paths.appAssets, paths.appPublic],
        historyApiFallback: true,
        public: process.env.PUBLIC
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new ErrorOverlayPlugin(),
        new PrettierPlugin({
            parser: "babel",
            printWidth: 80,
            trailingComma: "es5",
            tabWidth: 4,
            useTabs: true,
            bracketSpacing: true,
            extensions: [ ".js", ".jsx" ],
            jsxBracketSameLine: false,
            semi: true,
            encoding: "utf-8"
        })
    ]
});
