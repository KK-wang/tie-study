import request from "../../common/script/utils/ajax";

export function realInfoVerification(sno, password) {
  return request({
    url: '/api/user/approval',
    method: 'post',
    payload: {
      sno,
      password
    }
  });
}
