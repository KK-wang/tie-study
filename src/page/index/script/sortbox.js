import morePic from '@/assets/img/index/arrow.png';
import {getSystems} from "../../../api/index/system";

let response
let systems
async function generateSystems() {
  try {
    response = await getSystems();
    systems = response.data.slice(0, 6)

    let systemNav = document.getElementsByClassName('system-nav')[0]
    let content = document.getElementsByClassName('sort-content')[0]

    let roundboxFragment = document.createDocumentFragment();

    const colors = [
      '#2B9B27',
      '#2845E1',
      '#03035C',
      '#3E0DA7',
      '#E87B17',
      '#E51C23',
    ];

    //推荐的体系
    for(let index in systems) {
      let link = document.createElement('a')
      link.style.cssText = `background-color: ${colors[index]}`;
      link.href = `#${systems[index].title}`
      //系统化学习
      let roundBox = document.createElement('div')
      link.classList.add('round-box')
      let text = document.createTextNode(systems[index].title)
      roundBox.appendChild(text)
      link.appendChild(roundBox)
      roundboxFragment.appendChild(link)
    }
    systemNav.appendChild(roundboxFragment)

    for (let system of systems)  {
      //每个体系中的课程
      //头部
      let courses = document.createElement('div')
      courses.classList.add('sort-box')

      let sortTitle = document.createElement('div')
      sortTitle.classList.add('sort-title')
      sortTitle.id = system.title

      let titleSpan = document.createElement('span')
      titleSpan.classList.add('title')
      titleSpan.appendChild(document.createTextNode(system.title))

      let moreSpan = document.createElement('span')
      moreSpan.classList.add('more')
      moreSpan.appendChild(document.createTextNode('更多'))

      let moreImg = document.createElement('img')
      moreImg.src = morePic;
      moreSpan.appendChild(moreImg)

      sortTitle.appendChild(titleSpan)
      sortTitle.appendChild(moreSpan)
      courses.appendChild(sortTitle)
      //具体课程
      let coursesInfo = system.courses;
      if(coursesInfo.length !== 0) {
        for(let courseInfo of coursesInfo) {
          let link = document.createElement('a')
          link.href = `${process.env.STATIC_SERVER}/html/course.html?courseId=${courseInfo.courseId}`

          let classBox = document.createElement('div')
          classBox.classList.add('classbox');

          //课程封面
          let classPic = document.createElement('div')
          classPic.classList.add('classpic');
          const img = document.createElement('img');
          img.src = courseInfo.cover;
          classPic.appendChild(img);

          link.appendChild(classPic)

          let classnameSpan = document.createElement('span')
          classnameSpan.classList.add('classname')
          classnameSpan.appendChild(document.createTextNode(courseInfo.title))

          let classintroSpan = document.createElement('span')
          classintroSpan.classList.add('classintro')
          classintroSpan.appendChild(document.createTextNode(courseInfo.subtitle))

          let priceSpan = document.createElement('span')
          priceSpan.classList.add('price')
          priceSpan.appendChild(document.createTextNode('￥' + courseInfo.price))

          classBox.appendChild(link)
          classBox.appendChild(classnameSpan)
          classBox.appendChild(classintroSpan)
          classBox.appendChild(priceSpan)
          courses.appendChild(classBox)
        }
      } else {
        let tips = document.createElement('div')
        tips.innerHTML = '该体系下暂无课程'
        courses.appendChild(tips)
      }
      content.appendChild(courses)
    }
  } catch (e) {
    console.log(e);
  }
}


window.addEventListener('load', () => {
  generateSystems().then(r => {})
})
