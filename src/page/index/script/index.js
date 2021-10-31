import '../style/main';
import './nav';
import './banner';
import './sortbox';

if (process.env.NODE_ENV === 'development') {
  /* 这是用来实现 HMR 的代码，JS 模块中只有存在了这段代码才会开启 HMR。 */
  module.hot.accept((err) => {
    console.error(err);
  });
}

import $ from 'jquery'
import navbarJS from '@/component/navbar/script/import.js';
import sidebarJS from '@/component/sidebar/script/import.js';
import loginJS from '@/component/login/script/import.js';
import footerJS from '@/component/footer/script/import.js';
import { getCookie } from "../../../common/script/utils/cookie";

$(document).ready(() => {
  if (getCookie('token') === undefined) {
    $('#login-container').load('http://localhost:8899/html/login.html #login', undefined, () => {
      loginJS();
    });
  }
  $('.footer').load('http://localhost:8899/html/footer.html #footer', undefined, () => {
    footerJS();
  });
  $('.nav-bar').load('http://localhost:8899/html/navbar.html #nav-bar', undefined, () => {
    navbarJS();
  });
  $('#side-bar-container').load('http://localhost:8899/html/sidebar.html #side-bar', undefined, () => {
    sidebarJS();
  });
})

