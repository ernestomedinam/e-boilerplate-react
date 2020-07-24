const paths = require("./paths.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
require("dotenv").config();

module.exports = {
    entry: paths.appIndexJs,
    module: {
        rules: [
            {
                // look for js, jsx files
                test: /\.(js|jsx)$/,
                // in the source directory
                exclude: /(node_modules)/,
                use: [
                    {
                        // babel loader for transpiling js files
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ],
                            plugins: [
                                "@babel/transform-runtime",
                                "@babel/plugin-proposal-class-properties",
                                "react-hot-loader/babel"
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
                test: /\.(png|svg|jpeg|jpg|gif.ico)$/,
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
    },
    resolve: {
        alias: {
            "react-dom": "@hot-loader/react-dom"
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: paths.appFavIcon,
            template: paths.appTemplate
        })
    ]
}
