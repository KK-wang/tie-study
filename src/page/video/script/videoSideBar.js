let directoryContent = document.querySelector('.directory-content')
let commentsContent = document.querySelector('.comments-content')
let notesContent = document.querySelector('.notes-content')
let contents = [directoryContent, commentsContent, notesContent]
let options = document.querySelectorAll('.op')
let fold = document.querySelector('.fold')
let sidebar = document.querySelector('.video-sidebar')
function generateDirectory(chapters, lessons, directoryContent) {
  let directoryInnerHtml = ''
  for (let i = 0; i < chapters.length; i++) {
    directoryInnerHtml += '<div class="chapter">'
    directoryInnerHtml += `<div class="chapter-title"><span>章节</span><span class="order">${i}</span><span class="title-content">${chapters[i].title}</span></div>`
    for (let j = 0; j < lessons[i].length; j++) {
      directoryInnerHtml += `<div class="lesson">
        <span class="order">课时${lessons[i][j].sort}</span>
        <span class="circle"></span>
        <span class="title">${lessons[i][j].title}</span>
        <span class="time">
            ${lessons[i][j].length}
            <svg t="1634370043637" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5776" width="25" height="25"><path d="M204.8 236.8A19.2 19.2 0 0 0 185.6 256v512c0 10.5984 8.6016 19.2 19.2 19.2h614.4a19.2 19.2 0 0 0 19.2-19.2V256A19.2 19.2 0 0 0 819.2 236.8H204.8z m0-64h614.4c45.9264 0 83.2 37.2736 83.2 83.2v512c0 45.9264-37.2736 83.2-83.2 83.2H204.8A83.2 83.2 0 0 1 121.6 768V256c0-45.9264 37.2736-83.2 83.2-83.2z" p-id="5777" fill="#999B9C"></path><path d="M670.7712 485.0176a52.48 52.48 0 0 1-17.9712 71.9872l-195.7376 117.4016a52.48 52.48 0 0 1-79.4624-44.9536V394.5472a52.48 52.48 0 0 1 79.4624-44.9536L652.8 466.944c7.3728 4.4544 13.568 10.5984 17.9712 18.0224z m-229.1712-70.144v194.2016L603.392 512l-161.792-97.0752z" p-id="5778" fill="#999B9C"></path></svg>
        </span>
        </div>`
    }
    directoryInnerHtml += '</div>'
  }
  directoryContent.innerHTML = directoryInnerHtml
}

window.addEventListener('load', () => {
  for(let i = 0; i < options.length; i++) {
    options[i].addEventListener('click', (event) => {
      for(let option of options) {
        option.classList.remove('active')
      }
      event.currentTarget.classList.add('active')
    })
  }

  let chapters = [
    {chapterId: 1, sort: 1, title: 'webpack初体验', isStudied: 1},
    {chapterId: 2, sort: 2, title: 'webpack初体验', isStudied: 1},
    {chapterId: 3, sort: 3, title: 'webpack初体验', isStudied: 1},
  ]

  let lessons = [
      [
        {lessonId: 1, title: "为什么出现webpack", type: "0", sort: 1, length: "34:30", createdTime: ""},
        {lessonId: 2, title: "为什么出现webpack", type: "0", sort: 2, length: "34:30", createdTime: ""},
      ],
      [
        {lessonId: 3, title: "为什么出现webpack", type: "0", sort: 3, length: "34:30", createdTime: ""},
        {lessonId: 4, title: "为什么出现webpack", type: "0", sort: 4, length: "34:30", createdTime: ""},
        {lessonId: 5, title: "为什么出现webpack", type: "0", sort: 5, length: "34:30", createdTime: ""},
      ],
      [
        {lessonId: 6, title: "为什么出现webpack", type: "0", sort: 6, length: "34:30", createdTime: ""},
        {lessonId: 7, title: "为什么出现webpack", type: "0", sort: 7, length: "34:30", createdTime: ""},
      ]
  ]
  //页面打开后默认显示目录页面
  //生成html
  generateDirectory(chapters, lessons, directoryContent)

  contents[0].style.display = 'none'
  contents[1].style.display = 'flex'
  contents[2].style.display = 'none'

  fold.addEventListener('click', () => {
    let ops = fold.getElementsByTagName('span')
    if(ops[0].classList.contains('active')) {
      ops[1].classList.add('active')
      ops[0].classList.remove('active')
      sidebar.style.display = 'block'
    } else  {
      ops[0].classList.add('active')
      ops[1].classList.remove('active')
      sidebar.style.display = 'none'
    }

  })
})
export {contents, options, generateDirectory}
