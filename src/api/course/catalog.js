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

export {
  getChapter,
  getLesson
}
