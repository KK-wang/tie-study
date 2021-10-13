# webpack 实现 HMR
##1.关于在 js 模块中原生实现 HMR
我已经通过传统的 `webpack` 配置开启了 HMR，但是这只会对 scss 文件生效，因为 style-loader 已经对 HMR 进行了相关的配置，为了让 js 模块也可以原生支持 HMR，我们需要在每个 js 模块中引入下面这段代码：
```js
if (process.env.NODE_ENV === 'development') {
  /* 这是用来实现 HMR 的代码，JS 模块中只有存在了这段代码才会开启 HMR。 */
  module.hot.accept((err) => {
    console.error(err);
  });
}
```
这段代码将会开启所在 js 模块的 HMR，而且这段代码不需要在生成环境下删去，webpack 会判断当前是开发环境还是生成环境，然后在生成环境下自动跳过对这段代码的打包。
##2.关于在原生前端组件化情景下使用 HMR
> webpack-devServer 是基于 Socket 进行 HMR 的。

我们在使用 devServer 开发前端界面时，需要手动设置 webpack.dev.js 暴露出来的 open 属性，从而来决定 devServer 默认打开的页面是哪一个。

需要注意的是，只有修改 chunk 值与 *.html 中的 * 值一致的 chunk 中的代码，才会支持 HMR，例如，当我们的 open 设置的是 index.html，那么修改 index chunk 下的代码才会支持 HMR，navbar、sidebar 以及 footer 是不支持 HMR 的。

出现这种情况的原因是因为我们选用的组件化策略是基于 HTTP 请求的，navbar 等组件都是作为 index 的 HTTP 请求而存在的，所以针对 navbar 的修改无法通过 Socket 传给前端。
