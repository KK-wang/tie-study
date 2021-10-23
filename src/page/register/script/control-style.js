import $ from "jquery";

function controlRegisterFormBgStyle() {
  const registerBgImg = $('.register-bg-img'), registerFormBgSize = $('#register-form-bg-size-style');
  registerFormBgSize.text(`
    .register-form-bg-size {
      width: ${registerBgImg.width()}px;
      height: ${registerBgImg.height()}px;
    }
  `);
  $(window).resize(() => {
    registerFormBgSize.text(`
    .register-form-bg-size {
      width: ${registerBgImg.width()}px;
      height: ${registerBgImg.height()}px;
    }
  `);
  });
}

function controlValidateResultStyle() {
  // 接下来将要使用到一个比较高级的原生 JS-API: MutationObserver。
  // 当某个 DOM 发生改变时，它可以检测
  const validateResultRegisterForm = document.querySelector('.validate-result-register-form');
  const validateResultObserver = new MutationObserver(async (mutationRecords) => {
    if (validateResultRegisterForm.classList.contains('active') && validateResultRegisterForm.classList.contains('fade-out-to-right') ||
      !validateResultRegisterForm.classList.contains('active') && !validateResultRegisterForm.classList.contains('fade-out-to-right') ||
      validateResultRegisterForm.classList.contains('active') && validateResultRegisterForm.classList.contains('fade-out')) {
      // 防止出现重复调用。
      return;
    }
    console.log(mutationRecords);
    try {
      const validateResult = document.querySelector('.validate-result'),
        loadingGif = document.querySelector('.loading-gif'),
        res = await new Promise((resolve, reject) => {
          loadingGif.classList.add('active');
          validateResult.classList.remove('active');
          setTimeout(() => { resolve(0); }, 3000);
        });
      switch (res) {
        /* 如果用户输入的学号密码无误且尚未注册，那么执行下面的代码：*/
        case 0:
          validateResult.innerHTML = `
          <div class="validate-result-title">查询到如下信息, 请确认是否是您本人</div>
          <table class="register-result-table">
            <tr>
              <td>学院</td>
              <td>计算机学院</td>
            </tr>
            <tr>
              <td>专业班级</td>
              <td>软件工程1904班</td>
            </tr>
            <tr>
              <td>姓名</td>
              <td>王兴浩</td>
            </tr>
          </table>
          <div class="btn-group">
            <button class="register-form-btn">
              <img src="data:image/svg+xml;base64,PHN2ZyB0PSIxNjM0NzM3MjY4OTM1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjYyNjkiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNNTUwLjQgNDkwLjY2NjY2N0wyMzAuNCAxNzAuNjY2NjY3IDE3MC42NjY2NjcgMjMwLjRsMjYwLjI2NjY2NiAyNjAuMjY2NjY3TDE3MC42NjY2NjcgNzUwLjkzMzMzMyAyMzAuNCA4MTAuNjY2NjY3bDMyMC0zMjB6IG0yOTguNjY2NjY3IDBMNTMzLjMzMzMzMyAxNzAuNjY2NjY3IDQ2OS4zMzMzMzMgMjMwLjRsMjYwLjI2NjY2NyAyNjAuMjY2NjY3LTI2MC4yNjY2NjcgMjYwLjI2NjY2NiA1OS43MzMzMzQgNTkuNzMzMzM0IDMyMC0zMjB6IiBmaWxsPSIjZmZmZmZmIiBwLWlkPSI2MjcwIj48L3BhdGg+PC9zdmc+DQo=" alt="" class="btn-in-left">
              <span>上一步</span>
            </button>
            <button class="register-form-btn">
              <span>下一步</span>
              <img src="data:image/svg+xml;base64,PHN2ZyB0PSIxNjM0NzM3MjY4OTM1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjYyNjkiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNNTUwLjQgNDkwLjY2NjY2N0wyMzAuNCAxNzAuNjY2NjY3IDE3MC42NjY2NjcgMjMwLjRsMjYwLjI2NjY2NiAyNjAuMjY2NjY3TDE3MC42NjY2NjcgNzUwLjkzMzMzMyAyMzAuNCA4MTAuNjY2NjY3bDMyMC0zMjB6IG0yOTguNjY2NjY3IDBMNTMzLjMzMzMzMyAxNzAuNjY2NjY3IDQ2OS4zMzMzMzMgMjMwLjRsMjYwLjI2NjY2NyAyNjAuMjY2NjY3LTI2MC4yNjY2NjcgMjYwLjI2NjY2NiA1OS43MzMzMzQgNTkuNzMzMzM0IDMyMC0zMjB6IiBmaWxsPSIjZmZmZmZmIiBwLWlkPSI2MjcwIj48L3BhdGg+PC9zdmc+DQo=" alt="">
            </button>
          </div>
          `;
          const validateResultLeftBtn = validateResult.querySelector('.register-form-btn:first-child'),
            validateResultRightBtn = validateResult.querySelector('.register-form-btn:last-child'),
            activeRegisterForm = document.querySelector('.register-form:nth-child(2)'),
            leftBtnFunc = (event) => {
              activeRegisterForm.classList.add('fade-out-to-right');
              validateResultLeftBtn.removeEventListener('click', leftBtnFunc, false);
              validateResultRightBtn.removeEventListener('click', rightBtnFunc, false);
              // 移除绑定的事件以提高页面性能。
            },
            rightBtnFunc = (event) => {
              activeRegisterForm.classList.add('fade-out');
            };
          validateResultLeftBtn.addEventListener('click', leftBtnFunc, false);
          validateResultRightBtn.addEventListener('click', rightBtnFunc, false);
          break;
        case 1:
          break;
        case 2:
          break;
      }
      loadingGif.classList.remove('active');
      validateResult.classList.add('active');
    } catch (e) {
      console.log(e);
    }
  });
  validateResultObserver.observe(validateResultRegisterForm, { attributes: true });
}

export {
  controlRegisterFormBgStyle,
  controlValidateResultStyle
}
