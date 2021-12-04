if (process.env.NODE_ENV === 'development') {
  /* 这是用来实现 HMR 的代码，JS 模块中只有存在了这段代码才会开启 HMR。 */
  module.hot.accept((err) => {
    console.error(err);
  });
}

import "@/common/script/utils/module.js"
// 为了使用自己封装的模块化方法，必须引入这个文件。
import loadComponent from "../../../common/script/repeated/loadComponent";
import '../style/main.scss';

document.addEventListener("DOMContentLoaded", () => {
  loadComponent(document, {
    isLoadLogin: true,
    isLoadNavBar: true,
    isLoadSideBar: true,
    isLoadFooter: true,
  });


});