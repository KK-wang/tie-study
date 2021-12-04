import request from "../../common/script/utils/ajax";

export default function collection(courseId) {
  return request({
    url: '/api/userInfo/collection',
    method: 'patch',
    payload: {
      courseId
    }
  });
}