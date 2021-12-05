/*
 * 此处编写一个自定义的 webpack 插件，
 * 这个插件能够将打包好的静态文件自动上传到服务器中。
 * */
const { NodeSSH } = require('node-ssh');
// 使用 node-ssh 来通过 ssh 连接远程服务器。

class AutoUploadPlugin {
  /*
   * 这里的 options 传过来的是 Webpack 的配置文件中，用户传给插件的参数。
   * 具体的 option 选项如下 =>
   * remotePath: 远程服务器中，放置静态文件的文件夹。
   * host: 远程服务器的 IP。
   * username: 远程服务器的用户名。
   * password: 远程服务器的密码。
   * */
  constructor(options) {
    this.ssh = new NodeSSH(); // 创建 ssh 实例。
    this.options = options; // 用户传入的选项，其中包括 remotePath、host、username、password。
  }

  async connectServer() {
    // 连接远程服务器。
    try {
      await this.ssh.connect({
        host: this.options.host, // 服务器域名。
        username: this.options.username, // 用户名。
        password: this.options.password // 密码。
      });
    } catch (e) {
      console.error(e);
    }
  }

  async uploadFiles(localPath, remotePath) {
    // localPath 代表本地要上传的文件夹，remotePath 代表要上传到远程服务器的那个文件夹。
    try {
      await this.ssh.putDirectory(localPath, remotePath, {
        recursive: true,
        concurrency: 10
      });
    } catch (e) {
      console.error(e);
    }
  }

  apply(compiler) {
    /* compiler 是 webpack 生命周期中只会调用一次的对象，上面挂载着许多的 hook。*/
    // 在这里，我们给异步钩子 afterEmit 上挂载了 AutoUpload 回调。
    // 这里的 afterEmit 是异步钩子，对于挂载在它上面的回调，他不会等待上一个回调结束，而是直接执行下一个回调。
    compiler.hooks.afterEmit.tapAsync("AutoUpload", async (compilation, callback) => {
      // 1.获取输出的文件夹。
      const outputPath = compilation.outputOptions.path;

      // 2.使用 SSH 连接远程服务器。
      await this.connectServer();

      // 3.删除原来目录中的内容。
      const serverDir = this.options.remotePath;
      await this.ssh.execCommand(`rm -rf ${serverDir}/*`);

      // 4.上传文件到服务器。
      await this.uploadFiles(outputPath, serverDir);

      // 5.关闭 ssh 连接。
      this.ssh.dispose();

      // 执行结束回调，表示完成异步操作。
      callback();
    });
  }
}

module.exports = AutoUploadPlugin;