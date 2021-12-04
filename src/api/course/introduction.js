import request from "../../common/script/utils/ajax";

function getCourseEvaluation(query) {
  return request({
    url: '/api/course/comment/list',
    method: 'get',
    query
  });
}

function getCourseDescn(courseId) {
  return request({
    url: '/api/course/descn',
    method: 'get',
    query: {
      courseId
    }
  });
}

export {
  getCourseEvaluation,
  getCourseDescn
}
