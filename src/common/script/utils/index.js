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

export {throttle}