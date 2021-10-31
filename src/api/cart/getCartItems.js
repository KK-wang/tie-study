import request from "../../common/script/utils/request";

export function getCartItems(params) {
  return request({
    url: '/api/cart',
    method: 'get',
    params
  })
}