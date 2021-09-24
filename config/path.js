const path = require('path');

const appDir = process.cwd();
// appDir 返回命令行运行 node 指令的根目录。

const resolveApp = function (relativePath) {
  return path.resolve(appDir, relativePath);
}

module.exports = resolveApp;
