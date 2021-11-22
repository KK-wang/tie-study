import { getCookie, setCookie } from "../cookie";
import message from "../message";

const tokenFree = [
  '/api/user/token',
  '/api/user/image',
  '/api/user',
  '/api/user/approval'
];

function interceptReq(xhr, url, headers) {
  try {
    if (!tokenFree.includes(url)) {
      xhr.setRequestHeader("token", getCookie('token'));
      // 如果请求的 URL 不是 /api/user/token 的话，加上 token。
    }
    const headersKey = Object.keys(headers);
    headersKey.forEach(property => {
      xhr.setRequestHeader(property, headers[property]);
      /* 请求头的设置必须在 xhr 打开之后，并且在 send 之前。*/
      // 添加自定义请求头。
    });
    if (!headersKey.includes("Content-Type")) {
      // 设置默认的 Content-Type 请求头。
      xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    }
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
}

function interceptRes(xhr) {
  try {
    if (xhr.status !== 200) {
      // 服务端响应非 200（例如 500）=>
      message({
        // 技术错误在这里处理。
        message: `${xhr.status}: ${xhr.statusText}`,
        type: 'error'
      });
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
          setCookie('token', token, 7);
        }
        return Promise.resolve(res);
      }
    }
  } catch (e) {
    return Promise.reject(e);
  }
}

export {
  interceptReq,
  interceptRes
}
