import '../../../component/footer/script/index'

window.addEventListener('load', () => {
  let options = document.getElementsByClassName('option2')
  let dropdown = document.getElementsByClassName('drop-menu')
  options[0].addEventListener('click', () => {
    dropdown[0].style.display = dropdown[0].style.display === 'block' ? 'none' : 'block'
  })
})
