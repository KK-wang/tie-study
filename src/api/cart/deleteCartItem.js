import request from "../../common/script/utils/request";

export function deleteCartItem(params) {
  return request({
    url: '/api/cart/items',
    method: 'delete',
    params
  })


}