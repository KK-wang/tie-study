import {registerInfo, uploadAvatar} from "../../../api/register/finishRegister";
import message from "../../../common/script/utils/message";
import Verify from "./verify";
import Verification from "../../../common/script/utils/verification";
import {loginByStuID} from "../../../api/login/loginByStuID";

export default class Register {
  constructor() {
    // 创建表单元素。
    this.submitBtn = document.querySelector('.register-form:last-child .btn-group button');
    this.avatarInput = document.querySelector('#upload-avatar-uploader');
    this.verifyLink = document.querySelector('.verify-link');

    // 实名信息。
    this.verifiedInfo = {
      sno: undefined,
      truename: undefined,
      academy: undefined,
      majorClass: undefined,
      // axios 不会发送 undefined 的数据。
    };
    this.avatarInput.addEventListener("change", this.previewAvatar.bind(this));
    // 图片上传触发 change 事件。
    /* 这是使用 bind 是为了强制绑定 this。*/
    this.submitBtn.addEventListener("click", this.submitRegister.bind(this));
    this.verifyLink.addEventListener("click", this.verify.bind(this));
  }

  previewAvatar() {
    /* 实现图片本地预览的关键代码。*/
    const file = this.avatarInput.files[0], validateInfo = Verification.validateAvatar(file);
    if (validateInfo !== undefined) {
      message({
        message: validateInfo,
        type: "warning",
        duration: 1500,
      });
    } else if(window.FileReader) {
      const fr = new FileReader();
      fr.onloadend = function(e) {
        document.getElementById("upload-avatar-uploader-img").src = e.target.result;
      }
      fr.readAsDataURL(file);
    }
  }

  async submitRegister() {
    const usernameValue = document.querySelector('#username').value,
      passwordValue = document.querySelector('#password').value,
      emailValue = document.querySelector('#user-e-mail').value,
      phoneNumValue = document.querySelector('#phoneNum').value,
      avatarFormData = new FormData();
    if (!this.validateForm(usernameValue, passwordValue, phoneNumValue, emailValue)) return;

    try {
      avatarFormData.append("multipartFile", this.avatarInput.files[0]);
      // 通过 append 给 FormData 对象传入属性是该对象私有的，无法直接访问。
      const avatarURL = await uploadAvatar(avatarFormData);
      /* 虽然网站接入了外部用户，但是用户主键依然是学号，非外校用户会生成一个学号。*/
      const userInfo = {
        son: this.verifiedInfo.sno,
        truename: this.verifiedInfo.truename,
        academy: this.verifiedInfo.academy,
        majorClass: this.verifiedInfo.majorClass,
        nickname: usernameValue,
        password: passwordValue,
        email: emailValue,
        phone: phoneNumValue,
        avatar: avatarURL.msg
      };
      const info = await registerInfo(userInfo);
      // 注册成功。
      message({
        message: "注册成功，正在跳转...",
        type: "success",
        duration: 2000,
      });
      const res = await loginByStuID(info.data.sno, userInfo.password);
      window.$store.userAvatarSetter(res.data.avatar);
      window.$store.snoSetter(info.data.sno);
      window.$store.truenameSetter(res.data.truename);
      window.$store.nicknameSetter(res.data.nickname);
      window.$store.signSetter(res.data.sign);
      // 写入头像数据。
      window.location.href = `${process.env.STATIC_SERVER}/html/index.html`;
    } catch (e) {
      // 在这里给出注册异常。
      message({
        message: `${e.code}: ${e.msg}`,
        type: 'error',
        duration: 1500
      });
    }
  }

  verify() {
    new Verify(this.verifiedInfo);
    // 成功更新用户的真实信息。
  }

  validateForm(usernameValue, passwordValue, phoneNumValue, emailValue) {
    // false 表示没有通过。
    const usernameInfo = Verification.validateUsername(usernameValue);
    if (usernameInfo !== undefined) {
      message({
        message: usernameInfo,
        type: "warning",
        duration: 1500,
      });
      return false;
    }

    const passwordInfo = Verification.validatePassword(passwordValue);
    if (passwordInfo !== undefined) {
      message({
        message: passwordInfo,
        type: "warning",
        duration: 1500,
      });
      return false;
    }

    const phoneNumInfo = Verification.validatePhoneNum(phoneNumValue);
    if (phoneNumInfo !== undefined) {
      message({
        message: phoneNumInfo,
        type: "warning",
        duration: 1500,
      });
      return false;
    }

    const file = this.avatarInput.files[0], validateInfo = Verification.validateAvatar(file);
    if (validateInfo !== undefined) {
      message({
        message: validateInfo,
        type: "warning",
        duration: 1500,
      });
      return false;
    }

    // 因为 email 可以为空，因此这里需要额外判断一下。
    if (emailValue.length !== 0) {
      const emailInfo = Verification.validateEmail(emailValue);
      if (emailInfo !== undefined) {
        message({
          message: emailInfo,
          type: "warning",
          duration: 1500,
        });
        return false;
      }
    }

    return true;
  }
}
