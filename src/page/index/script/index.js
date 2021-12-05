import '../style/main';
import './nav';
import './banner';
import './sortbox';

import loadComponent from "../../../common/script/repeated/loadComponent";

document.addEventListener("DOMContentLoaded", () => {
  loadComponent(document, {
    isLoadLogin: true,
    isLoadNavBar: true,
    isLoadSideBar: true,
    isLoadFooter: true,
  });
});

