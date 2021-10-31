/* 这里 aliyun-player 相关的代码通过 link 和 script 标签远程获取，感觉有点捞。*/
import viewVideo from "../../../api/video/viewVideo";
import {getQuery} from "../../../common/script/utils/commonUtils";


window.addEventListener('load', async () => {
  const { lessonId } = getQuery();
  try {
    console.log(typeof parseInt(lessonId));
    const videoRes = await viewVideo(parseInt(lessonId));
    const videoData = videoRes.data;

    console.log(videoData);

    const player = new Aliplayer({
      id: 'ali-player-container',
      // 播放器外层容器的 DOM 元素 ID。
      width:"1920px",
      // width 是播放器的宽度。
      height:"1280px",
      // height 是播放器的高度。
      vid:'0da29c61910d49f2b18df70194ae52ed',
      // 媒体转码服务的媒体ID。
      playauth:'',
      // playAuth 是视频播放的唯一凭证，每个播放凭证都绑定了用户的身份标识，不同用户的播放凭证不能互换，
      // 否则无法正常播放视频。另外，播放凭证是有时效性的（默认100秒）。
      cover:''
      // 这个 cover 是视频封面，需要填写正确的图片 URL 地址。
    });
  } catch (e) {
    console.log(e);
  }
});
