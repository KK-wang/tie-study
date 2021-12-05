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