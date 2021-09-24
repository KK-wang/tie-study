/* 自己封装的工具 */
const prodConfig = require('./webpack.prod');
const devConfig = require('./webpack.dev');
const resolveApp = require('./path');

/* 第三方库 */
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function getHtmlPlugin(option) {
  return new HtmlWebpackPlugin({
    template: `./src/${option.path}`,
    filename: `./html/${option.chunk}.html`,
    chunks: option.chunk,
    // 输出的 html 文件引入资源文件的入口 chunk。
    // 这个 chunk 和多入口的配置相关。
  });
}

function commonConfig(isProduction) {
  return {
    context: resolveApp('./'),
    entry: {
      // 配置多入口。
      navbar: './src/component/navbar/script/index.js',
    },
    output: {
      filename: 'js/[name].[hash:6].bundle.js',
      path: resolveApp('./dist'),
    },
    plugins: [
      getHtmlPlugin({
        path: 'component/navbar/index.html',
        chunk: 'navbar'
      }),
      new DefinePlugin({
        BASE_URL: "'../'",
      }),
      // 用来定义全局变量的插件，暂且还不需要，
      new CopyWebpackPlugin({
        patterns: [
          { from: './src/public' }
        ]
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/i,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.scss$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg|)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name].[hash:6].[ext]',
                outputPath: 'img',
                limit: 10 * 1024,
              }
            },
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.scss', '.html', '.mjs', '.css'],
      alias: {
        "@": resolveApp('./src')
      }
    }
  }
}

module.exports = function (env) {
  process.env.NODE_ENV = env.production ? 'production' : 'development';
  const config = env.production ? prodConfig : devConfig;
  return merge(commonConfig(env.production), config);
}
