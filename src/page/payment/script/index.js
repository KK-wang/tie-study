import '../style/main';
import './payment';
import loadComponent from "../../../common/script/repeated/loadComponent";
import '@/store'

document.addEventListener("DOMContentLoaded", () => {
  loadComponent(document, {
    isLoadLogin: true,
    isLoadNavBar: true,
    isLoadSideBar: true,
    isLoadFooter: true
  });
});
