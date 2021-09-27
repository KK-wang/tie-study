import '../../../component/footer/script/index'
window.addEventListener('load', () => {
  let toTop = document.querySelector('.toTop')
  toTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })
  let options = document.getElementsByClassName('option2')
  let dropdown = document.getElementsByClassName('drop-menu')
  options[0].addEventListener('click', () => {
    dropdown[0].style.display = dropdown[0].style.display === 'block' ? 'none' : 'block'
  })

})