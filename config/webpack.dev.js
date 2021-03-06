const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: "development",
  devtool: 'cheap-module-source-map',
  plugins: [
    new Dotenv({
      path: './dev.env'
    }),
    // 我们使用 dotenv-webpack 来从 .env 文件中读取环境变量。
  ],
  devServer: {
    /* 需要注意一下，现在使用的 webpack-dev-server 版本已经是 v4 了，
    很多配置都改变了，需要我们重新阅读一下官方文档。 */
    open: ['/html/index.html'],
    host: 'localhost',
    port: 8899,
    hot: "only",
    // 启用热模块替换功能，在构建失败时不刷新页面作为回退。
    watchFiles: ['./src/page/**/*.html', './src/component/**/*.html'],
    // 监视项目中的 .html 文件，当它们发生变化时，自动去刷新页面。
    proxy: {
      "/innerDevAPI": {
        target: "http://192.168.2.156:8080",
        pathRewrite: {
          "^/innerDevAPI": ""
        },
        secure: false,
        changeOrigin: true
      },
      "/outerDevAPI": {
        target: "https://project.sumixer.com:8081",
        pathRewrite: {
          "^/outerDevAPI": ""
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

