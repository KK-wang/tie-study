import request from "../../common/script/utils/ajax";

export default function getMyCourse(query) {
  return request({
    url: '/api/userInfo/course/list',
    method: 'get',
    query
  });
}