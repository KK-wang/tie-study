import { getChapter, getLesson, submitEva } from "../../../../api/course/catalog";
import {getQuery} from "../../../../common/script/utils/commonUtils";
import {debounce} from "../../../../common/script/utils/commonUtils";
import message from "../../../../common/script/utils/message";

function changeIsGiveStarsActive() {
  const giveStars = document.querySelector('.give-stars');
  giveStars.addEventListener('click', () => {
    if (giveStars.classList.length !== 2) giveStars.classList.add('active');
  });
}

function renderProgressBar(halfFull, full, total, continueTitle) {
  const learningProgressBarLength = document.querySelector('.learning-progress-bar').clientWidth,
    learningProgressBarFill = document.querySelector('.learning-progress-bar-fill'),
    learningProgressBarTips = document.querySelector('.learning-progress-bar-tips'),
    learningProgressBarBtn = document.querySelector('.learning-progress-bar-btn'),
    learningProgressBarNext = document.querySelector('.learning-progress-bar-next');
  learningProgressBarFill.style.width = `${(full / total) * learningProgressBarLength}px`;
  learningProgressBarTips.innerHTML = `目前已完成 <span>${full}/${total}</span> 个课时，加油啊！`;
  learningProgressBarBtn.textContent = halfFull > 0 ? '继续学习' : '开始学习';
  learningProgressBarNext.innerHTML = `下一课时 : <span>${continueTitle}</span>`;
}

async function generateChapterAndLesson(isBought) {
  try {
    const courseId = parseInt(getQuery().courseId);
    const res = await getChapter(courseId);
    // getChapter 获取章节。
    const data = res.data;
    /* 通过 sort 给 data 进行排序。*/
    data.sort((a, b) => parseInt(a.sort) - parseInt(b.sort));

    let full = 0, total = 0, halfFull = 0, continueTitle;
    // full 为上完了多少课时，total 为一共有多少课时。
    // 使用 innerHTML 添加 DOM。
    const chapterParent = document.querySelector('.catalog-and-evaluate .panel-li-catalog-container .panel-li-catalog');
    if (!isBought) chapterParent.addEventListener('click', (e) => {
      // 事件委托。
      if (e.target.tagName === 'A' && e.target.classList[0] === 'class-li') {
        message({
          message: '请先购买课程!',
          type: 'error',
          duration: 1500,
        });
      }
    });

    for (let i = 0; i < data.length; i++) {
      /* await 也会阻塞 for 循环的执行，只有在 await 等到结果之后，for 循环才会再继续下去。*/
      const chapter = document.createElement('div');
      chapter.classList.add('chapter');
      chapter.innerHTML = `
        <input type="checkbox" id="chapter${i}" value="${data[i].chapterId}">
        <label for="chapter${i}">
          <span>章节</span>
          <div class="chapter-serial-number"></div>
          <span>${data[i].title}</span>
          <img src="data:image/svg+xml;base64,PHN2ZyB0PSIxNjM0Mzg1ODcxNDcyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI0MTciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNNTExLjI5IDc5My45N0wxNTYuMjYgNDgwLjA0bC01Ni41MiA2My45MiA0MTEuNDQgMzYzLjgxTDkyNC4yIDU0NC4wMmwtNTYuNC02NC4wNHoiIHAtaWQ9IjI0MTgiIGZpbGw9IiM4RjhFOTQiPjwvcGF0aD48cGF0aCBkPSJNOTI0LjIgMjA2Ljk1bC01Ni40LTY0LjA0TDUxMS4yOSA0NTYuOSAxNTYuMjYgMTQyLjk3IDk5Ljc0IDIwNi45bDQxMS40NCAzNjMuODF6IiBwLWlkPSIyNDE5IiBmaWxsPSIjOEY4RTk0Ij48L3BhdGg+PC9zdmc+DQo=" alt="">
        </label>
        <div class="classes"></div>
      `;
      chapterParent.appendChild(chapter);
      const checkbox = chapter.querySelector('input[type="checkbox"]');
      const lessonRes = await getLesson(checkbox.value);
      // getLesson 获取课时。
      const lessonData = lessonRes.data;
      /* 通过 sort 给 lessonData 进行排序。*/
      lessonData.sort((a, b) => parseInt(a.sort) - parseInt(b.sort));

      if (i === 0) continueTitle = lessonData[0].title;
      total += lessonData.length;
      full += lessonData.filter((el) => el.isStudied === 2).length;
      halfFull += lessonData.filter((el) => el.isStudied !== 0).length;
      // 进度条渲染相关。

      const classes = chapter.querySelector('.classes');
      for (let j = 0; j < lessonData.length; j++) {
        const lesson = document.createElement('a');
        lesson.classList.add('class-li');
        if (isBought) lesson.setAttribute("href", `${process.env.STATIC_SERVER}/html/video.html?lessonId=${lessonData[j].lessonId}&courseId=${courseId}`);
        // 课程已购买。
        else lesson.setAttribute("href", 'javascript:void(0);');
        // 课程未购买。
        lesson.innerHTML = `
          <span>课时</span>
          <div class="class-li-state ${lessonData[j].isStudied === 2 ? 'full' : lessonData[j].isStudied === 1 ? 'half-full' : '' }"></div>
          <span>${lessonData[j].title}</span>
          <img src="data:image/svg+xml;base64,PHN2ZyB0PSIxNjM0Mzg4NTAxMDQ2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjMzNjIiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNMjA0LjggMjM2LjhBMTkuMiAxOS4yIDAgMCAwIDE4NS42IDI1NnY1MTJjMCAxMC41OTg0IDguNjAxNiAxOS4yIDE5LjIgMTkuMmg2MTQuNGExOS4yIDE5LjIgMCAwIDAgMTkuMi0xOS4yVjI1NkExOS4yIDE5LjIgMCAwIDAgODE5LjIgMjM2LjhIMjA0Ljh6IG0wLTY0aDYxNC40YzQ1LjkyNjQgMCA4My4yIDM3LjI3MzYgODMuMiA4My4ydjUxMmMwIDQ1LjkyNjQtMzcuMjczNiA4My4yLTgzLjIgODMuMkgyMDQuOEE4My4yIDgzLjIgMCAwIDEgMTIxLjYgNzY4VjI1NmMwLTQ1LjkyNjQgMzcuMjczNi04My4yIDgzLjItODMuMnoiIHAtaWQ9IjMzNjMiIGZpbGw9IiM4RjhFOTQiPjwvcGF0aD48cGF0aCBkPSJNNjcwLjc3MTIgNDg1LjAxNzZhNTIuNDggNTIuNDggMCAwIDEtMTcuOTcxMiA3MS45ODcybC0xOTUuNzM3NiAxMTcuNDAxNmE1Mi40OCA1Mi40OCAwIDAgMS03OS40NjI0LTQ0Ljk1MzZWMzk0LjU0NzJhNTIuNDggNTIuNDggMCAwIDEgNzkuNDYyNC00NC45NTM2TDY1Mi44IDQ2Ni45NDRjNy4zNzI4IDQuNDU0NCAxMy41NjggMTAuNTk4NCAxNy45NzEyIDE4LjAyMjR6IG0tMjI5LjE3MTItNzAuMTQ0djE5NC4yMDE2TDYwMy4zOTIgNTEybC0xNjEuNzkyLTk3LjA3NTJ6IiBwLWlkPSIzMzY0IiBmaWxsPSIjOEY4RTk0Ij48L3BhdGg+PC9zdmc+DQo=" alt="">
          <span>${lessonData[j].length}</span>
        `;
        classes.appendChild(lesson);
        // 判断最新的学习进度：
        if (lessonData[j].isStudied !== 0) continueTitle = lessonData[j].title;
      }
    }
    renderProgressBar(halfFull, full, total, continueTitle);
    // 渲染进程条。
  } catch (e) {
    message({
      message: e.code ? `${e.code} ${e.msg}` : e,
      type: 'error',
      duration: 1500,
    })
  }
}

