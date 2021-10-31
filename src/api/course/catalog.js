import request from '@/common/script/utils/request';

function getChapter(courseId) {
  return request({
    url: '/api/course/chapter',
    method: 'get',
    params: {
      courseId
    }
  });
}

function getLesson(chapterId) {
  return request({
    url: '/api/course/chapter/lesson',
    method: 'get',
    params: {
      chapterId
    }
  });
}

function submitEva(courseId, content, stars) {
  return request({
    url: '/api/course/comment',
    method: 'post',
    data: {
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
