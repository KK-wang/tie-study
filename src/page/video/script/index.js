import '../style/main.scss'
import './directory'
import './comments'
import './notes'
import '@/store/index';
import './video';

if (process.env.NODE_ENV === 'development') {
  /* 这是用来实现 HMR 的代码，JS 模块中只有存在了这段代码才会开启 HMR。*/
  module.hot.accept((err) => {
    console.error(err);
  });
}

import "@/common/script/utils/module.js"
import loadComponent from "../../../common/script/repeated/loadComponent";

document.addEventListener("DOMContentLoaded", () => {
  loadComponent(document, {
    isLoadLogin: true
  });
});
