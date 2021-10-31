export default function () {
  /* 由于对 JQuery 不是很熟练，因此下面的功能还是使用原生的 JS 实现。*/
  const validateBtnInFirstForm = document.querySelector('.validate-btn-in-first-form'),
    registerForms = document.querySelectorAll('.register-form');

  let activeRegisterForm = registerForms[0];
  // activeRegisterForm 指向当前显示的 register-form。
  let i;
  for (i = 0; i < registerForms.length; i++) {
    registerForms[i].addEventListener('animationend', (event) => {
      if (event.target !== event.currentTarget) {
        // 防止子元素的事件冒泡至父元素。
        const classList = event.currentTarget.classList;
        if (classList.contains('fade-out')) {
          event.currentTarget.classList.remove('active');
          event.currentTarget.classList.remove('fade-out');
          event.currentTarget.classList.remove('active-from-left-fixed');
          activeRegisterForm = registerForms[++i % 3];
          activeRegisterForm.classList.add('active');
        }
        if (classList.contains('fade-out-to-right')) {
          event.currentTarget.classList.remove('active');
          event.currentTarget.classList.remove('fade-out-to-right');
          activeRegisterForm = registerForms[--i % 3];
          activeRegisterForm.classList.add('active-from-left');
        }
        if (classList.contains('active-from-left')) {
          activeRegisterForm.classList.remove('active-from-left');
          activeRegisterForm.classList.add('active-from-left-fixed');
        }
      }
    }, false);
  }

  validateBtnInFirstForm.addEventListener('click', () => {
    activeRegisterForm.classList.add('fade-out');
  }, false);
}
