import "../utils/module";
import Cookie from "../utils/cookie";

export default function loadComponent(document, {isLoadLogin = false,
                                                 isLoadNavBar = false,
                                                 isLoadSideBar = false,
                                                 isLoadFooter = false,}) {
  if (isLoadLogin) {
    if (Cookie.get("token") === undefined) {
      document.querySelector('.login-container').load(`${process.env.STATIC_SERVER}/html/login.html #login`, async () => {
        const module = await import( /* webpackChunkName: "login.import" */ '../../../component/login/script/import');
        module.default();
      });
    }
  }

  if (isLoadNavBar) {
    document.querySelector('.nav-bar-container').load(`${process.env.STATIC_SERVER}/html/navbar.html #nav-bar`, async () => {
      const module = await import( /* webpackChunkName: "navbar.import" */ '../../../component/navbar/script/import');
      module.default();
    });
  }

  if (isLoadSideBar) {
    document.querySelector('.side-bar-container').load(`${process.env.STATIC_SERVER}/html/sidebar.html #side-bar`, async () => {
      const module = await import( /* webpackChunkName: "sidebar.import" */ '../../../component/sidebar/script/import');
      module.default();
    });
  }

  if (isLoadFooter) {
    document.querySelector('.footer-container').load(`${process.env.STATIC_SERVER}/html/footer.html #footer`, async () => {
      const module = await import( /* webpackChunkName: "footer.import" */ '../../../component/footer/script/import');
      module.default();
    });
  }
}
