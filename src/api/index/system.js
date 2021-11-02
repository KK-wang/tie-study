import request from "../../common/script/utils/request";

export function getSystems() {
  return request({
    url: '/api/course/system/list',
    method: 'get',
    params: {}
  })
}

export function getBanners() {
  return request({
    url: 'api/carousel',
    method: 'get',
    params: {}
  })
}