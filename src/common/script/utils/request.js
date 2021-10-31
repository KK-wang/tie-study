import axios from "axios";
import { getCookie, setCookie } from "./cookie";

const request = axios.create({
  baseURL: '/devAPI',
  timeout: 5000,
  validateStatus: status => status < 500
});

const tokenFree = [
  '/api/user/token',
  '/api/user/image',
  '/api/user',
  '/api/user/approval'
]

request.interceptors.request.use(config => {
  if (!tokenFree.includes(config.url)) {
    config.headers.token = getCookie('token');
    // 如果请求的 URL 不是 /api/user/token 的话，加上 token。
  }
  return config;
}, err => {
  return Promise.reject(err);
});
/*
 * 同一时间只能登陆一个账户，否则 token 会失效。
 */

request.interceptors.response.use(res => {
  console.log("res ", res);
  if (res.status !== 200) {
    // 服务端响应非 200 就会来到这里。
    return Promise.reject(res.status);
  } else {
    if (String(res.data.code).charAt(0) !== '2') {
      // 后端自定义码非以 2 开头则来到这里。
      return Promise.reject(res.data);
    } else {
      if (res.headers.authorization !== undefined) {
        setCookie('token', res.headers.authorization, 7);
      }
      // 设置 Token。
      return Promise.resolve(res.data);
    }
  }
}, err => {
  console.log("err ", err);
  // 网络故障或者服务端响应 500 就会来到这里。
  return Promise.reject(err);
});

export default request;

