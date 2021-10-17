import $ from 'jquery';

function writeIntroduction() {
  $('.panel-li:nth-child(1) .panel-li-introduce').html(`
    <h3>适用人群</h3>
    <p>本课程适合有一定前端开发基础，想要更加深入地了解前端工程化的同学。</p>
    <h3>课程概述</h3>
    <p>
      课程的目标是帮助大家从零开始学习Webpack，
      到Webpack各种核心配置、高级进阶配置，
      到Webpack模块化打包原理等整个Webpack体系的内容。
    </p>
    <p>
      课程从认识Webpack的核心思想开始学习，
      到讲解Webpack的打包入口entry配置、出口output配置、
      开发模式mode配置以及在开发状态下devServer等详细的配置过程以及其中的细节分析。
    </p>
    <p>
      Webpack的核心Loader和Plugin会进行深入详细的解析，包括Loader的常用配置、
      开发中最常用的10多种Loader分别如何使用和配置、以及自定义属于自己的Loader的过程。
      在讲解Loader的过程中还会涉及到前端的一个核心知识Babel，那么就会将Babel的各种用法以及polyfill、
      TypeScript、结合Webpack等知识一起来学习。还包括配置ESLint的各种用法、
      规范、规则，结合VScode、Web-pack等方式使用ESLint。Plugin也会进行深入讲解，
      包括Plugin和Loader的区别，以及常用的各种各样Plugin，比如MiniCssExtract-Plugin、
      PuryfyCss、ProvidePlugin等等。我们也会学习如何自定义一个属于自己的Plugin，在Webpack中使用。
    </p>
    <p>
      另外，我们会学习对Webpack的性能相关的优化:包括代码的分包、
      抽取公共代码、JavaScript的Tree、Shaking、CSS的TreeShaking、
      制作动态链接库、使用CDN加载资源、通过gzip对代码进行压缩处理，
      对打包结果进行分析以及对应的优化方案等等。
    </p>
    <p>
      最后，我们不仅仅会从应用层面学习Webpack，我们也会深入到Webpack的原理，
      包括Webpack对commonjs模块化是如何支持，对ES Module是如何支持的。
      另外，我们也会结合babel来实现Webpack的打包过程，让大家深刻体会到Webpack的整个打包原理以及特性。
    </p>
    <h3>课程大纲</h3>
    <ol>
      <li>webpack核心配置深入解析。</li>
      <li>webpack常用Loaders和Plugins深入学习。</li>
      <li>自定义webpack中自己的Loaders和Plugin。</li>
      <li>Babel各种用法以及polyfill、TypeScript的支持。</li>
      <li>ESLint的配置规则以及在VSCode、Webpack中的使用。</li>
      <li>各种性能优化方案：打包抽取分包、Tree Shaking、动态链接库、CDN、gzip压缩等等。</li>
      <li>webpack模块化原理解析、打包原理实现。</li>
      <li>掌握其他流行构建工具：gulp、rollup、vite等等。</li>
    </ol>
    <h3>学完你可以</h3>
    <ol>
      <li>自由在三大框架（Vue、React、Angular）脚手架中修改webpack的配置。</li>
      <li>对原有项目进行开发、打包、发布相关的性能优化。</li>
      <li>基于gulp、webpack、rollup进行配置打包任意项目。</li>
      <li>深入理解构建工具的核心思想和原理。</li>
    </ol>
  `);
}

export {
  writeIntroduction
}
