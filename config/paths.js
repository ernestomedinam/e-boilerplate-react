const path = require("path");
const fs = require("fs");

// this is where app resides
const appDirectory = fs.realpathSync(process.cwd());
// this is function to append relative path to real
// app directory path
const resolveApp = relativePath => {
    return path.resolve(appDirectory, relativePath);
};

module.exports = {
    appSource: resolveApp("src"),
    appStyles: resolveApp("src/sass"),
    appJavaScriptSource: resolveApp("src/js"),
    appAssets: resolveApp("src/assets"),
    appIndexJs: resolveApp("src/js/index.js"),
    appPublic: resolveApp("public"),
    appTemplate: resolveApp("src/index.html"),
    appFavIcon: resolveApp("src/assets/icons/favicon.ico")
}
