/* 放置一些公共的方法。*/

// 函数防抖。
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


export {
  throttle,
  getQuery,
  debounce
}
