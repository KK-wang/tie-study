import request from '@/common/script/utils/request';
export default function (courseId) {
  return request({
    url: '/api/cart/item',
    method: 'post',
    data: {
      courseId
    }
  });
}