function submitEvaluation() {
  const query = getQuery();
  let star = 0, content = '';
  const giveStars = document.querySelector('.user-evaluate-container .give-stars');
  giveStars.addEventListener('change', (e) => {
    star = e.target.value;
  });
  const enterEvaluation = document.querySelector('.enter-evaluation'),
    enterEvaEventFunc = (e) => {
      // 这里写一个防抖函数，防止反复触发。
      /* 1.函数防抖：在事件被触发 n 秒之后再执行回调，如果在这 n 秒内又被触发，则重新计时。*/
      /* 2.函数节流：每隔一段时间，只执行一次函数。*/
      content = e.target.textContent;
    };
  enterEvaluation.addEventListener('input', (e) => {
    debounce(enterEvaEventFunc, e, 1000);
  });

  // 提交课程评论。
  const commitEva = document.querySelector('.commit-btn'),
    commitEvaEventFunc = async (e) => {
      try {
        await submitEva(parseInt(query.courseId), content, parseInt(star));
        message({
          message: '评价提交成功',
          type: 'success',
          duration: 1500,
        });
        commitEva.removeEventListener('click', commitEvaEventFunc);
      } catch (e) {
        message({
          message: `${e.code} ${e.msg}`,
          type: 'error',
          duration: 1500,
        })
      }
    };
  commitEva.addEventListener('click', commitEvaEventFunc);
}

export default function (isBought) {
  // 执行所有的代码。
  changeIsGiveStarsActive();
  generateChapterAndLesson(isBought).then();
  submitEvaluation();
}
