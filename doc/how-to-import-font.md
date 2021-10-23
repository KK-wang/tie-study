#如何在 webpack 环境下配置外部字体
引入外部字体有以下几点注意点：
1. `@font-face` 要位于所有的样式文件之前引入，否则 `@font-face` 不会生效，从而无法引入字体。
2. 如果字体文件太大，有可能出现字体还没加载完，样式已经渲染完了的情况，那么也无法引入字体。
3. 字体格式需要兼容，不同浏览器字体的格式有差别（兼容浏览器），如果引入的字体不被浏览器兼容，那么同样无法引入字体。由于 `woff/woff2` 格式的字体文件兼容性比较好，且加载起来相对较快，所以一般采用这两个格式。
> 如果设计只给.ttf一种格式的字体，那我们怎么办呢？我们可以去 [transfonter.org/] (https://transfonter.org/) 将 ttf字体库文件转换成base64 的css文件，然后引入兼容各种浏览器的字体文件，就完美解决了。

下面给出在 webpack 中引入字体文件的最佳实践:
1. 在相应的 html 文件中的 `<style>` 标签中写下如下代码:
```css
@font-face {
  font-family: 'tie-project-font';
  src: url('<%= require("@/assets/font/tie-project-font.woff2").default %>') format('woff2'),
    url('<%= require("@/assets/font/tie-project-font.woff").default %>') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```
由于在 webpack 中 `.html` 文件遵循 ejs 语法，因此可以使用 `<%= ... %>`。
2. 在与该 html 文件相关的样式文件中使用该字体，使用方式为 `font-family: 'tie-project-font', serif;`。
