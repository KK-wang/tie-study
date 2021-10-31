import request from '@/common/script/utils/request';
export function realInfoVerification(sno, password) {
  return request({
    url: '/api/user/approval',
    method: 'post',
    data: {
      sno,
      password
    }
  });
}
