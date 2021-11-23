import request from "./ajax";
import message from "./message";

HTMLElement.prototype.load = async function(url, callback) {
  const self = this, separatePos = url.indexOf(" ");
  // self 是取得的 DOM 元素。
  if (separatePos === -1) throw "function params error: url format error, it should be 'url <space> selector'";
  // 要想使用自定义的组件工具，需要遵循传入的格式。

  const selector = url.slice(separatePos + 1);
  url = url.slice(0, separatePos);
  // 获取传入的 url 和 selector。

  try {
    const res = await request({
      url: url,
      method: 'get',
      responseType: "document",
      // 设定返回数据的响应类型为 document。
    });
    self.appendChild(res.querySelector(selector));
    // 从 HTML 的角度添加组件，不需要管理 CSS，因为 webpack 已经自动注入了 CSS，但是默认的 JS 依旧需要在下面手动注入。
    callback().then();
    // 执行回调来加载 JS，这个回调是 async 的。
  } catch (e) {
    console.log(e);
    message({
      message: "遇到未知错误，web 组件无法加载...",
      type: 'error'
    })
  }
}
