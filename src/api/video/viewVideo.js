import request from '@/common/script/utils/request';

export default function viewVideo(lessonId) {
  return request({
    url: '/api/oss/lesson',
    method: 'get',
    params: {
      lessonId
    }
  });
}
