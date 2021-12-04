export default function recordUserInfo(info) {
  // 公共的代码，用来向 window.$store 中写入用户信息。
  window.$store.userAvatarSetter(info.avatar);
  window.$store.snoSetter(info.sno);
  window.$store.truenameSetter(info.truename);
  window.$store.nicknameSetter(info.nickname);
  window.$store.signSetter(info.sign);
}