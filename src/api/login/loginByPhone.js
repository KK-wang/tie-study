import request from "../../common/script/utils/ajax";

export function loginByPhone(phone, code) {
  return request({
    url: '/api/user/token/phone',
    method: 'post',
    payload: {
      phone,
      code
    }
  });
}

export function getVerificationCode(phone) {
  return request({
    url: "/api/user/verification/phone",
    method: "get",
    query: {
      phone
    }
  });
}
