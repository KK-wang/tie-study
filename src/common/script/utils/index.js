// 放置一些公共的方法。
function throttle (fn, delay) {
  let timer = null

  return function () {
    if (timer) {
      return
    }
    fn()
    timer = setTimeout(() => {
      timer = null
    }, delay)
  }
}

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
  getQuery
}
