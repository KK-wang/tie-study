import '../style/main'
import './cart'

if (process.env.NODE_ENV === 'development') {
  /* 这是用来实现 HMR 的代码，JS 模块中只有存在了这段代码才会开启 HMR。 */
  module.hot.accept((err) => {
    console.error(err);
  });
}


import loadComponent from "../../../common/script/repeated/loadComponent";

window.addEventListener("DOMContentLoaded", () => {
  loadComponent(document, {
    isLoadLogin: true,
    isLoadNavBar: true,
    isLoadFooter: true,
  });
});
