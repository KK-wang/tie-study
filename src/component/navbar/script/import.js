// 优化打包后的文件的体积。
import '@/store/index'
import Cookie from "../../../common/script/utils/cookie";

export default function () {
  document.querySelector('.web-logo').addEventListener('click', () => {
    window.location.href = `${process.env.STATIC_SERVER}/html/index.html`;
  });
  document.querySelector('.course').addEventListener('click', () => {
    window.location.href = `${process.env.STATIC_SERVER}/html/index.html`;
  });
  document.querySelector('span.my-course.btn').addEventListener('click', () => {
    window.location.href = `${process.env.STATIC_SERVER}/html/mycourse.html`;
  });
  document.querySelector('span.profile.btn').addEventListener('click', () => {
    window.location.href = `${process.env.STATIC_SERVER}/html/profile.html`;
  });
  document.querySelector('.quit-btn').addEventListener('click', () => {
    Cookie.remove("token");
    window.location.href = `${process.env.STATIC_SERVER}/html/index.html`;
  });
  if (Cookie.get("token") !== undefined) {
    const avatarImg = document.querySelector('.avatar .image');
    avatarImg.src = window.$store.userAvatarGetter();
    avatarImg.classList.add('trueAvatar');
    document.querySelector('.avatar .panel .brief-info .stu-name span').textContent = `${window.$store.nicknameGetter()}(${window.$store.truenameGetter() === null ? '未实名' : window.$store.truenameGetter()})`;
    document.querySelector('.avatar .panel .brief-info .stu-id span').textContent = window.$store.snoGetter();
  }
}
