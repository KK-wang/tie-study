window.addEventListener('load', () => {
  let folder = document.querySelector('.folder')
  let methods = document.querySelector('.others')
  console.log(methods)
  folder.addEventListener('click', () => {
    if(methods.style.display === 'none') {
      methods.style.display = 'block'
      folder.textContent = '收起'
    } else {
      methods.style.display = 'none'
      folder.textContent = '展开'
    }

  })
})