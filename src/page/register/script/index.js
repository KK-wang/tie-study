import '../style/main.scss'
import Register from "./register";
import '@/store/index';

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('.web-logo .web-logo-img').addEventListener('click', () => {
    window.location.href = `${process.env.STATIC_SERVER}/html/index.html`;
  }); // logo 跳转链接。
  new Register();
});
