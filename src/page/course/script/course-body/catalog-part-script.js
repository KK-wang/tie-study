import $ from 'jquery';
import { getChapter, getLesson } from "../../../../api/course/catalog";
import {getQuery} from "../../../../common/script/utils";

function changeIsGiveStarsActive() {
  const giveStars = $('.give-stars'), labels = $('.give-stars label');
  labels.on('click', () => {
    const classList = giveStars.attr('class').split(" ");
    if (classList.indexOf('active') === -1) giveStars.addClass('active');
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

async function generateChapterAndLesson() {
  // const res = await getChapter(parseInt(getQuery().courseId));
  // const data = res.data;
  let full = 0, total = 0, halfFull = 0, continueTitle;
  // full 为上完了多少课时，total 为一共有多少课时。
  const data = [ // fake 数据。
    {
      chapterId: "1",
      title: "String1"
    },
    {
      chapterId: "2",
      title: "String2"
    },
    {
      chapterId: "3",
      title: "String3"
    },
    {
      chapterId: "4",
      title: "String4"
    },
  ];
  // 使用 innerHTML 添加 DOM。
  const chapterParent = document.querySelector('.catalog-and-evaluate .panel-li-catalog-container .panel-li-catalog');
  for (let i = 0; i < data.length; i++) {
    const chapter = document.createElement('div');
    chapter.classList.add('chapter');
    chapter.innerHTML = `
      <input type="checkbox" id="chapter${i}">
      <label for="chapter${i}">
        <span>章节</span>
        <div class="chapter-serial-number"></div>
        <span>${data[i].title}</span>
        <img src="data:image/svg+xml;base64,PHN2ZyB0PSIxNjM0Mzg1ODcxNDcyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI0MTciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNNTExLjI5IDc5My45N0wxNTYuMjYgNDgwLjA0bC01Ni41MiA2My45MiA0MTEuNDQgMzYzLjgxTDkyNC4yIDU0NC4wMmwtNTYuNC02NC4wNHoiIHAtaWQ9IjI0MTgiIGZpbGw9IiM4RjhFOTQiPjwvcGF0aD48cGF0aCBkPSJNOTI0LjIgMjA2Ljk1bC01Ni40LTY0LjA0TDUxMS4yOSA0NTYuOSAxNTYuMjYgMTQyLjk3IDk5Ljc0IDIwNi45bDQxMS40NCAzNjMuODF6IiBwLWlkPSIyNDE5IiBmaWxsPSIjOEY4RTk0Ij48L3BhdGg+PC9zdmc+DQo=" alt="">
      </label>
      <div class="classes"></div>
    `;
    chapterParent.appendChild(chapter);
    // const lessonRes = await getLesson(checkbox.value);
    // const lessonData = lessonRes.data;
    const lessonData = [
      {
        lessonId: 1,
        title: 'title1',
        type: 0,
        length: '22:32',
        isStudied: 2,
      },
      {
        lessonId: 2,
        title: 'title2',
        type: 0,
        length: '22:32',
        isStudied: 2,
      },
      {
        lessonId: 3,
        title: 'title3',
        type: 0,
        length: '22:32',
        isStudied: 1,
      },
      {
        lessonId: 4,
        title: 'title4',
        type: 0,
        length: '22:32',
        isStudied: 0,
      },
    ];
    if (i === 0) continueTitle = lessonData[0].title;
    total += lessonData.length;
    full += lessonData.filter((el) => el.isStudied === 2).length;
    halfFull += lessonData.filter((el) => el.isStudied !== 0).length;
    const classes = chapter.querySelector('.classes');
    for (let j = 0; j < lessonData.length; j++) {
      const lesson = document.createElement('div');
      lesson.classList.add('class-li');
      lesson.setAttribute("lessonId", lessonData[j].lessonId);
      // 这里应当设置一个自定义属性，保存一下 lessonId。
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
}

export default function () {
  // 执行所有的代码。
  changeIsGiveStarsActive();
  generateChapterAndLesson().then();
}
