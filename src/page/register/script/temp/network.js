import { realInfoVerification } from "../../../../api/register/realInfoVerification";
import {uploadAvatar, registerInfo} from "../../../../api/register/finishRegister";

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

function finishRegister(sno, truename, academy, majorClass) {




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
        truename,
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
