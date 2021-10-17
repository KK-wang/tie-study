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
    chunks: [option.chunk, 'navbar', 'sidebar', 'footer'],
    /* 这里的中括号意思是，
     * 只将 chunks 中写明的 chunk 代码加入到 html 中（例如 js、css 等等），
     * 其余的均不加入。*/
    // 输出的 html 文件引入资源文件的入口 chunk。
    // 这个 chunk 和多入口的配置相关。
    inject: true,
    hash: true,
  });
}

function commonConfig(isProduction) {
  return {
    context: resolveApp('./'),
    entry: {
      // 配置多入口。
      navbar: './src/component/navbar/script/index.js',
      sidebar: './src/component/sidebar/script/index.js',
      footer: './src/component/footer/script/index.js',
      course: './src/page/course/script/index.js',
      index: './src/page/index/script/index.js',
      video: './src/page/video/script/index.js'
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
      getHtmlPlugin({
        path: 'component/sidebar/index.html',
        chunk: 'sidebar'
      }),
      getHtmlPlugin({
        path: 'component/footer/index.html',
        chunk: 'footer'
      }),
      getHtmlPlugin({
        path: 'page/course/index.html',
        chunk: 'course'
      }),
      getHtmlPlugin({
        path: 'page/index/index.html',
        chunk: 'index'
      }),
      getHtmlPlugin({
        path: 'page/video/index.html',
        chunk: 'video'
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
          // 排除对 node_modules 文件夹中 js 文件的 babel-loader 转化。
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
