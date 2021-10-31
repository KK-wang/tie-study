if (process.env.NODE_ENV === 'development') {
  /* 这是用来实现 HMR 的代码，JS 模块中只有存在了这段代码才会开启 HMR。 */
  module.hot.accept((err) => {
    console.error(err);
  });
}

import '../style/main.scss'
import $ from 'jquery';
import { controlRegisterFormBgStyle, controlValidateResultStyle } from './control-style';
import controlAnimation from './control-register-animation';
import { linkToHomePage } from "./network";

$(document).ready(() => {
  controlRegisterFormBgStyle();
  controlValidateResultStyle();
  controlAnimation();
  linkToHomePage();
});
