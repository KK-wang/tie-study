import Cookies from "js-cookie";
// Cookie 会被自动加到 HTTP Headers 中，因此不要在 Cookie 中存放大量数据。
// 设置 HTTP-Only。

function setCookie(key, value, expires) {
  Cookies.set(key, value, { expires: expires });
}

function getCookie(key) {
  return Cookies.get(key);
}

function removeCookie(key) {
  Cookies.remove(key);
}

export {
  setCookie,
  getCookie,
  removeCookie
}
