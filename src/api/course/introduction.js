import request from '@/common/script/utils/request';

function getCourseEvaluation(params) {
  return request({
    url: '/api/course/comment/list',
    method: 'get',
    params
    // params 和 data 一定要传对象过去。
  });
}

export {
  getCourseEvaluation
}
