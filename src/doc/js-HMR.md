#关于在 js 模块中原生实现 HMR
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
