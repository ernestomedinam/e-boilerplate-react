const path = require("path");
const webpack = require("webpack");
const paths = require("./paths.js");
const PrettierPlugin = require("prettier-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack-common.js");

module.exports = merge(common, {
    mode: "development",
    devtool: "source-map",
    plugins: [
        new PrettierPlugin({
            parser: "babel",
            printWidth: 80,
            tabWidth: 4,
            useTabs: true,
            bracketSpacing: true,
            extensions: [ ".js", ".jsx" ],
            semi: true,
            encoding: "utf-8"
        })
    ]
});