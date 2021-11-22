if (process.env.NODE_ENV === 'development') {
  /* 这是用来实现 HMR 的代码，JS 模块中只有存在了这段代码才会开启 HMR。 */
  module.hot.accept((err) => {
    console.error(err);
  });
}

import "@/common/script/utils/module.js"
// 为了使用自己封装的模块化方法，必须引入这个文件。

// import navbarJS from '@/component/navbar/script/import.js';

document.addEventListener('DOMContentLoaded', () => {
  // DOMContentLoaded 是 HTML 页面的其中一个生命周期，他代表的含义如下：
  /* 浏览器已完全加载 HTML，并构建了 DOM 树，
   * 但像 <img> 和样式表之类的外部资源可能尚未加载完成，
   * 因此处理程序可以查找 DOM 节点，并初始化接口。
   * */
  console.log(document.querySelector('.wxh'));

  document.querySelector('.wxh').load(`http://${process.env.STATIC_SERVER}/html/navbar.html #nav-bar`, () => {
    console.log('wxh');
  });


});
