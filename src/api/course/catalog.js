import request from "../../common/script/utils/ajax";

function getChapter(courseId) {
  return request({
    url: '/api/course/chapter',
    method: 'get',
    query: {
      courseId
    }
  });
}

function getLesson(chapterId) {
  return request({
    url: '/api/course/chapter/lesson',
    method: 'get',
    query: {
      chapterId
    }
  });
}

function submitEva(courseId, content, stars) {
  return request({
    url: '/api/course/comment',
    method: 'post',
    payload: {
      courseId,
      content,
      stars
    }
  });
}

export {
  getChapter,
  getLesson,
  submitEva,
}
