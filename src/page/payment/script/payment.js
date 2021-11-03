import generateOrder from "../../../api/order/generateOrder";

window.addEventListener('load', () => {
  document.querySelector('.payment-avatar').src = window.$store.userAvatar
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
    course.href = `http://localhost:8899/html/course.html?courseId=${item.courseId}`;
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
  try {
    // 创建订单。
    const res = await generateOrder({ orderItemList: courseIds, totalPrice });
    // 创建订单 500 了。
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}
