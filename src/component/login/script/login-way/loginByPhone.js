import { loginByPhone, getVerificationCode } from "../../../../api/login/loginByPhone";
import message from "../../../../common/script/utils/message";
import Verification from "../../../../common/script/utils/verification";

export default class {

  constructor() {
    // 属性。
    this.getMsgBtn = document.querySelector('.get-message-btn-in-login');
    this.phoneLoginPanelBtn = document.querySelector('.phoneNum-login-panel input[type="button"]');
    this.loginByPhoneInvokerWithThis = this.loginByPhoneInvoker.bind(this); // 为了给事件响应函数一个正确的 this，这里需要 bind 一下。

    // 事件。
    this.getMsgBtn.addEventListener("click", this.verificationCodeBtn.bind(this)(60));
    /* 闭包 + bind + () => {} */
    this.phoneLoginPanelBtn.addEventListener("click", this.loginByPhoneInvokerWithThis);

    // 其他默认行为。
  }

  verificationCodeBtn(delay) {
    /*
     * 阿里云的短信服务对个人每天、每小时发送的短信条数有限制。
     * 后期这里的代码需要改一下。
     */
    let timer = null;
    return async () => {
      if (timer !== null) return;
      try {
        const phoneValue = document.querySelector('.phoneNum-login-panel .enter-info-input[type="text"]').value;
        const phoneInfo = Verification.validatePhoneNum(phoneValue);
        if (phoneInfo !== undefined) throw { msg: phoneInfo };
        // phoneValue 必须是合法的。

        message({
          message: '请求发送中...',
          type: "info",
          duration: 1500,
        });
        this.getMsgBtn.classList.remove('active');

        await getVerificationCode(phoneValue);
        message({
          message: '验证码发送成功',
          type: "success",
          duration: 1500,
        });

        let count = delay;
        this.getMsgBtn.textContent = `${count}s后重发`;
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
      } catch (e) {
        message({
          message: e.msg,
          type: 'error',
          onclose: () => {
            this.getMsgBtn.classList.add('active');
            // 出现错误时再恢复监听。
          }
        });
      }
    }
  }

  async loginByPhoneInvoker() {
    this.phoneLoginPanelBtn.removeEventListener("click", this.loginByPhoneInvokerWithThis);
    try {
      const phoneValue = document.querySelector('.phoneNum-login-panel .enter-info-input-with-svg:first-child .enter-info-input[type="text"]').value,
        codeValue = document.querySelector('.phoneNum-login-panel .message-verification .enter-info-input[type="text"]').value;
      const phoneInfo = Verification.validatePhoneNum(phoneValue);
      if (phoneInfo !== undefined) throw { msg: phoneInfo };
      const codeInfo = Verification.validateVerificationCode(codeValue);
      if (codeInfo !== undefined) throw { msg: codeInfo };

      const res = await loginByPhone(phoneValue, codeValue);
      message({
        message: '登录成功',
        type: 'success',
        onclose() {
          window.$store.userAvatarSetter(res.data.avatar);
          window.$store.snoSetter(res.data.sno);
          window.$store.truenameSetter(res.data.truename);
          window.$store.nicknameSetter(res.data.nickname);
          window.$store.signSetter(res.data.sign);
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
