import {getQuery} from "../../../common/script/utils/commonUtils";
import getCourseHeadData from "../../../api/course/getCourseHead";
import addCourseToCart from "../../../api/course/addCourseToCart";
import message from "../../../common/script/utils/message";
import collectionInvoker from "../../../api/course/collection";

function collection(isCollect, courseId) {
  const collection = document.querySelector('.collection');
  console.log(collection);
  if (isCollect) collection.classList.add('active');
  collection.addEventListener('click', async function () {
    try {
      if (this.classList.length !== 2) {
        await collectionInvoker(courseId);
        this.classList.add('active');
        message({
          message: '收藏成功',
          type: 'success',
          duration: 1500
        });
      } else {
        await collectionInvoker(courseId);
        this.classList.remove('active');
        message({
          message: '取消收藏成功',
          type: 'success',
          duration: 1500
        });
      }
    } catch (e) {
      message({
        message: e.code ? `${e.code} ${e.msg}` : e,
        type: 'error',
        duration: 1500
      });
    }
  });
}

function cart(courseId) {
  document.querySelector('.add-cart').addEventListener('click', async () => {
    try {
      await addCourseToCart(courseId);
      message({
        message: "添加成功",
        type: "success",
        duration: 1500
      });
    } catch (e) {
      message({
        message: `${e.code}: ${e.msg}`,
        type: 'error',
      });
    }
  });
  document.querySelector('.buy-now').addEventListener('click', async () => {
    try {
      await addCourseToCart(courseId);
      window.location.href = `${process.env.STATIC_SERVER}/html/cart.html`;
    } catch (e) {
      if (e.code === 30003) window.location.href = `${process.env.STATIC_SERVER}/html/cart.html`;
      else {
        message({
          message: `${e.code}: ${e.msg}`,
          type: 'error',
        });
      }
    }
  })
}

export default async function fillDataInfo() {
  const query = getQuery();
  try {
    const courseId = parseInt(query.courseId), res = await getCourseHeadData(courseId), data = res.data;
    const navigation = document.querySelector('.navigation');
    // 获取 navigation 信息。
    navigation.innerHTML = `
      <span>首页 > </span>
      <span>${data.courseSystems.length === 0 ? 
              '' : data.courseSystems[0].title
             } > </span>
      <span>${data.title}</span>
    `;
    console.log(data);
    // 获取课程封面信息。
    const courseImg = document.querySelector('.course-img');
    let courseImgInnerHTML = `
      <img alt="" src="${data.cover}"/>
    `;
    if (data.isEnd) courseImgInnerHTML += '<div class="course-state"></div><span>完结</span>';
    else courseImgInnerHTML += '<div class="course-state unEnd"></div><span>连载</span>';
    courseImg.innerHTML = courseImgInnerHTML;
    /* 将课程封面信息保存在 sessionStorage 中。*/
    sessionStorage.setItem("course-cover", data.cover);

    // 获取课程标题信息。
    const courseTitle = document.querySelector('.course-info .course-title');
    courseTitle.textContent = data.title;

    // 获取多少人学过。
    const learnedNums = document.querySelector('.learned-nums');
    learnedNums.textContent = data.saleNum;

    // 获取课程评价星级。
    const stars = document.querySelector('.stars');
    for (let star of stars.children) {
      if (data.stars <= 0) break;
      star.classList.add('active');
      data.stars--;
    }

    // 获取课程讲师。
    const teacherInfo = document.querySelector('.teacher-info');
    teacherInfo.textContent = `讲师：宋铁`;

    // 获取课程价格。
    const coursePrice = document.querySelector('.course-price');
    coursePrice.textContent = `￥${data.price}`;

    // 收藏相关的代码。
    collection(data.isCollect, courseId);

    // 获取是否购买课程。
    if (data.isBought) {
      // 购买了。
      const buttonGroup = document.querySelector('.button-group');
      // 移除一个元素节点的所有子节点。
      while (buttonGroup.firstChild) buttonGroup.removeChild(buttonGroup.firstChild);
    } else {
      // 没有购买。
      cart(parseInt(query.courseId));
    }

    // 获取系列课程。
    let systemStr = ''
    if (data.courseSystems.length === 0) {
      systemStr += '<div class="system-course-li">暂无</div>';
    } else {
      for (let system of data.courseSystems) {
        systemStr += `<div class="system-course-li">${system.title}</div>`;
      }
    }
    const systemCourse = document.querySelector('.system-course');
    systemCourse.innerHTML = systemStr;

    /* head 部分需要将课程是否购买这个参数传递出去。*/
    return Promise.resolve(data.isBought);
  } catch (e) {
    message({
      message: e.code ? `${e.code} ${e.msg}` : e,
      type: 'error',
      duration: 1500,
    });
    return Promise.reject(e);
  }
}
