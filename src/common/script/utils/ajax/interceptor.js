import Cookie from "../cookie";

const tokenFree = [
  '/api/user/token',
  '/api/user/image',
  '/api/user',
  '/api/user/approval'
];

function interceptReq(xhr, url, payload, headers) {
  try {
    if (!tokenFree.includes(url)) {
      xhr.setRequestHeader("token", Cookie.get('token'));
      // 如果请求的 URL 不是 /api/user/token 的话，加上 token。
    }
    const headersKey = Object.keys(headers);
    headersKey.forEach(property => {
      xhr.setRequestHeader(property, headers[property]);
      /* 请求头的设置必须在 xhr 打开之后，并且在 send 之前。*/
      // 添加自定义请求头。
    });
    if (!(payload instanceof FormData) && !("Content-Type" in headers)) {
      // 设置默认的 Content-Type 请求头，记着给 payload instanceof FormData 加括号。
      /* 需要注意的是，当我们传入的 payload 参数为 FormData 的实例时，
      不能去手动修改 Request Headers 中的 Content-Type 属性为 "multipart/form-data"，
      因为正确的请求头还应该加上分隔符 boundary=----WebKitFormBoundaryQuWFbaIxEuRYlpSW(例)。
      而分隔符只有在 HTTP 发出请求时才能够确定，因此我们不能手动修改，xhr 能够识别 FormData 实例并配置响应的请求头。*/
      xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    }
    return Promise.resolve();
  } catch (e) {
    return Promise.reject({
      code: 60002,
      msg: e,
    });
  }
}

function interceptRes(xhr) {
  try {
    if (xhr.status !== 200) {
      // 在这里处理技术错误，服务端响应非 200（例如 500）=>
      return Promise.reject({
        code: xhr.status,
        msg: xhr.statusText
      });
    } else {
      const res = xhr.response;
      if (res.code < 200 || res.code >= 300) {
        // 后端自定义码非以 2 开头则来到这里。
        return Promise.reject(res);
      } else {
        const token = xhr.getResponseHeader("authorization");
        if (token !== null) {
          // 设置 Token。
          Cookie.set('token', token, 7);
        }
        return Promise.resolve(res);
      }
    }
  } catch (e) {
    return Promise.reject({
      code: 60003,
      msg: e
    });
  }
}

export {
  interceptReq,
  interceptRes
}
