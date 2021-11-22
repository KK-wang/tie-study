import request from "../../common/script/utils/ajax";

export function getSystems() {
  return request({
    url: '/api/course/system/list',
    method: 'get',
  });
}

export function getCoursesInSys(query) {
  return request({
    url: '/api/course/system',
    method: 'get',
    query
  });
}

export function getBanners() {
  return request({
    url: '/api/course/carousel',
    method: 'get',
  });
}
