/*
 * 此处编写一个自定义的 webpack 插件，
 * 这个插件能够将打包好的静态文件自动上传到服务器中。
 * */
const { NodeSSH } = require('node-ssh');
// 使用 node-ssh 来通过 ssh 连接远程服务器。

const readlineSync = require('readline-sync');
// 使用 readlineSync 可以同步地从 CLI 中获取数据。

require('colors');
// colors 使得 console.log() 输出的字符具有样式，这里不需要导出变量，只需要执行即可。

// const deasync = require('deasync');
// deasync 可以使得异步变同步，本质上是通过事件循环实现的。
/* 遗憾地是，目前这个应用场景没办法使用这个库，因为 webpack build 执行期间是一个黑盒，
 * 我们没办法知道此时事件队列的情况，还是将输入密码这一步放到 webpack.prod.js 中吧...*/

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
    this.options = options; // 用户传入的选项，其中包括 remotePath、host、username。
    this.password = null;
  }

  async connectServer() {
    // 连接远程服务器。
    await this.ssh.connect({
      host: this.options.host, // 服务器域名。
      username: this.options.username, // 用户名。
      password: this.password, // 密码。
    });
  }

  async uploadFiles(localPath, remotePath) {
    // localPath 代表本地要上传的文件夹，remotePath 代表要上传到远程服务器的那个文件夹。
    const status = await this.ssh.putDirectory(localPath, remotePath, {
      recursive: true,
      concurrency: 10
    });
    if (!status) throw "The connection has been established, but file upload failed.";
  }

  apply(compiler) {
    /* compiler 是 webpack 生命周期中只会调用一次的对象，上面挂载着许多的 hook。*/
    // 在这里，我们给同步钩子 shouldEmit 上挂载了 AutoUpload 回调。
    // 这里的 shouldEmit 是同步钩子，对于挂载在它上面的回调，它会等待上一个回调结束之后再执行下一个回调。
    compiler.hooks.shouldEmit.tap("AutoUpload", () => {
      console.log("--------------------<<AutoUploadPlugin---Start>>--------------------".blue.bold);
      const isUpload = readlineSync.keyInYN(`Do you want to upload the result of this packaging to the server? (just ${'[y]'.green.bold} or ${'[n]'.red.bold}, without ${'[Enter]'.white.bold})`);
      if (isUpload) {
        this.password = readlineSync.question(`Please enter the password of the ${this.options.username} user whose IP address is ${this.options.host} >>> `.white.bold, {
          hideEchoBack: true,
          mask: "*"
        });
      }
      console.log("---------------------<<AutoUploadPlugin---End>>---------------------".blue.bold);
      return true;
    });

    // 在这里，我们给异步钩子 afterEmit 上挂载了 AutoUpload 回调。
    // 这里的 afterEmit 是异步钩子，对于挂载在它上面的回调，他不会等待上一个回调结束，而是直接执行下一个回调。
    compiler.hooks.afterEmit.tapAsync("AutoUpload", async (compilation, callback) => {
      if (this.password === null) {
        callback();
        return;
      }

      // 1.获取输出的文件夹。
      const outputPath = compilation.outputOptions.path;

      try {
        // 2.使用 SSH 连接远程服务器。
        await this.connectServer();
        /* 只有 await async function 之后，从 async function 中 throw 出来的 error 才能够被 catch 到。*/
      } catch (e) {
        console.log("Failure: Password incorrect, please try again".red.bold);
        process.exit(0);
      }

      // 3.删除原来目录中的内容。
      const serverDir = this.options.remotePath;
      await this.ssh.execCommand(`rm -rf ${serverDir}/*`);

      // 4.上传文件到服务器。
      await this.uploadFiles(outputPath, serverDir);

      // 5.关闭 ssh 连接。
      this.ssh.dispose();
      console.log("Success: Uploaded to the server".green.bold);

      // 执行结束回调，表示完成异步操作。
      callback();
    });
  }
}

module.exports = AutoUploadPlugin;