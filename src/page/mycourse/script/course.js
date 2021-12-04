import getMyCourse from "../../../api/mycourse/getMyCourse";
import message from "../../../common/script/utils/message";
import {format} from "../../../common/script/utils/commonUtils";

export default class Course {

  constructor() {
    this.courseContentUl = document.querySelector('.course-content .course-content-ul');
    this.courseList = null;
    this.sortType = undefined;
    this.showType = undefined;

    this.getMyCourseInvoker().then(() => this.renderCourseContent()).catch(() => {});
    // 请求课程，在数据到达之后对课程进行渲染。
  }

  async getMyCourseInvoker() {
    // 请求课程的网络接口。
    try {
      const res = await getMyCourse({
        headTime: format(new Date(), "yyyy-MM-dd hh:mm:ss"),
        pageNum: 1,
        pageSize: 100,
      });
      this.courseList = res.data.courseList;
      this.sortType = res.data.sortType;
      this.showType = res.data.showType;
      return Promise.resolve();
    } catch (e) {
      message({
        message: `${e.code}: ${e.msg}`,
        type: 'error',
        duration: 1500
      });
      return Promise.reject();
    }
  }

  renderCourseContent() {
    // 渲染课程内容。
    let courseContentUlInnerHTML = '';
    if (this.courseList.length === 0) {
      courseContentUlInnerHTML += `
        <div style="
          font-size: 34px;
          position:fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        ">
          您还没有购买任何课程
        </div>
      `;
    } else {
      if (this.showType === 0) {
        /* 简略排序。*/
        for (let course of this.courseList) {
          courseContentUlInnerHTML += `
          <span class="course-content-li">
            <img src="${course.cover}" alt="">
            <div class="course-li-info">
              <div class="course-li-info-title">${course.title}</div>
              <div class="studied-or-operation">
                ${ course.studiedNum !== 0 ?
                  `<a href="${process.env.STATIC_SERVER}/html/course.html?courseId=${course.courseId}">开始学习</a>` :
                  `<span class="fake"></span>
                   <span class="real" style="width: ${200 * course.studiedNum / course.lessonNum}px"></span>
                   <div class="studied-tips">
                     <a href="${process.env.STATIC_SERVER}/html/course.html?courseId=${course.courseId}">
                      已学习${course.studiedNum}/${course.lessonNum}课时，继续学习
                     </a>
                   </div>`
                 }
              </div>
            </div>
          </span>
        `;
        }
        courseContentUlInnerHTML += `
          <span class="fix-justify">
            <i class="course-content-li"></i>
            <i class="course-content-li"></i>
            <i class="course-content-li"></i>
            <i class="course-content-li"></i>
            <i class="course-content-li"></i>
            <i class="course-content-li"></i>
            <i class="course-content-li"></i>
            <i class="course-content-li"></i>
            <i class="course-content-li"></i>
          </span>
        `;
      } else {
        /* 详情排序。*/


      }
    }
    this.courseContentUl.innerHTML = courseContentUlInnerHTML;
  }

  sortByStudied() {


  }

  sortByAdded() {

  }





}