import message from "../../../common/script/utils/message";
import { realInfoVerification } from "../../../api/register/realInfoVerification";
import Verification from "../../../common/script/utils/verification";

export default class Verify {
  constructor(verifiedInfo) {
    // 对象属性。
    this.verifyForm = document.querySelector('.register-form:nth-child(2)');
    this.resultForm = document.querySelector('.register-form:nth-child(3)');
    this.mask = document.querySelector('.verify-form-mask');
    this.verifyBtn = this.verifyForm.querySelector('button.register-form-btn:last-child');
    this.cancelBtn = this.verifyForm.querySelector('button.register-form-btn:first-child');
    this.verifiedInfo = verifiedInfo;

    // 验证实名要绑定的函数 function。
    const submitVerifyFunc = this.submitVerify.bind(this);


    // 属性行为。
    this.verifyForm.classList.add('active');
    this.isOpenMask(true);
    this.cancelBtn.addEventListener("click", () => {
      this.verifyForm.classList.remove("active");
      this.isOpenMask(false);
      this.verifyBtn.removeEventListener("click", submitVerifyFunc);
    });
    this.verifyBtn.addEventListener("click", submitVerifyFunc);
  }

  isOpenMask(flag) {
    if (flag) this.mask.classList.add('active');
    else this.mask.classList.remove('active');
  }

  async submitVerify() {
    const stuIDValue = document.querySelector('.register-form:nth-child(2) .register-form-input #csu-stu-id').value,
      passwordValue = document.querySelector('.register-form:nth-child(2) .register-form-input #csu-password').value;
    message({
      message: '正在验证中...',
      duration: 1500,
      type: "info"
    });
    try {
      const res = await realInfoVerification(stuIDValue, passwordValue);
      const validateResult = document.querySelector('.validate-result');
      validateResult.innerHTML = `
          <div class="validate-result-title">查询到如下信息, 请确认是否是您本人</div>
          <table class="register-result-table">
            <tr>
              <td>学院</td>
              <td>${res.data.academy}</td>
            </tr>
            <tr>
              <td>专业班级</td>
              <td>${res.data.majorClass}</td>
            </tr>
            <tr>
              <td>姓名</td>
              <td>${res.data.trueName}</td>
            </tr>
          </table>
          <div class="btn-group">
            <button class="register-form-btn">
              <img src="data:image/svg+xml;base64,PHN2ZyB0PSIxNjM0NzM3MjY4OTM1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjYyNjkiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNNTUwLjQgNDkwLjY2NjY2N0wyMzAuNCAxNzAuNjY2NjY3IDE3MC42NjY2NjcgMjMwLjRsMjYwLjI2NjY2NiAyNjAuMjY2NjY3TDE3MC42NjY2NjcgNzUwLjkzMzMzMyAyMzAuNCA4MTAuNjY2NjY3bDMyMC0zMjB6IG0yOTguNjY2NjY3IDBMNTMzLjMzMzMzMyAxNzAuNjY2NjY3IDQ2OS4zMzMzMzMgMjMwLjRsMjYwLjI2NjY2NyAyNjAuMjY2NjY3LTI2MC4yNjY2NjcgMjYwLjI2NjY2NiA1OS43MzMzMzQgNTkuNzMzMzM0IDMyMC0zMjB6IiBmaWxsPSIjZmZmZmZmIiBwLWlkPSI2MjcwIj48L3BhdGg+PC9zdmc+DQo=" alt="" class="btn-in-left">
              <span>上一步</span>
            </button>
            <button class="register-form-btn">
              <span>确认</span>
              <img src="data:image/svg+xml;base64,PHN2ZyB0PSIxNjM2NzMxNjg2OTI5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM2OTYiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNMzkyLjUzMzMzMyA4MDYuNEw4NS4zMzMzMzMgNTAzLjQ2NjY2N2w1OS43MzMzMzQtNTkuNzMzMzM0IDI0Ny40NjY2NjYgMjQ3LjQ2NjY2N0w4NjYuMTMzMzMzIDIxMy4zMzMzMzNsNTkuNzMzMzM0IDU5LjczMzMzNEwzOTIuNTMzMzMzIDgwNi40eiIgZmlsbD0iI2ZmZmZmZiIgcC1pZD0iMzY5NyI+PC9wYXRoPjwvc3ZnPg==" alt="">
            </button>
          </div>
          `;
      this.resultForm.classList.add("active");
      this.verifyForm.classList.remove('active');
      const validateResultLeftBtn = validateResult.querySelector('.register-form-btn:first-child'),
        validateResultRightBtn = validateResult.querySelector('.register-form-btn:last-child'),
        rightBtnFunc = () => {
          this.verifiedInfo.sno = stuIDValue;
          this.verifiedInfo.truename = res.data.truename;
          this.verifiedInfo.academy = res.data.academy;
          this.verifiedInfo.majorClass = res.data.majorClass;
          this.modifyRegister();
          this.resultForm.classList.remove('active');
          this.isOpenMask(false);
          message({
            message: '认证成功',
            duration: 1500,
            type: "success"
          });
        },
        leftBtnFunc = () => {
          validateResultLeftBtn.removeEventListener('click', leftBtnFunc, false);
          validateResultRightBtn.removeEventListener('click', rightBtnFunc, false);
          // 移除绑定的事件以提高页面性能。
          this.resultForm.classList.remove("active");
          this.verifyForm.classList.add('active');
        };
      validateResultLeftBtn.addEventListener('click', leftBtnFunc, false);
      validateResultRightBtn.addEventListener('click', rightBtnFunc, false);
    } catch (e) {
      message({
        message: `${e.code}: ${e.msg}`,
        type: 'error',
        duration: 1500,
      });
    }
  }

