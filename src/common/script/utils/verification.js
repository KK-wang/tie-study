export default class Verification {
  static validateUsername(username) {
    // 验证用户名长度在 3-10 位之间。
    if (!/^[\d\D]{3,10}$/.test(username)) return "用户名长度应该在 3-10 位之间";
  }

  static validatePassword(password) {
    // 验证密码长度应该在 6 到 16 之间，并且包含数字和字母。
    if (!/^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,16}$/.test(password)) return "密码长度应该在 6 到 16 之间，并且包含数字和字母";
  }

  static validatePhoneNum(phoneNum) {
    // 验证手机号。
    if (!/^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(phoneNum)) return "请输入有效且正确的手机号";
  }

  static validateEmail(email) {
    // 验证邮箱。
    if (!/^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(email)) return "请输入有效且正确的邮箱地址";
    /* 在原子表 [] 中，. 不需要转义也只表示字符 .，而不表示任何字符。*/
  }

  static validateAvatar(avatar) {
    if (avatar === undefined) return "请上传头像";
    const size = avatar.size / 1024,
      // file.size 是以 Byte 为单位的。
      fileType = avatar.name.toLowerCase().match(/\.[a-z]+$/)[0];
      // 图片后缀名可能是大写，因此在这里需要进行大小写的转化。
    if (!/^\.(jpe?g|png)$/.test(fileType)) return `只支持 jpg 和 png 格式，不支持 ${fileType} 格式`;
    if (size > 256) return `图片大小应在 256KB 以下，当前图片大小为 ${size.toFixed(2)}KB`;
  }

  static validateIsEmpty(str) {
    // 最基本的表单判断，判断是否为空，即 str.length === 0。
    if (!/./.test(str)) return "不能为空";
  }

  static validateStuID(stuId) {
    // 检验学号是否合法。
    if (!/^\d+$/.test(stuId)) return "学号不能为空且应由纯数字构成";
  }

  static validateVerificationCode(code) {
    // 检验手机验证码是否合法。
    if (!/^\d{6}$/.test(code)) return "验证码应是 6 位数字"
  }
}
