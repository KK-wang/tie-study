import Cookie from "../common/script/utils/cookie";

const privateWeakMap = new WeakMap();
// 利用 weakMap 实现 Class 私有成员。

class Store {
  // 此时的状态存储到了内存中。
  constructor({ userAvatar, sno, truename, nickname, sign }) {
    privateWeakMap.set(this, {
      userAvatar,
      sno,
      truename,
      nickname,
      sign,
    });
  }

  userAvatarSetter(userAvatar) {
    privateWeakMap.get(this).userAvatar = userAvatar;
  }

  snoSetter(sno) {
    privateWeakMap.get(this).sno = sno;
  }

  truenameSetter(truename) {
    privateWeakMap.get(this).truename = truename;
  }

  nicknameSetter(nickname) {
    privateWeakMap.get(this).nickname = nickname;
  }

  signSetter(sign) {
    privateWeakMap.get(this).sign = sign;
  }

  userAvatarGetter() {
    return privateWeakMap.get(this).userAvatar;
  }

  snoGetter() {
    return privateWeakMap.get(this).sno;
  }

  truenameGetter() {
    return privateWeakMap.get(this).truename;
  }

  nicknameGetter() {
    return privateWeakMap.get(this).nickname;
  }

  signGetter() {
    return privateWeakMap.get(this).sign;
  }

}

if (Cookie.get("token") !== undefined) {
  // token 存储到了 Cookie 中，用户状态保存到了 localStorage 中，方法保存到了内存中。
  const storeProperty = JSON.parse(localStorage.getItem("store"));
  window.$store = new Store(storeProperty);
} else {
  window.$store = new Store({});
}

window.addEventListener('beforeunload', (e) => {
  localStorage.setItem("store", JSON.stringify(privateWeakMap.get(window.$store)));
});
