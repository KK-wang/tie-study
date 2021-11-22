import request from "../../common/script/utils/ajax";

export function getCartItems(query) {
  return request({
    url: '/api/cart',
    method: 'get',
    query
  });
}
