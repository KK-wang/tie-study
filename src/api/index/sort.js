import request from "../../common/script/utils/request";

export function getSort(params) {
  return request({
    url: '/api/course/category/list',
    method: 'get',
    params
  })
}