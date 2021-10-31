import request from '@/common/script/utils/request';
export default function getCourseHeadData (courseId) {
  return request({
    url: '/api/course',
    method: 'get',
    params: {
      courseId
    }
    // params 和 data 一定要传对象过去。
  });
}
