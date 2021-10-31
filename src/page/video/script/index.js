import '../style/main.scss'
import './directory'
import './comments'
import './notes'
import $ from 'jquery';
import {getCookie} from "../../../common/script/utils/cookie";
import loginJS from '@/component/login/script/import.js';
import '@/store/index';
import './video'

if (process.env.NODE_ENV === 'development') {
  /* 这是用来实现 HMR 的代码，JS 模块中只有存在了这段代码才会开启 HMR。 */
  module.hot.accept((err) => {
    console.error(err);
  });
}

$(document).ready(() => {
  if (getCookie('token') === undefined) {
    $('#login-container').load('http://localhost:8899/html/login.html #login', undefined, () => {
      loginJS();
    });
  }
});
