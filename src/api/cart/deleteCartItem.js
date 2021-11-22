import request from "../../common/script/utils/ajax";

export function deleteCartItem(query) {
  return request({
    url: '/api/cart/items',
    method: 'delete',
    query
  });
}

export function clearCart() {
  return request({
    url: '/api/cart',
    method: 'delete'
  });
}
