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

import loadComponent from "../../../common/script/repeated/loadComponent";

document.addEventListener("DOMContentLoaded", () => {
  loadComponent(document, {
    isLoadLogin: true,
    isLoadNavBar: true,
    isLoadSideBar: true,
    isLoadFooter: true,
  });
});

