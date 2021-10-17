if (process.env.NODE_ENV === 'development') {
  /* 这是用来实现 HMR 的代码，JS 模块中只有存在了这段代码才会开启 HMR。 */
  module.hot.accept((err) => {
    console.error(err);
  });
}

import '../style/main.scss';
import $ from 'jquery';
import navbarJS from '@/component/navbar/script/import.js';
import sidebarJS from '@/component/sidebar/script/import.js';
import footerJS from '@/component/footer/script/import.js';
import { writeIntroduction } from "./course-body/introduce-part-script";
import { changeIsGiveStarsActive } from "./course-body/catalog-part-script";
import { collection } from "./course-head";

$(document).ready(() => {
  $('#nav-bar-container').load('http://localhost:8899/html/navbar.html #nav-bar', undefined, () => {
    navbarJS();
  });
  /* jquery 的 load 方法会自动略去 html 中的 js 脚本，因此需要我们额外引入。*/
  $('#side-bar-container').load('http://localhost:8899/html/sidebar.html #side-bar', undefined, () => {
    sidebarJS();
  });
  $('#footer-container').load('http://localhost:8899/html/footer.html #footer', undefined, () => {
    footerJS();
  });
  collection();
  writeIntroduction();
  changeIsGiveStarsActive();
});
