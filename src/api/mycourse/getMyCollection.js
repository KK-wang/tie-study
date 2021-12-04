import request from "../../common/script/utils/ajax";

export default function getMyCollection(query) {
  return request({
    url: '/api/userInfo/collection',
    method: 'get',
    query
  });
}