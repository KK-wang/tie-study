import request from "../../common/script/utils/ajax";

function getCourseEvaluation(query) {
  return request({
    url: '/api/course/comment/list',
    method: 'get',
    query
  });
}

export {
  getCourseEvaluation
}
