import $ from 'jquery';
import { loginByStuID } from '@/api/login/loginByStuID';
import message from "../../../common/script/utils/message";

export default function () {
  const stuIDLoginPanelBtn = document.querySelector('.stuID-login-panel input[type="button"]');
  stuIDLoginPanelBtn.addEventListener('click', () => {
    // 学号登录。
    loginByStuIDInvoker().then();
  });

  const getMsgBtn = $('.get-message-btn-in-login');
  let timer = null;
  getMsgBtn.on('click', () => {
    if (timer !== null) return;
    let count = 5;
    getMsgBtn.text(`${count}s后重发`);
    getMsgBtn.removeClass('active');
    timer = setInterval(() => {
      count--;
      if (count <= 0) {
        getMsgBtn.addClass('active');
        getMsgBtn.text('获取验证码');
        clearInterval(timer);
        timer = null;
      }
      else getMsgBtn.text(`${count}s后重发`);
    }, 1000);
  });

  const wxLoginLabel = $('.login-choice:nth-of-type(3)');
  wxLoginLabel.on('click', async () => {
    const module = await import('./getQRCode');
    // module.default() 即为导入模块默认导出的东西。
    module.default();
  });
}

async function loginByStuIDInvoker() {
  const stuIdInput = document.querySelector('.stuID-login-panel .enter-info-input[type="text"]'),
    passwordInput = document.querySelector('.stuID-login-panel .enter-info-input[type="password"]');
  let stuID = stuIdInput.value, password = passwordInput.value;
  try {
    const res = await loginByStuID(stuID, password);
    message({
      message: '登录成功',
      type: 'success',
      onclose() {
        window.$store.userAvatarSetter(res.data.avatar);
        window.location.reload();
      }
    });
  } catch (e) {
    message({
      message: `${e.code}: ${e.msg}`,
      type: 'error'
    });
  }
}
