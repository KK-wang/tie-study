/* 放置一些公共的方法。*/

// （自己写的）函数防抖，没有利用到闭包。
function debounce(fn, args, delay) {
  if ("debounceTimer" in fn) {
    // 如果 fn 有 debounceTimer 属性。
    clearTimeout(fn.debounceTimer);
    fn.debounceTimer = setTimeout(() => {
      fn(args);
    }, delay);
  } else {
    // 如果没有 debounceTimer 属性。
    fn.debounceTimer = setTimeout(() => {
      fn(args);
    }, delay);
  }
}


// 函数节流。
function throttle (fn, delay) {
  let timer = null
  return function () {
    if (timer !== null) {
      return;
    }
    fn();
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
    "M+" : date.getMonth()+1,                 //月份
    "d+" : date.getDate(),                    //日
    "h+" : date.getHours(),                   //小时
    "m+" : date.getMinutes(),                 //分
    "s+" : date.getSeconds(),                 //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S"  : date.getMilliseconds()             //毫秒
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
