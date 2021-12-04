if (process.env.NODE_ENV === 'development') {
  /* 这是用来实现 HMR 的代码，JS 模块中只有存在了这段代码才会开启 HMR。 */
  module.hot.accept((err) => {
    console.error(err);
  });
}

import '../style/main.scss';
import fillDataInfo from './course-head';
import loadComponent from "../../../common/script/repeated/loadComponent";

document.addEventListener("DOMContentLoaded", async () => {
  loadComponent(document, {
    isLoadLogin: true,
    isLoadNavBar: true,
    isLoadSideBar: true,
    isLoadFooter: true,
  });

  try {
    /* 0.加载课程 head 部分，isBought 表示课程是否购买。*/
    const isBought = await fillDataInfo();

    // 为了减少加快初次渲染的速度，采用 import()。
    /* 1.介绍模块。*/
    const introduceATag = document.querySelector('a[href="#introduce"]'), introduceATagFunc = async () => {
      const module = await import(
        /* webpackChunkName: "course.introduce" */
        /* webpackPrefetch: true */
        './course-body/introduce-part-script');
      module.default();
      // 防止重复 import() 加载和渲染。
      introduceATag.removeEventListener('click', introduceATagFunc);
    };
    introduceATag.addEventListener('click', introduceATagFunc);

    /* 2.目录模块。*/
    const catalogATag = document.querySelector('a[href="#catalog"]'), catalogATagFunc = async () => {
      const module = await import(
        /* webpackChunkName: "course.catalog" */
        /* webpackPrefetch: true */
        './course-body/catalog-part-script');
      // module.default() 即为导入模块默认导出的东西。
      module.default(isBought);
      catalogATag.removeEventListener('click', catalogATagFunc);
    };
    catalogATag.addEventListener('click', catalogATagFunc);

    /* 3.笔记模块。*/
    /* 4.问答模块。*/
    /* 5.公告模块。*/

    // 自动触发 click 事件，使得 import() 懒加载能够生效。
    const fakeClickEvent = document.createEvent("MouseEvents");
    fakeClickEvent.initMouseEvent("click", true, true, document.defaultView,
      0, 0, 0, 0, 0, false, false,
      false, false, 0, null);
    switch (window.location.hash) {
      case "#catalog":
        catalogATag.dispatchEvent(fakeClickEvent);
        break;
      default:
        introduceATag.dispatchEvent(fakeClickEvent);
    }
  } catch (e) {
    console.log(e);
  }

});
