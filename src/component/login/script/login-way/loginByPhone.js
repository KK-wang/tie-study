import { loginByPhone } from "../../../../api/login/loginByPhone";
import message from "../../../../common/script/utils/message";
import Verification from "../../../../common/script/utils/verification";

export default class {

  constructor() {
    // 属性。
    this.getMsgBtn = document.querySelector('.get-message-btn-in-login');
    this.phoneLoginPanelBtn = document.querySelector('.phoneNum-login-panel input[type="button"]');
    this.loginByPhoneInvokerWithThis = this.loginByPhoneInvoker.bind(this); // 为了给事件响应函数一个正确的 this，这里需要 bind 一下。

    // 事件。
    this.getMsgBtn.addEventListener("click", this.verificationCodeBtn.bind(this)(30));
    /* 闭包 + bind + () => {} */
    this.phoneLoginPanelBtn.addEventListener("click", this.loginByPhoneInvokerWithThis);

    // 其他默认行为。
  }

  verificationCodeBtn(delay) {
    let timer = null;
    return () => {
      if (timer !== null) return;
      let count = delay;
      this.getMsgBtn.textContent = `${count}s后重发`;
      this.getMsgBtn.classList.remove('active');
      timer = setInterval(() => {
        count--;
        if (count <= 0) {
          this.getMsgBtn.classList.add('active');
          this.getMsgBtn.textContent = '获取验证码';
          clearInterval(timer);
          timer = null;
        }
        else this.getMsgBtn.textContent = `${count}s后重发`;
      }, 1000);
    }
  }

  async loginByPhoneInvoker() {
    this.phoneLoginPanelBtn.removeEventListener("click", this.loginByPhoneInvokerWithThis);
    try {
      const phoneValue = document.querySelector('.phoneNum-login-panel .enter-info-input[type="text"]').value,
        codeValue = document.querySelector('.phoneNum-login-panel .enter-info-input[type="text"]').value;
      const phoneInfo = Verification.validatePhoneNum(phoneValue);
      if (phoneInfo !== undefined) throw { msg: phoneInfo };
      const codeInfo = Verification.validateVerificationCode(codeValue);
      if (codeInfo !== undefined) throw { msg: codeInfo };

      const res = loginByPhone(phoneValue, codeValue);
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
          this.phoneLoginPanelBtn.addEventListener('click', this.loginByPhoneInvokerWithThis);
          // 出现错误时再恢复监听。
        }
      });
    }
  }
}
