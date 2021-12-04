/* 放置一些公共的方法。*/

// （自己写的）函数防抖，没有利用到闭包。
function debounce(fn, args, delay) {
  let timer = null;
  return function () {
    if (timer !== null) {
      // 如果 timer 不是 null。
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(args);
      }, delay);
    } else {
      // 如果 timer 是 null。
      timer = setTimeout(() => {
        fn(args);
        /* 函数防抖会在 delay 时间到的时候再执行。*/
      }, delay);
    }
  }
}


// 函数节流。
function throttle (fn, delay) {
  let timer = null;
  return function () {
    if (timer !== null) {
      return;
    }
    fn(); /* 函数节流会立即执行一次。*/
    timer = setTimeout(() => {
      timer = null;
    }, delay)
  }
}

// 获取当前网页的 query。
function getQuery () {
  const urlQueryArr = window.location.search.slice(1).split('&');
  const queryObj = {};
  for (let urlQuery of urlQueryArr) {
    let keyValue = urlQuery.split('=');
    queryObj[keyValue[0]] = keyValue[1];
  }
  return queryObj;
}

//日期格式化
function format(date, fmt) {
  let o = {
    "M+" : date.getMonth() + 1,               // 月份。
    "d+" : date.getDate(),                    // 日。
    "h+" : date.getHours(),                   // 小时。
    "m+" : date.getMinutes(),                 // 分。
    "s+" : date.getSeconds(),                 // 秒。
    "S"  : date.getMilliseconds()             // 毫秒。
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(let k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
}


export {
  throttle,
  getQuery,
  debounce,
  format
}
