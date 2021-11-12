import {registerInfo, uploadAvatar} from "../../../api/register/finishRegister";
import message from "../../../common/script/utils/message";

export default class Register {
  constructor() {
    // 创建表单元素。
    this.submitBtn = document.querySelector('.register-form:last-child .btn-group button');
    this.avatarInput = document.querySelector('#upload-avatar-uploader');

    // 绑定事件。
    this.avatarInput.addEventListener("change", this.previewAvatar.bind(this));
    // 图片上传触发 change 事件。
    /* 这是使用 bind 是为了强制绑定 this。*/
    this.submitBtn.addEventListener("click", this.submitRegister.bind(this));
  }

  previewAvatar() {
    /* 实现图片本地预览的关键代码。*/
    const file = this.avatarInput.files[0],
      size = file.size / 1024,
      // file.size 是以 Byte 为单位的。
      fileType = file.type;

    if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
      message({
        message: `只支持 jpg 和 png 格式，不支持 ${fileType} 格式`,
        type: "warning",
        duration: 1200
      });
      return;
    }

    if (size > 256) {
      message({
        message: `图片大小应在 256KB 以下，当前图片大小为 ${size.toFixed(2)}KB`,
        type: "warning",
        duration: 1200
      });
      return;
    }

    if(window.FileReader) {
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

    try {
      // avatarFormData.append("sno", sno);
      /* 虽然网站接入了外部用户，但是用户主键依然是学号，非外校用户会生成一个学号。*/
      avatarFormData.append("multipartFile", this.avatarInput.files[0]);
      // 通过 append 给 FormData 对象传入属性是该对象私有的，无法直接访问。
      const avatarURL = await uploadAvatar(avatarFormData);
      const userInfo = {
        // sno,
        // truename,
        // academy,
        // majorClass,
        nickname: usernameValue,
        password: passwordValue,
        email: emailValue,
        phone: phoneNumValue,
        avatar: avatarURL.msg
      };
      await registerInfo(userInfo);
      // 注册成功。
      message({
        message: "注册成功",
        type: "success",
        onclose() {
          window.location.href = 'http://localhost:8899/html/index.html';
        }
      });
    } catch (e) {
      // 在这里给出注册异常。
      message({
        message: `${e.code}: ${e.msg}`,
        type: 'error'
      });
    }
  }
}
