import {options, contents} from './videoSideBar'
import {getQuery} from "../../../common/script/utils/commonUtils";
import {getChapter, getLesson} from "../../../api/course/catalog";

window.addEventListener('load', () => {
  let videoSidebar = document.querySelector('.video-sidebar');

  options[0].addEventListener('click', () => {
    videoSidebar.style.width = '350px';
    contents[0].style.display = 'block';
    contents[1].style.display = 'none';
    contents[2].style.display = 'none';
  });


  const query = getQuery();
  generateDirectory(query.courseId).then(() => {
    // 展示当前被选中的课时，旨在提高用户使用体验。
    const activeLessonId = sessionStorage.getItem("video-lessonId");
    document.querySelector('a[lessonId="' + activeLessonId +'"]').classList.add('active');
    // 属性选择器的值记着加引号 ""。
  });
  // 页面打开后默认显示目录页面
  // 生成目录。
});

async function generateDirectory(courseId) {
  // generateDirectory 用于生成目录内容。

  const directoryContent = document.querySelector('.directory-content');
  try {
    const chapterRes = await getChapter(parseInt(courseId));
    const chapterData = chapterRes.data;

    chapterData.sort((a, b) => parseInt(a.sort) - parseInt(b.sort));
    // 章节排序，这是必要的，后端返回来的数据并不是有序的。
    let wholeLessonIndex = 1;
    for (let i = 0; i < chapterData.length; i++) {
      // chapter 的父亲结点是 directoryContent。
      const chapterEle = document.createElement('div');
      chapterEle.classList.add('chapter');
      let chapterEleChildrenHTML = `<div class="chapter-title"><span>章节</span><span class="order">${i + 1}</span><span class="title-content">${chapterData[i].title}</span></div>`;
      const lessonRes = await getLesson(parseInt(chapterData[i].chapterId));
      const lessonData = lessonRes.data;

      lessonData.sort((a, b) => parseInt(a.sort) - parseInt(b.sort));
      for (let j = 0; j < lessonData.length; j++) {
        // 这里的渲染还有一些问题，需要我们给当前播放的 <a> 一个高亮标识。
        chapterEleChildrenHTML += `
          <a class="lesson" href="${process.env.STATIC_SERVER}/html/video.html?lessonId=${lessonData[j].lessonId}&courseId=${courseId}" lessonId=${lessonData[j].lessonId}>
            <span class="order">课时${wholeLessonIndex}</span>
            <span class="circle ${lessonData[j].isStudied === 2 ? 'full' : lessonData[j].isStudied === 1 ? 'half-full' : '' }"></span>
            <span class="title">${lessonData[j].title}</span>
            <span class="time">
                ${lessonData[j].length}
                <svg t="1634370043637" class="icon" viewBox="0 0 1024 1024" p-id="5776" width="25" height="25"><path d="M204.8 236.8A19.2 19.2 0 0 0 185.6 256v512c0 10.5984 8.6016 19.2 19.2 19.2h614.4a19.2 19.2 0 0 0 19.2-19.2V256A19.2 19.2 0 0 0 819.2 236.8H204.8z m0-64h614.4c45.9264 0 83.2 37.2736 83.2 83.2v512c0 45.9264-37.2736 83.2-83.2 83.2H204.8A83.2 83.2 0 0 1 121.6 768V256c0-45.9264 37.2736-83.2 83.2-83.2z" p-id="5777" fill="#999B9C"></path><path d="M670.7712 485.0176a52.48 52.48 0 0 1-17.9712 71.9872l-195.7376 117.4016a52.48 52.48 0 0 1-79.4624-44.9536V394.5472a52.48 52.48 0 0 1 79.4624-44.9536L652.8 466.944c7.3728 4.4544 13.568 10.5984 17.9712 18.0224z m-229.1712-70.144v194.2016L603.392 512l-161.792-97.0752z" p-id="5778" fill="#999B9C"></path></svg>
            </span>
          </a>
        `;
        wholeLessonIndex++;
      }
      chapterEle.innerHTML = chapterEleChildrenHTML;
      directoryContent.appendChild(chapterEle);
    }
  } catch (e) {
    console.log(e);
  }
}


