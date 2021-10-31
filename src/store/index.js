import {getCookie} from "../common/script/utils/cookie";

class Store {
  // 此时的状态存储到了内存中。
  constructor(userAvatar) {
    this.userAvatar = userAvatar;
  }

  userAvatarSetter(userAvatar) {
    this.userAvatar = userAvatar;
    document.querySelector('.nav-bar .avatar .image').src = userAvatar;
    // 全局状态管理不能用代理，代理是 proxy 的改变会走 handler，被 proxy 的对象不会走 handler。
  }

  userAvatarGetter() {
    return this.userAvatar;
  }


}

if (getCookie("token")) {
  // token 存储到了 Cookie 中，用户状态保存到了 localStorage 中，方法保存到了内存中。
  const storeProperty = JSON.parse(localStorage.getItem("store"));
  window.$store = new Store(storeProperty.userAvatar);
} else {
  window.$store = new Store();
}

window.addEventListener('beforeunload', (e) => {
  localStorage.setItem("store", JSON.stringify(window.$store));
});
