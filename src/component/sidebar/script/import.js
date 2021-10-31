if (process.env.NODE_ENV === 'development') {
  /* 这是用来实现 HMR 的代码，JS 模块中只有存在了这段代码才会开启 HMR。 */
  module.hot.accept((err) => {
    console.error(err);
  });
}

export default function () {
  document.querySelector('.shortcut:first-child').addEventListener('click', () => {
    window.location.href = 'http://localhost:8899/html/cart.html';
  });
  document.querySelector('.shortcut:last-child').addEventListener('click', () => {
    // 瞬间回到顶部。
    document.documentElement.scrollTop = 0;
  });
}
