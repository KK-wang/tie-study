import request from "../../common/script/utils/ajax";

export function getSort(query) {
  return request({
    url: '/api/course/category/list',
    method: 'get',
    query
  });
}
