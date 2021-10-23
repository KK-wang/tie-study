if (process.env.NODE_ENV === 'development') {
  /* 这是用来实现 HMR 的代码，JS 模块中只有存在了这段代码才会开启 HMR。 */
  module.hot.accept((err) => {
    console.error(err);
  });
}

// 优化打包后的文件的体积。

import $ from 'jquery';

export default function () {
  $('.web-logo').on('click', () => {
    window.location.href = 'http://localhost:8899/html/index.html';
  });
  $('.course').on('click', () => {
    window.location.href = 'http://localhost:8899/html/course.html'
  });
}
