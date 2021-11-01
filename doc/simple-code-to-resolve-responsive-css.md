#如何使用简单的代码解决 CSS 响应式问题
在 `<body>` 那一层级上制定如下 CSS 规则：
```css
body {
  width: 100vw;
  height: 100vh;
  min-width: 1100px;
  min-height: 600px;
}
```
这里不一定要是 `<body>`，只要是顶层层级就可以了，具体的原理暂且不给出。
