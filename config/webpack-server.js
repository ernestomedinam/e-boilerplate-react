const webpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const paths = require("./paths.js");
const config = require("./webpack-dev-config.js");

const port = 3000;
const host = "0.0.0.0";

const options = {
    host: host,
    port: port,
    hot: true,
    open: true,
    contentBase: [paths.appAssets, paths.appPublic],
    historyApiFallback: true,
    after() {
        console.log(
            "Hello, my friend! Dev server is running on:",
            `https://${host}:${port}`
        );
    }
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(port, host, () => {});