  modifyRegister() {
    const registerTitle = document.querySelector('.core-register-form .third-register-form-title'),
      verifyLink = document.querySelector('.verify-link'),
      btnGroup = document.querySelector('.core-register-form .btn-group');
    registerTitle.textContent = `${this.verifiedInfo.truename}，请填写您的个人信息`;
    verifyLink.parentNode.removeChild(verifyLink);

    const certification = document.createElement('div');
    certification.classList.add("verify-link");
    certification.style.cssText = `
      text-decoration: none;
      cursor: default;
      color: #ffffff;
    `;

    certification.innerHTML = `
      <img src="data:image/svg+xml;base64,PHN2ZyB0PSIxNjM2NzMyODkxNzU3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQyMzAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNNTEyIDEwMjRDMjI5LjI0OCAxMDI0IDAgNzk0Ljc1MiAwIDUxMlMyMjkuMjQ4IDAgNTEyIDBzNTEyIDIyOS4yNDggNTEyIDUxMi0yMjkuMjQ4IDUxMi01MTIgNTEyeiBtLTExNC4xNzYtMzEwLjk1NDY2N2E1My4zMzMzMzMgNTMuMzMzMzMzIDAgMCAwIDc1LjQzNDY2NyAwbDMyMy4zMjgtMzIzLjMyOGE1My4zMzMzMzMgNTMuMzMzMzMzIDAgMSAwLTc1LjQzNDY2Ny03NS40MzQ2NjZsLTI4Ny45MTQ2NjcgMjgzLjMwNjY2Ni0xMjguODUzMzMzLTEyOC44NTMzMzNhNTMuMzMzMzMzIDUzLjMzMzMzMyAwIDEgMC03NS40MzQ2NjcgNzUuNDM0NjY3bDE2OC44NzQ2NjcgMTY4Ljg3NDY2NnoiIGZpbGw9IiM2N2MyM2EiIHAtaWQ9IjQyMzEiPjwvcGF0aD48L3N2Zz4=" alt="" style="width: 20px; margin-right: 5px"/>
      已认证为中南大学学生
    `;
    btnGroup.appendChild(certification);
  }

}
