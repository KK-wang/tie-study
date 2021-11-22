import request from "../../common/script/utils/ajax";

export default function getCourseHeadData (courseId) {
  return request({
    url: '/api/course',
    method: 'get',
    query: {
      courseId
    }
  });
}
