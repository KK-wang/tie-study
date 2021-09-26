if (process.env.NODE_ENV === 'development') {
  /* 这是用来实现 HMR 的代码，JS 模块中只有存在了这段代码才会开启 HMR。 */
  module.hot.accept((err) => {
    console.error(err);
  });
}

import '../style/main';
import $ from 'jquery';
const options = $('.options');
options.on('click', () => {
  const classArr = options.attr('class').split(" ");
  if (classArr.indexOf('open-list') === -1)
    options.addClass('open-list');
  else options.removeClass('open-list');

});
