import QRCode from '@/assets/img/login/QRCode.png';

export default class {
  constructor() {
    // 属性。
    this.wxLoginLabel = document.querySelector('.login-choice:nth-of-type(3)');
    this.QRCode = document.querySelector('.QRCode-container img');

    // 事件。
    this.wxLoginLabel.addEventListener("click", this.getQRCode.bind(this));

    // 默认行为。
  }

  getQRCode() {
    this.QRCode.setAttribute('src', QRCode);
  }

}
