import {getBanners} from "../../../api/index/system";
import loadingFail from '@/assets/svg/index/loading-fail.svg';

window.addEventListener('load', () => {
  getBanners().then(res => {
    let img = document.querySelector(".bannerimg")
    let link = document.querySelector('.banner-content a')
    let origin = window.location.origin
    let activeIndex = 0
    let banners = res.data
    let menu = document.querySelector('.menu')
    let menuItems = []

    banners.forEach((banner, index) => {
      if(banner.show) {
        let a = document.createElement('a')

        if(index === 0) a.classList.add('active')
        a.classList.add('menu-item')
        let span = document.createElement('span')
        span.appendChild(document.createTextNode(banner.title))
        a.appendChild(span)

        a.addEventListener('click', () => {
          menuItems[activeIndex].classList.remove('active')
          activeIndex = index
          menuItems[activeIndex].classList.add('active')
          link.href = origin + '/html/course.html?courseId=' + banners[activeIndex].courseId
          img.src = banner.cover
        })
        menuItems.push(a)
      }
    })
    for(let menuItem of menuItems) {
      menu.appendChild(menuItem)
    }

    window.setInterval(() => {
      menuItems[activeIndex].classList.remove('active')
      activeIndex = (activeIndex + 1)%banners.length
      link.href = origin + '/html/course.html?courseId=' + banners[activeIndex].courseId
      menuItems[activeIndex].classList.add('active')
      img.src = banners[activeIndex].cover
    }, 3000)
  }).catch(() => {
    document.querySelector(".bannerimg").src = loadingFail;
  });
})
