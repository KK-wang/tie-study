import request from "../../common/script/utils/ajax";

export default function generateOrder(payload) {
  return request({
    url: '/api/order',
    method: 'post',
    payload
  });
}
