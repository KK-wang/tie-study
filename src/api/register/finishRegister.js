import request from "../../common/script/utils/ajax";

function uploadAvatar(formData) {
  return request({
    url: '/api/user/image',
    method: 'post',
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
