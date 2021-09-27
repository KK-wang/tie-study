/* 自己封装的工具 */
const resolveApp = require('./path');

/* 第三方库 */
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PurgeCssPlugin = require('purgecss-webpack-plugin');
const webpack = require('webpack');
const glob = require('glob');
// const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
// const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
// const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: false,
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:6].css'
    }),
    new CssMinimizerPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 作用域提升插件。
    new PurgeCssPlugin({
      paths: glob.sync(`${resolveApp('./src')}/**/*`, { nodir: true }),
      safelist: ['body', 'html']
    }),
    // new CompressionPlugin({
    //   threshold: 0, // 文件大小大于 0 时压缩。
    //   test: /\.(css|js)$/i,
    //   minRatio: 1, // 压缩比率小于等于 0.8 时再进行压缩。
    //   algorithm: 'gzip'
    // }),
    // 将静态资源的压缩文件部署到服务器上之后，
    // 如果客户端支持对应的压缩格式，那么服务器可以直接返回压缩后的文件，然后客户端将自动进行解析。
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
    // 用来进行打包分析，只会分析 js 代码。
    // new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime.+[.]js/]),
    // 将 runtime.js 文件内嵌到 html 中，减少 HTTP 的请求次数。
    /* 上述配置无法将 runtime 内嵌到 html 中，现在先略去吧。*/
  ],
  optimization: {
    chunkIds: 'deterministic', // 分包的命名，测试打包可以改为 named，
    usedExports: true, // 开启 tree-shaking。
    minimize: true,
    // minimizer 使用 webpack 默认配置的 minimizer，不需要编写 terser 文件。
    minimizer: [
      new TerserPlugin({
        extractComments: false
      })
    ],
    runtimeChunk: {
      name: "runtime"
    },
    splitChunks: {
      // 代码分包，splitChunks 有默认配置。
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: -10,
          chunks: "all"
          // 记得设置 chunks: "all"，这样的话第三方库只会打包一份代码。
          // 第三方库打包为 vendors。
        },
        common: {
          name: "common",
          minChunks: 2,
          priority: -20,
          chunks: "all"
          // 工具类打包为 common。
        },
        default: false
      }
    }
  }
}
