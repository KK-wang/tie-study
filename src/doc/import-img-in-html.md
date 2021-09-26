#关于在 html 中使用标签引入图片
之前我在使用 html 的时候，还是能够直接在 img.src 中使用图片字符串路径引入的，现在突然就出问题了，webpack 不会对字符串路径实现转化了。
下面提供一种能够在 html 中直接引入图片路径的解决方法——使用 ejs 语法：
```ejs
<img src="<%= require('../../assets/img/navbar/logo.png').default %>" alt="">
```
虽然这是 ejs 语法，但是能够直接在 html 文件中使用，就是引入麻烦了一点。 这个 `../../assets/img/navbar/logo.png` 就是图片资源相对于当前 html 的路径。

由于这是走 js 代码的，所以也可以使用 webpack.resolve.alias 中配置的别名：`@/assets/img/navbar/logo.png`


