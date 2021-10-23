import {options, contents, generateDirectory} from './videoSideBar'
let videoSidebar = document.querySelector('.video-sidebar')

window.addEventListener('load', () => {
  let chapters = document.querySelectorAll('.chapter')
  chapters[0].childNodes[1].classList.add('active')

  options[0].addEventListener('click', () => {
    videoSidebar.style.width = '350px'
    // let chaptersInfo = [
    //   {chapterId: 1, sort: 1, title: 'webpack初体验', isStudied: 1},
    //   {chapterId: 2, sort: 2, title: 'webpack初体验', isStudied: 1},
    //   {chapterId: 3, sort: 3, title: 'webpack初体验', isStudied: 1},
    // ]
    //
    // let lessons = [
    //   [
    //     {lessonId: 1, title: "为什么出现webpack", type: "0", sort: 1, length: "34:30", createdTime: ""},
    //     {lessonId: 2, title: "为什么出现webpack", type: "0", sort: 2, length: "34:30", createdTime: ""},
    //   ],
    //   [
    //     {lessonId: 3, title: "为什么出现webpack", type: "0", sort: 3, length: "34:30", createdTime: ""},
    //     {lessonId: 4, title: "为什么出现webpack", type: "0", sort: 4, length: "34:30", createdTime: ""},
    //     {lessonId: 5, title: "为什么出现webpack", type: "0", sort: 5, length: "34:30", createdTime: ""},
    //   ],
    //   [
    //     {lessonId: 6, title: "为什么出现webpack", type: "0", sort: 6, length: "34:30", createdTime: ""},
    //     {lessonId: 7, title: "为什么出现webpack", type: "0", sort: 7, length: "34:30", createdTime: ""},
    //   ]
    // ]
    // //页面打开后默认显示目录页面
    // //生成html
    // generateDirectory(chaptersInfo, lessons, contents[0])
    //
    // let chapters = document.querySelectorAll('.chapter')
    // chapters[0].childNodes[1].classList.add('active')

    contents[0].style.display = 'block'
    contents[1].style.display = 'none'
    contents[2].style.display = 'none'
  })
})

