import request from '@/common/script/utils/request';

export default function viewVideo(lessonId) {
  return request({
    url: '/api/oss/watchLesson',
    method: 'get',
    params: {
      lessonId
    }
  });
}
