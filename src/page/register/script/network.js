import { realInfoVerification } from "../../../api/register/realInfoVerification";
import {uploadAvatar, registerInfo} from "../../../api/register/finishRegister";
import {loginByStuID} from "../../../api/login/loginByStuID";

async function registerUser () {
  const stuID = document.querySelector('.register-form:first-child .register-form-input #csu-stu-id'),
    password = document.querySelector('.register-form:first-child .register-form-input #csu-password'),
    stuIDValue = stuID.value,
    passwordValue = password.value;
  // 这里已经保证了数据获取的正确性质，而这里的 stuIDValue 和 passwordValue 也保证了数据类型为 String 类型。
  return realInfoVerification(stuIDValue, passwordValue);
}

function linkToHomePage() {
  const webLogo = document.querySelector('.web-logo .web-logo-img');
  webLogo.addEventListener('click', () => {
    window.location.href = 'http://localhost:8899/html/index.html';
  });
}

function finishRegister(sno, trueName, academy, majorClass) {
  const submitBtn = document.querySelector('.register-form:last-child .btn-group button'),
    usernameInput = document.querySelector('#username'),
    passwordInput = document.querySelector('#password'),
    emailInput = document.querySelector('#user-e-mail'),
    phoneNumInput = document.querySelector('#phoneNum'),
    avatarInput = document.querySelector('#upload-avatar-uploader');

  avatarInput.addEventListener('change', () => {
    // 当 input='file' 上传了文件时，就会触发 change 事件。
    /* 实现图片本地预览的关键代码。*/
    const file = avatarInput.files[0],
      size = file.size / 1024,
      // file.size 是以 Byte 为单位的。
      fileType = file.type;
    if (size > 256) {
      // 文件大小大于 256 KB。
      console.log(size + 'KB');
      return;
    }

    if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
      // 文件格式不是 jpg 且不是 png 格式。
      console.log(fileType);
      return;
    }

    if(window.FileReader) {
      const fr = new FileReader();
      fr.onloadend = function(e) {
        document.getElementById("upload-avatar-uploader-img").src = e.target.result;
      }
      fr.readAsDataURL(file);
    }
  });

  submitBtn.addEventListener("click", async (event) => {
    const usernameValue = usernameInput.value,
      passwordValue = passwordInput.value,
      emailValue = emailInput.value,
      phoneNumValue = phoneNumInput.value,
      avatarFormData = new FormData();
    try {
      avatarFormData.append("sno", sno);
      // 上传头像要通过
      avatarFormData.append("multipartFile", avatarInput.files[0], sno + `-avatar.${avatarInput.files[0].type.slice(6)}`);
      console.log(avatarFormData.get('multipartFile'));
      // 通过 append 给 FormData 对象传入属性是该对象私有的，无法直接访问。
      const avatarURL = await uploadAvatar(avatarFormData);
      const userInfo = {
        sno,
        trueName,
        academy,
        majorClass,
        nickname: usernameValue,
        password: passwordValue,
        email: emailValue,
        phone: phoneNumValue,
        avatar: avatarURL.msg
      };
      await registerInfo(userInfo);
      // 注册成功。
      window.location.href = 'http://localhost:8899/html/index.html';
    } catch (e) {
      console.log(e);
    }


  });
}

export {
  registerUser,
  linkToHomePage,
  finishRegister
}
