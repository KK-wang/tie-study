import {options, contents} from './videoSideBar'
let videoSidebar = document.querySelector('.video-sidebar')
window.addEventListener('load', () => {
  options[2].addEventListener('click', () => {
    videoSidebar.style.width = '500px'
    contents[0].style.display = 'none'
    contents[1].style.display = 'none'
    contents[2].style.display = 'block'
  })
})
