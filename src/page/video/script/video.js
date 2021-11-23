/* 这里 aliyun-player 相关的代码通过 link 和 script 标签远程获取，感觉有点捞。*/
import viewVideo from "../../../api/video/viewVideo";
import {getQuery} from "../../../common/script/utils/commonUtils";
import {getChapter} from "../../../api/course/catalog";

window.addEventListener('load', async () => {
  const { courseId, lessonId } = getQuery(), backToCourseBtn = document.querySelector('.back-to-course');
  backToCourseBtn.addEventListener('click', () => {
    window.location.href = `${process.env.STATIC_SERVER}/html/course.html?courseId=${courseId}#catalog`;
  });
  try {
    const videoRes = await viewVideo(parseInt(lessonId));
    const videoData = videoRes.data;

    // videoData 包含的内容如下：
    /*
     * lessonId: int 类型，
     * parentId(chapterId): int 类型。
     * title: lesson 的 title。
     * sort: lesson 的 sort。
     */

    document.querySelector('.video-title-lesson span').textContent = videoData.sort;
    document.querySelector('.video-title-lesson-title').textContent = videoData.title;
    sessionStorage.setItem("video-lessonId", videoData.lessonId);
    // 通过节点间的关系来访问结点能够提高 DOM 性能。

    const player = new Aliplayer({
      id: 'ali-player-container',
      // 播放器外层容器的 DOM 元素 ID。
      width: '100%',
      // width 是播放器的宽度。
      height: '80%',
      // height 是播放器的高度。
      vid: `${videoData.ossId}`,
      // ossId 就是 vid。
      playauth:`${videoData.playouth}`,
      // playAuth 是视频播放的唯一凭证，每个播放凭证都绑定了用户的身份标识，不同用户的播放凭证不能互换，
      // 否则无法正常播放视频。另外，播放凭证是有时效性的（默认100秒）。
      cover: sessionStorage.getItem('course-cover'), // 这个 cover 是视频封面，需要填写正确的图片 URL 地址。
      // videoHeight: `${videoContentHeight}px`,
      // videoWidth: `${videoContentWidth}px`,
      videoWidth: '100%',
      videoHeight: '80%',
      autoplay: false
    });

    const chapterRes = await getChapter(parseInt(courseId));
    const curChapter = chapterRes.data.filter((val) => val.chapterId === videoData.parentId);
    document.querySelector('.video-title-chapter span').textContent = curChapter[0].sort;
  } catch (e) {
    console.log(e);
  }
});
