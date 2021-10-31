import {getCookie} from "../../../common/script/utils/cookie";

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
import loginJS from '@/component/login/script/import.js';
import fillDataInfo from './course-head';

$(document).ready(() => {
  if (getCookie('token') === undefined) {
    $('#login-container').load('http://localhost:8899/html/login.html #login', undefined, () => {
      loginJS();
    });
  }
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
  fillDataInfo().then();
  // 为了减少加快初次渲染的速度，采用 import()。
  /* 1.介绍模块。*/
  const introduceATag = document.querySelector('a[href="#introduce"]'), introduceATagFunc = async () => {
    const module = await import('./course-body/introduce-part-script');
    module.default().then();
    introduceATag.removeEventListener('click', introduceATagFunc);
  };
  introduceATag.addEventListener('click', introduceATagFunc);

  /* 2.目录模块。*/
  const catalogATag = document.querySelector('a[href="#catalog"]'), catalogATagFunc = async () => {
    const module = await import('./course-body/catalog-part-script');
    // module.default() 即为导入模块默认导出的东西。
    module.default();
    catalogATag.removeEventListener('click', catalogATagFunc);
  };
  catalogATag.addEventListener('click', catalogATagFunc);
  /* 3.笔记模块。*/
  /* 4.问答模块。*/
  /* 5.公告模块。*/
  const fakeClickEvent = document.createEvent("MouseEvents");
  fakeClickEvent.initMouseEvent("click", true, true, document.defaultView,
    0, 0, 0, 0, 0, false, false,
    false, false, 0, null);
  switch (window.location.hash) {
    case "#catalog":
      catalogATag.dispatchEvent(fakeClickEvent);
      break;
    default:
      introduceATag.dispatchEvent(fakeClickEvent);
  }
});
