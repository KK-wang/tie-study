if (process.env.NODE_ENV === 'development') {
  /* 这是用来实现 HMR 的代码，JS 模块中只有存在了这段代码才会开启 HMR。 */
  module.hot.accept((err) => {
    console.error(err);
  });
}

import '../style/main.scss'
import $ from 'jquery';
import Register from "./register";
import '@/store/index';

$(document).ready(() => {
  document.querySelector('.web-logo .web-logo-img').addEventListener('click', () => {
    window.location.href = 'http://localhost:8899/html/index.html';
  }); // logo 跳转链接。
  new Register();
});
