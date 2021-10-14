window.addEventListener('load', () => {
  //系统化学习路线
  let systems = [
    {systemId: '', systemName: '前后端通用技术', cover: ''},
    {systemId: '', systemName: '全栈项目实践', cover: ''},
    {systemId: '', systemName: '后端技术进阶', cover: ''},
    {systemId: '', systemName: '前端技术栈进阶', cover: ''},
    {systemId: '', systemName: 'Linux运维', cover: ''},
    {systemId: '', systemName: '软件测试核心技术', cover: ''}
  ]
  let systemNav = document.getElementsByClassName('system-nav')[0]
  for(let system of systems) {
    let content = document.getElementsByClassName('sort-content')[0]
    //系统化学习
    let roundBox = document.createElement('div')
    roundBox.classList.add('round-box')
    let text = document.createTextNode(system.systemName)
    roundBox.appendChild(text)
    systemNav.appendChild(roundBox)

    //每个体系中的课程
    let courses = document.createElement('div')
    courses.classList.add('sort-box')

    let sortTitle = document.createElement('div')
    sortTitle.classList.add('sort-title')

    let titleSpan = document.createElement('span')
    titleSpan.classList.add('title')
    titleSpan.appendChild(document.createTextNode(system.systemName))

    let moreSpan = document.createElement('span')
    moreSpan.classList.add('more')
    moreSpan.appendChild(document.createTextNode('更多'))

    sortTitle.appendChild(titleSpan)
    sortTitle.appendChild(moreSpan)
    courses.appendChild(sortTitle)

    let coursesInfo = [
      {courseId: '', title: 'Vue从入门到精通', subTitle: 'Vue从入门到精通', cover: '', price: '39.9'},
      {courseId: '', title: 'Vue从入门到精通', subTitle: 'Vue从入门到精通', cover: '', price: '39.9'},
      {courseId: '', title: 'Vue从入门到精通', subTitle: 'Vue从入门到精通', cover: '', price: '39.9'},
      {courseId: '', title: 'Vue从入门到精通', subTitle: 'Vue从入门到精通', cover: '', price: '39.9'}
    ]

    for(let i = 0; i < 4; i++) {
      let classBox = document.createElement('div')
      classBox.classList.add('classbox')

      let classPic = document.createElement('div')
      classPic.classList.add('classpic')
      classPic.appendChild(document.createTextNode('a'))

      let classnameSpan = document.createElement('span')
      classnameSpan.classList.add('classname')
      classnameSpan.appendChild(document.createTextNode(coursesInfo[i].title))

      let classintroSpan = document.createElement('span')
      classintroSpan.classList.add('classintro')
      classintroSpan.appendChild(document.createTextNode(coursesInfo[i].subTitle))

      let priceSpan = document.createElement('span')
      priceSpan.classList.add('price')
      priceSpan.appendChild(document.createTextNode(coursesInfo[i].price))

      classBox.appendChild(classPic)
      classBox.appendChild(classnameSpan)
      classBox.appendChild(classintroSpan)
      classBox.appendChild(priceSpan)

      courses.appendChild(classBox)
    }
    content.appendChild(courses)
  }



})