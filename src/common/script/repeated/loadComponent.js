import "../utils/module";
import Cookie from "../utils/cookie";

export default function loadComponent(document, {isLoadLogin = false,
                                                 isLoadNavBar = false,
                                                 isLoadSideBar = false,
                                                 isLoadFooter = false}, callback) {
  // callback 为自定义回调函数，会在全部加载完公有组件之后执行。
  Promise.all([
    new Promise(resolve => {
      if (isLoadLogin && Cookie.get("token") === undefined) {
        document.querySelector('.login-container').load(`${process.env.STATIC_SERVER}/html/login.html #login`, async () => {
          const module = await import( /* webpackChunkName: "login.import" */ '../../../component/login/script/import');
          module.default();
          resolve();
        });
      } else resolve();
    }),
    new Promise(resolve => {
      if (isLoadNavBar) {
        document.querySelector('.nav-bar-container').load(`${process.env.STATIC_SERVER}/html/navbar.html #nav-bar`, async () => {
          const module = await import( /* webpackChunkName: "navbar.import" */ '../../../component/navbar/script/import');
          module.default();
          resolve();
        });
      } else resolve();
    }),
    new Promise(resolve => {
      if (isLoadSideBar) {
        document.querySelector('.side-bar-container').load(`${process.env.STATIC_SERVER}/html/sidebar.html #side-bar`, async () => {
          const module = await import( /* webpackChunkName: "sidebar.import" */ '../../../component/sidebar/script/import');
          module.default();
          resolve();
        });
      } else resolve();
    }),
    new Promise(resolve => {
      if (isLoadFooter) {
        document.querySelector('.footer-container').load(`${process.env.STATIC_SERVER}/html/footer.html #footer`, async () => {
          const module = await import( /* webpackChunkName: "footer.import" */ '../../../component/footer/script/import');
          module.default();
          resolve()
        });
      } else resolve();
    })
  ]).then(() => callback && callback());
}
