import $ from 'jquery';

export default function () {
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
