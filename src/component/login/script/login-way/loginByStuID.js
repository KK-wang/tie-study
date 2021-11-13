import message from "../../../../common/script/utils/message";
import { loginByStuID } from '@/api/login/loginByStuID';
import Verification from "../../../../common/script/utils/verification";

export default class {
  constructor() {
    // 属性。
    this.stuIDLoginPanelBtn = document.querySelector('.stuID-login-panel input[type="button"]');
    this.loginByStuIDInvokerWithThis = this.loginByStuIDInvoker.bind(this);

    // 事件。
    this.stuIDLoginPanelBtn.addEventListener('click', this.loginByStuIDInvokerWithThis);

    // 默认行为。
  }

  async loginByStuIDInvoker() {
    this.stuIDLoginPanelBtn.removeEventListener('click', this.loginByStuIDInvokerWithThis);
    // 防止用户多次点击后，出现重复发送登录请求的状况。
    const stuIdInput = document.querySelector('.stuID-login-panel .enter-info-input[type="text"]'),
      passwordInput = document.querySelector('.stuID-login-panel .enter-info-input[type="password"]');
    let stuID = stuIdInput.value, password = passwordInput.value;

    try {
      const stuIDInfo = Verification.validateStuID(stuID);
      if (stuIDInfo !== undefined) throw { msg: stuIDInfo };
      const passwordInfo = Verification.validateIsEmpty(password);
      if (passwordInfo !== undefined) throw { msg: `密码${passwordInfo}` };
      // 为了减少网络请求，这里需要进行判断。
      /* 这里巧妙地使用 throw 可以借用到 catch 的 message。*/

      const res = await loginByStuID(stuID, password);
      message({
        message: '登录成功',
        type: 'success',
        onclose() {
          window.$store.userAvatarSetter(res.data.avatar);
          window.$store.snoSetter(res.data.sno);
          window.$store.truenameSetter(res.data.truename);
          window.location.reload();
        }
      });
    } catch (e) {
      message({
        message: e.msg,
        type: 'error',
        onclose: () => {
          this.stuIDLoginPanelBtn.addEventListener('click', this.loginByStuIDInvokerWithThis);
          // 出现错误时再恢复监听。
        }
      });
    }
  }

}
