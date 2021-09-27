import '../style/main'
import './nav'
import './banner'

import $ from 'jquery'
import navbarJS from '@/component/navbar/script/import.js';
$(document).ready(() => {
  $('.footer').load('http://localhost:8899/html/footer.html', undefined, () => {})
  $('.nav-bar').load('http://localhost:8899/html/navbar.html #nav-bar', undefined, () => {
    console.log('nav-bar');
    navbarJS()
  })
})

