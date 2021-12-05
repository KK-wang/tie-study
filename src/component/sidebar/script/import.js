export default function () {
  document.querySelector('.shortcut:first-child').addEventListener('click', () => {
    window.location.href = `${process.env.STATIC_SERVER}/html/cart.html`;
  });
  document.querySelector('.shortcut:last-child').addEventListener('click', () => {
    // 瞬间回到顶部。
    document.documentElement.scrollTop = 0;
  });
}
