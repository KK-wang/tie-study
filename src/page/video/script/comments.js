import {options, contents} from './videoSideBar'
let videoSidebar = document.querySelector('.video-sidebar')
window.addEventListener('load', () => {
  options[1].addEventListener('click', () => {
    videoSidebar.style.width = '350px'
    contents[0].style.display = 'none'
    contents[1].style.display = 'flex'
    contents[2].style.display = 'none'
  })
})