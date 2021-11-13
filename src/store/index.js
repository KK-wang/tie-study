import {getCookie} from "../common/script/utils/cookie";

class Store {
  // 此时的状态存储到了内存中。
  constructor({ userAvatar, sno, truename }) {
    this.userAvatar = userAvatar;
    this.sno = sno;
    this.truename = truename;
  }

  userAvatarSetter(userAvatar) {
    this.userAvatar = userAvatar;
    // 全局状态管理不能用代理，代理是 proxy 的改变会走 handler，被 proxy 的对象不会走 handler。
  }

  snoSetter(sno) {
    this.sno = sno;
  }

  truenameSetter(truename) {
    this.truename = truename;
  }

  userAvatarGetter() {
    return this.userAvatar;
  }

  snoGetter() {
    return this.sno;
  }

  truenameGetter() {
    return this.truename;
  }
}

if (getCookie("token")) {
  // token 存储到了 Cookie 中，用户状态保存到了 localStorage 中，方法保存到了内存中。
  const storeProperty = JSON.parse(localStorage.getItem("store"));
  window.$store = new Store(storeProperty);
} else {
  window.$store = new Store({});
}

window.addEventListener('beforeunload', (e) => {
  localStorage.setItem("store", JSON.stringify(window.$store));
});
