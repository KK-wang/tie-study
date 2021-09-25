module.exports = {
  mode: "development",
  devtool: 'cheap-module-source-map',
  devServer: {
    /* 需要注意一下，现在使用的 webpack-dev-server 版本已经是 v4 了，
    很多配置都改变了，需要我们重新阅读一下官方文档。 */
    open: ['/html/navbar.html'],
    // 打开默认的文件，即这里访问的网址是 http://127.0.0.1:8899/html/navbar.html。
    host: 'localhost',
    port: 8899,
    hot: "only",
    // 启用热模块替换功能，在构建失败时不刷新页面作为回退。
    proxy: {
      "/api": {
        target: "http://120.77.83.8:8084",
        pathRewrite: {
          "^/api": ""
        },
        secure: false,
        changeOrigin: true
      }
    },
    historyApiFallback: {
      // 用来解决 SPA 页面在路由跳转之后，进行页面刷新时，返回 404 的问题。
      rewrites: [
        { from: /\*/, to: "./index.html" }
      ]
    },
  },
}

