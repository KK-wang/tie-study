# 在 webpack 中使用 import() 的魔法注释
在 webpack 的官方文档中，给出了[魔法注释的使用](https://webpack.docschina.org/api/module-methods/#magic-comments) 。

这里需要额外说明的是 `webpackMode`，从 webpack 2.6.0 开始，可以指定以不同的模式解析动态导入。重点说明以下两个选项：
* 'lazy' (默认值)：为每个 import() 导入的模块生成一个可延迟加载（lazy-loadable）的 chunk。
* 'lazy-once'：生成一个可以满足所有 import() 调用的单个可延迟加载（lazy-loadable）的 chunk。此 chunk 将在第一次 import() 时调用时获取，随后的 import() 则使用相同的网络响应。这样便能够防止重复加载 `import()`，减少网络请求。

还有两个比较重要的 magic comments 是 `webpackPrefetch` 和 `webpackPreload`。主要使用的还是 `webpackPrefetch`，不恰当的使用 `webpackPreload` 会拖慢首屏加载速度。

`webpackPrefetch` 预加载的并不是 `xhr` 请求，而是 `js` 文件，可以在 `devtool` 看到效果。
