import '../../../component/footer/script/index'

let baseSorts = [{
  categoryId: 1,
  name: "前端技术栈",
  level: 1
},{
  categoryId: 2,
  name: "后端技术栈",
  level: 1
}, {
  categoryId: 3,
  name: '运维&测试',
  level: 1
}, {
  categoryId: 4,
  name: '项目实战',
  level: 1
}, {
  categoryId: 4,
  name: '项目实战',
  level: 1
},{
  categoryId: 4,
  name: '项目实战',
  level: 1
}]

class SortTree {
  constructor(sort, parent) {
    this.info = sort
    this.children = null
    this.parent = parent
  }
}

let baseTrees = []
for(let baseSort of baseSorts) {
  let baseTree = new SortTree(baseSort, null)
  baseTrees.push(baseTree)
}

//展示当前最小目录的节点
let node = null


window.addEventListener('load', () => {
  let dropMenu = document.getElementsByClassName('drop-menu')[0]
  //显示下拉框
  let options = document.getElementsByClassName('option2')
  let dropdown = document.getElementsByClassName('drop-menu')
  options[0].addEventListener('click', () => {
    dropdown[0].style.display = dropdown[0].style.display === 'block' ? 'none' : 'block'
  })

  //初始化1级分类
  let baseDropClass = document.getElementsByClassName('drop-class')[0]
  let baseClass = ''
  for(let i = 0; i < baseTrees.length; i++) {
    baseClass = baseClass + '<div id=d' + i + '>' + baseTrees[i].info.name + '</div>'
  }
  baseDropClass.innerHTML = baseClass

  //获取各级分类
  let dropClass = baseDropClass.childNodes

  function optionclick(event) {
    let dropOptions = event.target.parentNode.childNodes
    let dropClasses = document.getElementsByClassName('drop-class')

    //获取当前分类的等级
    let level = Number(event.target.parentNode.id[1])
    //节点在当前分类下的序号
    let order = Number(event.target.id[1])
    //获取当前节点
    if(level === 1) {
      node = baseTrees[order]
    } else if (level > node.info.level) {
      node = node.children[order]
    } else {
      let iniLevel = node.info.level
      for(let i = 0; i < iniLevel - level + 1; i++) {
        node = node.parent
      }
      node = node.children[order]
    }

    if(event.target.classList.contains('active')) {
      //收起目录
      event.target.classList.remove('active')
      for(let i = dropClasses.length - 1; i >= level; i--) {
        dropMenu.removeChild(dropClasses[i])
      }
      node = node.parent
    } else  {
      //展开目录

      //清除其他选项的active类
      for(let option of dropOptions) {
        option.classList.remove('active')
      }
      event.target.classList.add('active')

      if(node.info.level !== -1 && node.children === null) {
        //通过网络请求获取子目录
        node.children = []
        for(let i = 0; i < 3; i++) {
          let child = new SortTree({
            categoryId: 1,
            name: "前端技术栈",
            level: node.info.level + 1
          }, node)

          node.children.push(child)
        }
      }
      //新建div展示子目录
      let nextDropClass = document.createElement('div')
      nextDropClass.classList.add('drop-class')
      nextDropClass.id = 'l'+(node.info.level + 1)

      let baseClass = ''
      for(let i = 0; i < node.children.length; i++) {
        baseClass = baseClass + '<div id=d' + i + '>' + node.children[i].info.name + '</div>'
      }
      nextDropClass.innerHTML = baseClass
      for(let i = 0; i < nextDropClass.childNodes.length; i++) {
        nextDropClass.childNodes[i].addEventListener('click', (event) => optionclick(event))
      }

      for(let i = dropClasses.length - 1; i >= level; i--) {
        dropMenu.removeChild(dropClasses[i])
      }
      dropMenu.appendChild(nextDropClass)

    }
  }

  for(let option of dropClass) {
    option.addEventListener('click', (event) => optionclick(event))
  }
})
