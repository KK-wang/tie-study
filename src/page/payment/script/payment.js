import message from "../../../common/script/utils/message";

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.payment-avatar').src = window.$store.userAvatarGetter();
  document.querySelector('.account-info').innerHTML = `购买账号：<span>${window.$store.truenameGetter() ? window.$store.nicknameGetter() + '(' + window.$store.truenameGetter() + ')' : window.$store.nicknameGetter()}<span class="num">（${window.$store.snoGetter()}）</span></span>`;
  let folder = document.querySelector('.folder')
  let methods = document.querySelector('.others')
  folder.addEventListener('click', () => {
    if(methods.style.display === 'none') {
      methods.style.display = 'block'
      folder.textContent = '收起'
    } else {
      methods.style.display = 'none'
      folder.textContent = '展开'
    }
  });

  if (!(sessionStorage.getItem("orderInfo"))) {
    console.log(1);
    message({
      message: '支付失败，订单不保存，请重新购买!',
      type: 'error',
      duration: 5000
    });
    return;
  }

  if (sessionStorage.getItem("paymentData")) fillPaymentDataAndGenerateOrder().then();
});

async function fillPaymentDataAndGenerateOrder() {
  const courseIds = [];
  let totalPrice = 0;
  const orderInfo = document.querySelector('.order-info');
  const h4 = document.createElement('h4');
  h4.textContent = '购买课程';
  orderInfo.appendChild(h4);
  const paymentData = JSON.parse(sessionStorage.getItem("paymentData"));
  for (let item of paymentData) {
    const course = document.createElement('a');
    course.href = `${process.env.STATIC_SERVER}/html/course.html?courseId=${item.courseId}`;
    course.classList.add('course');
    course.innerHTML = `
      <img class="cover" src="${item.courseCover}" alt=""/>
      <div class="name">${item.courseTitle}</div>
      <div class="price">￥${item.price}</div>
    `;
    totalPrice += parseFloat(item.price);
    courseIds.push(parseInt(item.courseId));
    orderInfo.appendChild(course);
  }
  document.querySelector('.pay-num span:last-child').textContent = `￥${totalPrice}`;
  sessionStorage.removeItem("paymentData");

  const payBtn = document.querySelector('.pay-btn');
  payBtn.innerHTML = sessionStorage.getItem('orderInfo');
  sessionStorage.removeItem("orderInfo");
}
