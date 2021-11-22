HTMLElement.prototype.load = async function(url, callback) {
  const self = this, separatePos = url.indexOf(" ");
  // self 是取得的 DOM 元素。

  if (separatePos === -1) throw "function params error: url format error, it should be 'url <space> selector'"

  const selector = url.slice(separatePos + 1);
  url = url.slice(0, separatePos);

  try {
    const res = await request({
      url: url,
      method: 'get'
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}
