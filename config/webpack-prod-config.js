const path = require("path");
const webpack = require("webpack");
const paths = require("./paths.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PrettierPlugin = require("prettier-webpack-plugin");

module.exports = {
    entry: paths.appIndexJs,
    output: {
        filename: "bundle.js",
        path: paths.appPublic,
        publicPath: "/"
    },
    mode: "production",
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            Popper: "popper.js",
            JQuery: "jquery",
            Util: "exports-loader?Util!bootstrap/js/dist/util",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/util"
        }),
        new HtmlWebpackPlugin({
            favicon: paths.appFavicon,
            template: paths.appTemplate
        }),
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
    ],
    module: {
        rules: [
            {
                // look for js, jsx files
                test: /\.(js|jsx)$/,
                // in the source directory
                include: path.resolve(paths.appJavaScriptSource),
                exclude: /(node_modules)/,
                use: {
                    // babel loader for transpiling js files
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ]
                    }
                }
            },
            {
                // look for css or scss files
                test: /\.(css|scss)$/,
                // in styles directory
                include: paths.appStyles,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: "[name]__[local]__[hash:base64:5]"
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    }
};
