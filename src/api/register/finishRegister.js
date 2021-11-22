import request from "../../common/script/utils/ajax";

function uploadAvatar(formData) {
  return request({
    url: '/api/user/image',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
      // 配置请求头信息。
    },
    payload: formData
  });
}

function registerInfo(info) {
  return request({
    url: '/api/user',
    method: 'post',
    payload: info
  });
}

export {
  uploadAvatar,
  registerInfo
}
