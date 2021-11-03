import request from "../../common/script/utils/request";

export default function generateOrder(data) {
  return request({
    url: '/api/order',
    method: 'post',
    data
  });
}
