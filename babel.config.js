const presets = [
  ["@babel/preset-env"],
]

module.exports = {
  presets,
  plugins: ['@babel/plugin-transform-runtime']
  // 加了这个插件，babel 才会将 async、await 等语法进行转译。
}
