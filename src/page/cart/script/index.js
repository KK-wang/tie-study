import '../style/main'
import './cart'

import loadComponent from "../../../common/script/repeated/loadComponent";

window.addEventListener("DOMContentLoaded", () => {
  loadComponent(document, {
    isLoadLogin: true,
    isLoadNavBar: true,
    isLoadFooter: true,
  });
});
