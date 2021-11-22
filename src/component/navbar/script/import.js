if (process.env.NODE_ENV === 'development') {
  /* 这是用来实现 HMR 的代码，JS 模块中只有存在了这段代码才会开启 HMR。 */
  module.hot.accept((err) => {
    console.error(err);
  });
}

// 优化打包后的文件的体积。
import '@/store/index'
import {getCookie, removeCookie} from "../../../common/script/utils/cookie";

export default function () {
  document.querySelector('.web-logo').addEventListener('click', () => {
    window.location.href = `http://${process.env.STATIC_SERVER}/html/index.html`;
  });
  document.querySelector('.course').addEventListener('click', () => {
    window.location.href = `http://${process.env.STATIC_SERVER}/html/index.html`;
  });
  document.querySelector('span.my-course.btn').addEventListener('click', () => {
    window.location.href = `http://${process.env.STATIC_SERVER}/html/mycourse.html`;
  });
  document.querySelector('.quit-btn').addEventListener('click', () => {
    removeCookie("token");
    window.location.href = `http://${process.env.STATIC_SERVER}/html/index.html`;
  });
  if (getCookie("token") !== undefined) {
    const avatarImg = document.querySelector('.avatar .image');
    avatarImg.src = window.$store.userAvatarGetter();
    avatarImg.classList.add('trueAvatar');
    document.querySelector('.avatar .panel .brief-info .stu-name span').textContent = window.$store.truenameGetter();
    document.querySelector('.avatar .panel .brief-info .stu-id span').textContent = window.$store.snoGetter();
  }
}
