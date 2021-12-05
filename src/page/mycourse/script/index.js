import "@/common/script/utils/module.js"
// 为了使用自己封装的模块化方法，必须引入这个文件。
import loadComponent from "../../../common/script/repeated/loadComponent";
import '../style/main.scss';

import changeShowWay from "./changeShowWay";

document.addEventListener('DOMContentLoaded', () => {
  // DOMContentLoaded 是 HTML 页面的其中一个生命周期，他代表的含义如下：
  /* 浏览器已完全加载 HTML，并构建了 DOM 树，
   * 但像 <img> 和样式表之类的外部资源可能尚未加载完成，
   * 因此处理程序可以查找 DOM 节点，并初始化接口。
   * */
  loadComponent(document, {
    isLoadLogin: true,
    isLoadNavBar: true,
    isLoadSideBar: true,
    isLoadFooter: true,
  }, () => {
    const avatar = document.querySelector('.banner-content img'),
      hour = parseInt(new String(new Date()).match(/\d{2}(?=:)/));
    avatar.src = window.$store.userAvatarGetter();
    avatar.nextElementSibling.innerHTML = `
      <div>${
        hour >= 0 && hour <= 6 ? '晚上' : hour >= 7 && hour <= 11 ? '上午' : hour >= 12 && hour <= 13 ? '中午' : 
        hour >= 14 && hour <= 18 ? '下午' : '晚上'
      }好，${window.$store.truenameGetter() ? window.$store.truenameGetter() : window.$store.nicknameGetter()}</div>
      <div>${window.$store.signGetter() ? window.$store.signGetter() : '设计您的个性签名，展示不一样的自己!'}</div>
    `;
  });

  // 下面使用异步动态加载:
  /* 1.异步加载 course。*/
  const courseATag = document.querySelector('a[href="#course"]'), courseATagFunc = async () => {
    const module = await import(
      /* webpackChunkName: "mycourse.course" */
      /* webpackPrefetch: true */
      './course');
    new module.default();
    // 防止重复 import() 加载和渲染。
    courseATag.removeEventListener('click', courseATagFunc);
  };
  courseATag.addEventListener('click', courseATagFunc);

  /* 2.异步加载 collection。*/
  const collectionATag = document.querySelector('a[href="#collection"]'), collectionATagFunc = async () => {
    const module = await import(
      /* webpackChunkName: "mycourse.course" */
      /* webpackPrefetch: true */
      './collection');
    new module.default();
    // 防止重复 import() 加载和渲染。
    collectionATag.removeEventListener('click', collectionATagFunc);
  };
  collectionATag.addEventListener('click', collectionATagFunc);

  /* 3.异步加载 order。*/
  const orderATag = document.querySelector('a[href="#order"]'), orderATagFunc = async () => {
    const module = await import(
      /* webpackChunkName: "mycourse.course" */
      /* webpackPrefetch: true */
      './course');
    new module.default();
    // 防止重复 import() 加载和渲染。
    orderATag.removeEventListener('click', orderATagFunc);
  };
  orderATag.addEventListener('click', orderATagFunc);

  // 自动触发 click 事件，使得 import() 懒加载能够生效。
  const fakeClickEvent = document.createEvent("MouseEvents");
  fakeClickEvent.initMouseEvent("click", true, true, document.defaultView,
    0, 0, 0, 0, 0, false, false,
    false, false, 0, null);
  switch (window.location.hash) {
    case "#collection":
      collectionATag.dispatchEvent(fakeClickEvent);
      break;
    case "#order":
      orderATag.dispatchEvent(fakeClickEvent);
      break;
    default:
      courseATag.dispatchEvent(fakeClickEvent);
  }
});
