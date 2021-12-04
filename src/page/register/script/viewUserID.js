import {loginByStuID} from "../../../api/login/loginByStuID";
import recordUserInfo from "../../../common/script/repeated/recordUserInfo";
import message from "../../../common/script/utils/message";
import { throttle } from "../../../common/script/utils/commonUtils";

export default class ViewUserID {
  constructor(userID, password) {
    this.userID = userID;
    document.querySelector('.register-form.register-result').classList.add('active');
    document.querySelector('.verify-form-mask').classList.add('active');
    document.querySelector('.register-result-title .userID').textContent = userID;
    document.querySelector('.copy').addEventListener('click', throttle(this.copy.bind(this), 1500));

    loginByStuID(userID, password).then(res => {
      // constructor 不能是 async 的。
      recordUserInfo(res.data);
    }).catch(() => {
      message({
        message: '自动登录失败，请跳转后手动登录。',
        type: "error",
        duration: 1500,
      });
    });
  }

  async copy() {
    try {
      await navigator.clipboard.writeText(this.userID);
      message({
        message: '复制成功!',
        type: "success",
        duration: 1500,
      });
    } catch (e) {
      message({
        message: '复制失败，浏览器版本过低!',
        type: "error",
        duration: 1500,
      });
    }
  }
}

