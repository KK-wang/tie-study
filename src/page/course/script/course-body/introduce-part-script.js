import {getCourseEvaluation, getCourseDescn} from "../../../../api/course/introduction";
import {getQuery, format} from "../../../../common/script/utils/commonUtils";
import message from "../../../../common/script/utils/message";

async function evaluation() {
  const getCourseEvaluationApiParams = {
    courseId: parseInt(getQuery().courseId),
    headTime: format(new Date(), "yyyy-MM-dd hh:mm:ss"),
    // 不知道时间是不是标准格式。
    pageNum: 1,
    pageSize: 3
  };

  try {
    const res = await getCourseEvaluation(getCourseEvaluationApiParams),
      evaluationList = res.data.commentItemVOList;

    if (evaluationList.length === 0) return;

    // 更新所有的头像。
    const avatars = document.querySelectorAll('.course-evaluation-content-li .course-evaluation-content-li-head img');
    for (let i = 0; i < avatars.length; i++) {
      avatars[i].src = evaluationList[i].avatar;
    }

    // 更新所有的 stu-info。
    const stuInfos = document.querySelectorAll('.course-evaluation-content-li .course-evaluation-content-li-head .stu-info');
    for (let i = 0; i < stuInfos.length; i++) {
      stuInfos[i].querySelector('span:first-child').textContent = evaluationList[i].nickname;
      stuInfos[i].querySelector('span:last-child').textContent = `学习${evaluationList[i].studiedNum}个课时评价`;
    }

    // 更新所有的 stars。
    const stars = document.querySelectorAll('.course-evaluation-content-li .course-evaluation-content-li-head .stars');
    for (let i = 0; i < stars.length; i++) {
      for (let star of stars[i].children) {
        star.classList.add('active');
        evaluationList[i].star--;
        if (evaluationList[i].star === 0) break;
      }
    }

    // 更新所有的评价内容。
    const evaluationBodies = document.querySelectorAll('.course-evaluation-content-li .course-evaluation-content-li-body');
    for (let i = 0; i < evaluationBodies.length; i++) {
      evaluationBodies[i].textContent = evaluationList[i].content;
    }

    // 更新所有的评价时间。
    const evaluationTimes = document.querySelectorAll('.course-evaluation-content-li .course-evaluation-content-li-footer');
    for (let i = 0; i < evaluationTimes.length; i++) {
      evaluationTimes[i].textContent = evaluationList[i].content;
    }

  } catch (e) {
    message({
      message: e.code === undefined ? e : `${e.code} ${e.msg}`,
      type: 'error',
      duration: 1500,
    });
  }
}

async function renderIntroduction() {
  const res = await getCourseDescn(parseInt(getQuery().courseId));
  document.querySelector('.panel-li:nth-child(1) .panel-li-introduce-container .panel-li-introduce').innerHTML = `${res.data.descn}`;
}

export default function () {
  renderIntroduction().then();
}
