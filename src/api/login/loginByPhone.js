import request from '@/common/script/utils/request';
export function loginByPhone(phone, code) {
  return request({
    url: '/api/user/token/phone',
    method: 'post',
    data: {
      phone,
      code
    }
  });
}

export function getVerificationCode(phone) {
  return request({
    url: "/api/user/verification/phone",
    method: "get",
    params: {
      phone
    }
  });
}
