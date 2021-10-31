#关于如何引入组件及组件编写的规范
下面是引入组件的范例：
```js
import navbarJS from '@/component/navbar/script/import.js';
import sidebarJS from '@/component/sidebar/script/import.js';
// 这个是公共组件的 JS 代码。
// 由于 jquery.load() 的函数会自动省略 JS 代码，所以我们这里需要手动引入并执行。
$(document).ready(() => {
  $('#nav-bar-container').load('http://localhost:8899/html/navbar.html #nav-bar', undefined, () => {
    // 通过 URL + id 的方式引入组件。
    navbarJS();
    // 在回调中执行原页面中的 JS 代码。
  });
  /* jquery 的 load 方法会自动略去 html 中的 js 脚本，因此需要我们额外引入。*/
  $('#side-bar-container').load('http://localhost:8899/html/sidebar.html #side-bar', undefined, () => {
    sidebarJS();
  });
});
```
下面介绍如何编写一个组件，目录结构如下：
```text
-component
    -script
        import.js // 组件的业务 js 代码，需要在具体的 page 中引入，不需要在 ./commonUtils.js 中引入，为了优化打包后的 js 体积。
        commonUtils.js // 用于形成打包后 html 的入口 js 文件，其中只需要 import.js 代码即可。
    -style
        main.scss // 组件的样式。
    index.html // 组件的 html。
```
可以查看我编写的样例代码 —— navbar 和 sidebar。


