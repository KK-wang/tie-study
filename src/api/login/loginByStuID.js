import request from '@/common/script/utils/request';
export function loginByStuID(sno, password) {
  return request({
    url: '/api/user/token',
    method: 'post',
    data: {
      sno,
      password
    }
  });
}
