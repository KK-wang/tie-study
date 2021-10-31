import $ from 'jquery';
import {getQuery} from "../../../common/script/utils/index";
import getCourseHeadData from "../../../api/course/getCourseHead";

function collection() {
  const collection = $('.collection');
  collection.on('click', () => {
    const classList = collection.attr('class').split(" ");
    if (classList.indexOf('active') !== -1) collection.removeClass('active');
    else collection.addClass('active');
  });
}

export default async function fillDataInfo() {
  const query = getQuery();
  try {
    const res = await getCourseHeadData(parseInt(query.courseId));
    const data = res.data;
    const navigation = document.querySelector('.navigation');
    // 获取 navigation 信息。
    navigation.innerHTML = `
      <span>首页</span>
      <span>${data.systemList[0].systemName || ''}</span>
      <span>${data.title}</span>
    `;

    // 获取课程封面信息。
    const courseImg = document.querySelector('.course-img');
    let courseImgInnerHTML = `
      <img alt="" src="${data.cover}"/>
    `;
    if (data.isEnd) courseImgInnerHTML += '<div class="course-state"></div><span>完结</span>';
    else courseImgInnerHTML += '<div class="course-state unEnd"></div><span>连载</span>';
    courseImg.innerHTML = courseImgInnerHTML;

    // 获取课程标题信息。
    const courseTitle = document.querySelector('.course-info .course-title');
    courseTitle.textContent = data.title;

    // 获取多少人学过。
    const learnedNums = document.querySelector('.learned-nums');
    learnedNums.textContent = data.saleNum;

    // 获取课程评价星级。
    const stars = document.querySelector('.stars');
    for (let star of stars.children) {
      star.classList.add('active');
      data.stars--;
      if (data.stars === 0) break;
    }

    // 获取课程讲师。
    const teacherInfo = document.querySelector('.teacher-info');
    teacherInfo.textContent = `讲师：${data.managerNickName}`;

    // 获取课程价格。
    const coursePrice = document.querySelector('.course-price');
    coursePrice.textContent = `￥${data.price}`;

    // 获取是否购买课程。
    data.isSale = false
    if (data.isSale) {
      collection();
      // 购买了。
      const buttonGroup = document.querySelector('.button-group');
      // 移除一个元素节点的所有子节点。
      while (buttonGroup.firstChild) buttonGroup.removeChild(buttonGroup.firstChild);
    } else {
      // 没有购买。
      const collection = document.querySelector('.collection');
      // 无须定位父节点,通过parentNode属性直接删除自身。
      collection.parentNode.removeChild(collection);
    }

    // 获取课程概述。
    const introduction = document.querySelector('.panel-li:nth-child(1) .panel-li-introduce');
    introduction.innerHTML = data.descn;

    // 获取系列课程。
    let systemStr = ''
    for (let system of data.systemList) {
      systemStr += `<div class="system-course-li">${system.systemName}</div>`;
    }
    const systemCourse = document.querySelector('.system-course');
    systemCourse.innerHTML = systemStr;
  } catch (e) {
    console.log(e);
  }
}
