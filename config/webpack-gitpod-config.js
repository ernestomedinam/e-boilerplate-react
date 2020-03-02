const path = require("path");
const webpack = require("webpack");
const paths = require("./paths.js");
const PrettierPlugin = require("prettier-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: paths.appIndexJs,
    mode: "development",
    devtool: "source-map",
    devServer: {
        disableHostCheck: true,
        allowedHosts: ["localhost", "0.0.0.0", ".gitpod.io"],
        host: "0.0.0.0",
        port: 3000,
        hot: true,
        open: true,
        contentBase: [paths.appAssets, paths.appPublic],
        watchContentBase: true,
        historyApiFallback: true,
    },
    
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            Popper: "popper.js",
            JQuery: "jquery",
            Util: "exports-loader?Util!bootstrap/js/dist/util",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/util"
        }),
        new HtmlWebpackPlugin({
            favicon: paths.appFavIcon,
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
                use: [
                    {
                        // babel loader for transpiling js files
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ]
                        }
                    },
                    {
                        // eslint loader for code lintin
                        loader: "eslint-loader",
                        options: {
                            enforce: "pre"
                        }
                    }
                ]
            },
            {
                // look for css or scss files
                test: /\.(css|scss)$/,
                // in styles directory
                include: [paths.appStyles, /(node_modules)/],
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[local]" // localIdentName: "[name]__[local]__[hash:base64:5]"
                            },
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                // handle image files
                test: /\.(png|svg|jpeg|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[path][name].[ext]"
                        }
                    }
                ]
            },
            {
                // handle font files
                test: /\.woff($|\?)|\.woff2($|\?)\.ttf($|\?)\.eot($|\?)/,
                use: [
                    {
                        loader: "file-loader"
                    }
                ]
            }
        ]
    }
}