# Cookie 共享问题
Cookie 有一个特性：

协议相同，域名相同，端口号不同，但是在往 `cookie` 存放相同的一个字段 `token` 时，会发现前一个存放的 `token`，会被后一个 `token` 覆盖掉。

因此，我们便能够给出以下结论：Cookie 是不区分端口号的，如果 Cookie 名相同，会自动覆盖，并且读取是相同的数据。

为了避免这种情况，应该设置不同的 Cookie 名称，或者在不同的域名下部署 Web 应用。

另外，这里澄清一下 Cookie domain 属性的作用：

domain 指定了 cookie 将要被发送至哪个或哪些域中。默认情况下，domain会被设置为创建该 cookie 的页面所在的域名，所以当给相同域名发送请求时该 cookie 会被发送至服务器。显示的指定 domain 选项可用来扩充 cookie 可发送域的数量。

> 也正是因为上面所叙述的原因，CORS 才会默认不支持传递 Cookie 属性。
