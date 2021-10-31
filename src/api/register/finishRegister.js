import request from '@/common/script/utils/request';

function uploadAvatar(formData) {
  return request({
    url: '/api/user/image',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
      // 配置请求头信息。
    },
    data: formData
  });
}

function registerInfo(info) {
  return request({
    url: '/api/user',
    method: 'post',
    data: info
  });
}

export {
  uploadAvatar,
  registerInfo
}
