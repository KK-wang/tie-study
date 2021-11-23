// Cookie 会被自动加到 HTTP Headers 中，因此不要在 Cookie 中存放大量数据。
// 设置 HTTP-Only。
/*
* 在 JavaScript 中只有 DOM 的 document.cookie 属性可以处理 cookie，根据用法不同，该属性的表现迥异。
* 1.要使用该属性获取值时，document.cookie 返回包含页面中所有有效 cookie 的字符串（只包括 key-value），以分号分割，
*   由于 cookie 中的名和值都是经过 URL 编码的，因此必须使用 decodeURIComponent() 解码。
* 2.在设置值时，可以通过 document.cookie 属性设置新的 cookie 字符串。这个字符串在被解析后会添加到原有 cookie 中。
*   设置 document.cookie 不会覆盖之前存在的任何 cookie，除非设置了已有的 cookie。
* 3.设置 cookie 时，只有 cookie 的名和值是必须的，设置时最好使用 encodeURIComponent() 进行编码。cookie 的设置格式
*   如下：name=value; expires=expiration_time; path=domain_path; domain=domain_name; secure
* */
// 考虑到当前系统的复杂度，目前我开发的 cookie 操作类只支持 key，value，expires 属性。

export default class Cookie {
  static get(key) {
    let cookieKey = `${encodeURIComponent(key)}=`,
      // encodeURIComponent() 函数的作用是编码特殊字符，譬如中文字符，^#什么的。
      cookieStart = document.cookie.indexOf(cookieKey),
      cookieValue = undefined;
    if (cookieStart !== -1) {
      let cookieEnd = document.cookie.indexOf(";", cookieStart);
      if (cookieEnd === -1) cookieEnd = document.cookie.length;
      // 要查询的 cookie 位于末尾。
      cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieKey.length, cookieEnd));
      // decodeURIComponent() 函数的作用主要是解码特殊字符。
    }
    return cookieValue;
  }

  static set(key, value, expires) {
    /* 需要注意的是，这里的 expires 的单位是天，即 24 小时。*/
    let cookieText = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    const expiresDate = new Date(Date.now() + expires * 24 * 60 * 60 * 1000);
    cookieText += `;expires=${expiresDate.toGMTString()}`;
    // 这里注意，需要将 Date 对象转化为字符串，时间格式为 GMT。
    document.cookie = cookieText;
  }

  static remove(key) {
    // 没有直接删除已有 cookie 的方法。只能再次设置同名 cookie（包括相同路径、域和安全选项），但要将其过期时间设置为某个过去的时间。
    Cookie.set(key, "", new Date(0));
  }

}

