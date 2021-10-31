let directoryContent = document.querySelector('.directory-content');
let commentsContent = document.querySelector('.comments-content');
let notesContent = document.querySelector('.notes-content');
let contents = [directoryContent, commentsContent, notesContent];
// 分别对应上面三个内容。
let options = document.querySelectorAll('.op');
// options 是 sidebar 的顶部。
let fold = document.querySelector('.fold');
// fold 是折叠栏。
let sidebar = document.querySelector('.video-sidebar');
// sidebar 是整个侧边栏。

window.addEventListener('load', () => {
  for(let i = 0; i < options.length; i++) {
    options[i].addEventListener('click', (event) => {
      for(let option of options) {
        option.classList.remove('active')
      }
      event.currentTarget.classList.add('active')
    });
  }

  contents[0].style.display = 'block';
  contents[1].style.display = 'none';
  contents[2].style.display = 'none';
  // contents 的调节是在各组件中手动进行的。

  fold.addEventListener('click', () => {
    let ops = fold.getElementsByTagName('span');
    if(ops[0].classList.contains('active')) {
      ops[1].classList.add('active')
      ops[0].classList.remove('active')
      sidebar.style.display = 'block'
    } else  {
      ops[0].classList.add('active')
      ops[1].classList.remove('active')
      sidebar.style.display = 'none'
    }
  });
  // fold 是用来折叠侧边栏的触发器。
});

export {contents, options}
