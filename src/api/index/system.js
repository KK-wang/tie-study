import request from "../../common/script/utils/request";

export function getSystems() {
  return request({
    url: '/api/course/system/list',
    method: 'get',
    params: {}
  })
}

export function getCoursesInSys(params) {
  return request({
    url: '/api/course/system',
    method: 'get',
    params
  })

}

export function getBanners() {
  return request({
    url: '/api/course/carousel',
    method: 'get',
    params: {}
  })
}