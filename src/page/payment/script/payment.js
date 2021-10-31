window.addEventListener('load', () => {
  let folder = document.querySelector('.folder')
  let methods = document.querySelector('.others')
  folder.addEventListener('click', () => {
    if(methods.style.display === 'none') {
      methods.style.display = 'block'
      folder.textContent = '收起'
    } else {
      methods.style.display = 'none'
      folder.textContent = '展开'
    }
  });
  document.querySelector('.payment-avatar').src = window.$store.userAvatar;
});
