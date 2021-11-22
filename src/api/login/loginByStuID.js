import request from "../../common/script/utils/ajax";
export function loginByStuID(sno, password) {
  return request({
    url: '/api/user/token',
    method: 'post',
    payload: {
      sno,
      password
    }
  });
}
