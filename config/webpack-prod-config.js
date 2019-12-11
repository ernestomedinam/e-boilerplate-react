const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const paths = require("./paths.js");

module.exports = {
    entry: paths.appIndexJs,
    output: {
        filename: "bundle.js",
        path: paths.appPublic,
        publicPath: "/"
    },
    mode: "production",
    plugins: [
        new htmlWebpackPlugin({
            favicon: paths.appFavicon,
            template: paths.appTemplate
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
            }
        ]
    }
};
