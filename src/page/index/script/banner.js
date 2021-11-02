import img1 from '../../../assets/img/index/1.png'
import img2 from '../../../assets/img/index/2.png'
import img3 from '../../../assets/img/index/3.png'
import {getBanners} from "../../../api/index/system";

window.addEventListener('load', () => {
  getBanners().then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
  let arr = [img1, img2, img3, img1, img2, img3, img1]
  let index = 0
  let img = document.querySelector(".bannerimg")
  img.src = arr[index]
  let menuItems = document.querySelectorAll(".menu-item")
  for(let i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener('click', () => {
      menuItems[index].classList.remove('active')
      index = i
      menuItems[index].classList.add('active')
      img.src = arr[index]
    })
  }
  window.setInterval(() => {
    menuItems[index].classList.remove('active')
    index = (index + 1)%7
    menuItems[index].classList.add('active')
    img.src = arr[index]
  }, 3000)
})
