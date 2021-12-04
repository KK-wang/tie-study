import request from "../../common/script/utils/ajax";

function aliPay(payload) {
  return request({
    url: '/api/order/ali/h5',
    method: 'post',
    payload
  });
}

function TencentPay() {

}

export {
  aliPay,
  TencentPay
}