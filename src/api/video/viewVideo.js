import request from "../../common/script/utils/ajax";

export default function viewVideo(lessonId) {
  return request({
    url: '/api/oss/lesson',
    method: 'get',
    query: {
      lessonId
    }
  });
}
