# 原生的前端的通信方式
项目目前在页面中及页面间已经使用了多种通信方式，具体如下：

1. cookie
2. sessionStorage
3. localStorage
4. window.property
5. url-query 或者 url-hash

这里重点说一下 sessionStorage 的相关知识：

可以利用 sessionStorage 来保存临时数据，sessionStorage 具有如下生命周期：
1. sessionStorage的生命周期是在仅在当前会话下有效。
2. sessionStorage引入了一个“浏览器窗口”的概念，sessionStorage是在同源的窗口中始终存在的数据。只要这个浏览器窗口没有关闭， 即使刷新页面或者进入同源另一个页面，数据依然存在。
3. 但是sessionStorage在关闭了浏览器窗口后就会被销毁。 同时独立的打开同一个窗口同一个页面，sessionStorage也是不一样的。
