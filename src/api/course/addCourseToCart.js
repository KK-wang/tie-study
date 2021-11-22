import request from "../../common/script/utils/ajax";

export default function (courseId) {
  return request({
    url: '/api/cart/item',
    method: 'post',
    payload: {
      courseId
    }
  });
}
