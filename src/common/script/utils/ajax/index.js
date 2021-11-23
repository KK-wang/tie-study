import { interceptReq, interceptRes } from "./interceptor";
import message from "../message";

/* 基于原生的 XHR 封装一个自己的支持 Promise 的 Ajax 实现 */
/*
 * 核心函数 request 的 option 包括:
 * url(String): 可以传入相对 URL，此时将拼接 .env 的 API_SERVER 变量，也可以传入绝对 URL，此时不拼接 .env 中的变量。
 * method(String): 请求所使用的方法。
 * query(Object): get 方法所使用的数据载体，query 与 payload 中选取一个。
 * payload(Object): post 方法所使用的数据载体，query 与 payload 中选取一个。
 * timeout(Number): 网络请求的最长请求时间。
 * headers(Object): 所发送的网络请求的额外请求头。
 */

// 自定义的 Ajax 的核心函数：
function request({url,
                 method,
                 query = null,
                 payload = null,
                 timeout = 5000,
                 headers = {},
                 responseType = 'json'}) {
  // 这里的 headers 默认值取空对象 {} 的原因是 Object.keys(headers) 在 headers === null 时报 convert 错误。
  return new Promise(async (resolve, reject) => {
    const xhr = new XMLHttpRequest(),
      newUrl = /^https?[\s\S]*$/.test(url) ? url : `${process.env.API_SERVER}` + url;

    let newQuery = undefined,
      newPayload = undefined;

    // 请求方法并不会与参数传递形式绑定。
    if (query !== null) {
      newQuery = '?';
      Object.keys(query).forEach((property) => {
        newQuery += (property + '=' + query[property] + '&');
      });
      newQuery = newQuery.slice(0, newQuery.length - 1);
    }

    if (payload !== null) {
      if (payload instanceof FormData) {
        newPayload = payload;
      } else {
        newPayload = JSON.stringify(payload);
      }
    }

    let timeoutID; // 网络超时记录。
    xhr.onreadystatechange = async () => {
      if (xhr.readyState === 4) {
        try {
          // 响应拦截器。
          clearTimeout(timeoutID);
          const res = await interceptRes(xhr);
          resolve(res);
        } catch (e) {
          // 业务错误不进行统一处理。
          reject(e);
        }
      }
    }

    xhr.open(method, newQuery === undefined ? newUrl : newUrl + newQuery, true);
    /* xhr.responseType 是一个枚举字符串值，用于指定响应中包含的数据类型，默认为 json。*/
    xhr.responseType = responseType;
    /* 禁止 xhr 发送 Cookie。*/
    xhr.withCredentials = false;

    try {
      // 请求拦截器。
      await interceptReq(xhr, url, headers);
      xhr.send(newPayload === undefined ? null : newPayload);
      // 停掉超时请求。
      timeoutID = setTimeout(() => {
        xhr.abort();
        throw "网络请求超时...";
      }, timeout);
    } catch (e) {
      // 技术错误在这里进行统一处理。
      message({
        message: e,
        type: 'error'
      });
      reject(e);
    }
  });
}

export default request;
