import {throttle, format} from "../../../common/script/utils";
import {getCartItems} from "../../../api/cart/getCartItems";

let selectAllBtn = document.querySelector('.select-all')
let checkBtn = document.querySelector('.check')
let deleteBtn = document.querySelector('.delete')
let cartItemsDiv = document.querySelector(".cart-items")
let emptyCart = document.querySelector('.empty-cart')
let sum = document.querySelector('.money')
let courseNum = document.querySelector('.title > span > span')
let money = Number(sum.innerHTML)
let cartItems = []



window.addEventListener('load', () => {
  let time1 = format(new Date(), "yyyy-MM-dd hh:mm:ss")

  getCartItems({
    headTime: time1,
    pageNum: 1,
    pageSize: 10
  }).then((res) => {
    cartItems = res.data.cartItemVOList
    console.log(cartItems)
    let formHTML = ""
    for(let cartItem of cartItems) {
      money = (money * 1000 + cartItem.price * 1000) / 1000
      formHTML += `<div class="cart-row cart-item">
        <label>
          <input class="select" type="checkbox" value="${cartItem.courseId}">
        </label>
        <div class="cover">
          ${cartItem.cover}
        </div>
        <div class="name">
          ${cartItem.title}
        </div>
        <div class="date">
          ${cartItem.createdTime}
        </div>
        <div class="price">
          ${cartItem.price}
        </div>
        <div class="opt">
          <svg t="1634461628889" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5217" width="20" height="20"><path d="M840 288H688v-56c0-40-32-72-72-72h-208C368 160 336 192 336 232V288h-152c-12.8 0-24 11.2-24 24s11.2 24 24 24h656c12.8 0 24-11.2 24-24s-11.2-24-24-24zM384 288v-56c0-12.8 11.2-24 24-24h208c12.8 0 24 11.2 24 24V288H384zM758.4 384c-12.8 0-24 11.2-24 24v363.2c0 24-19.2 44.8-44.8 44.8H332.8c-24 0-44.8-19.2-44.8-44.8V408c0-12.8-11.2-24-24-24s-24 11.2-24 24v363.2c0 51.2 41.6 92.8 92.8 92.8h358.4c51.2 0 92.8-41.6 92.8-92.8V408c-1.6-12.8-12.8-24-25.6-24z" p-id="5218" fill="#8F8E94"></path><path d="M444.8 744v-336c0-12.8-11.2-24-24-24s-24 11.2-24 24v336c0 12.8 11.2 24 24 24s24-11.2 24-24zM627.2 744v-336c0-12.8-11.2-24-24-24s-24 11.2-24 24v336c0 12.8 11.2 24 24 24s24-11.2 24-24z" p-id="5219" fill="#8F8E94"></path></svg>
        </div>
</div>`
    }
    cartItemsDiv.innerHTML = formHTML
    sum.innerHTML = money
    courseNum.innerHTML = cartItems.length

    if(!cartItems.length) {
      emptyCart.style.display = 'flex'
    }
  })





  let opts = document.querySelectorAll('.opt')
  let checkboxes = document.querySelectorAll('.select')

  selectAllBtn.addEventListener('click', () => {
    for(let checkbox of checkboxes) {
      checkbox.checked = selectAllBtn.checked !== false;
    }
  })

  checkBtn.addEventListener('click', throttle(function () {
    let cartItems = []
    for (let checkbox of checkboxes) {
      if(checkbox.checked) {
        cartItems.push(checkbox.value)
      }
    }
    console.log(cartItems)
  }, 1000))

  function calcSum(value) {
    for(let i = 0; i < cartItems.length; i++) {
      if(cartItems[i].courseId === value) {
        money = (money * 1000 - cartItems[i].price * 1000) / 1000
        sum.innerHTML = money
        cartItems.splice(i, 1)
        break
      }
    }
  }

  deleteBtn.addEventListener('click', throttle(function () {
    let deleteItems = []
    for (let i = 0; i < checkboxes.length; i++) {
      if(checkboxes[i].checked) {
        deleteItems.push(checkboxes[i].value)
        calcSum(checkboxes[i].value)
        if(!cartItems.length) {
          emptyCart.style.display = 'flex'
        }
        checkboxes[i].parentNode.parentNode.remove()
      }
    }
    courseNum.innerHTML = cartItems.length
    checkboxes = document.querySelectorAll('.select')
    opts = document.querySelectorAll('.opt')
  }, 1000))

  for(let opt of opts) {
    opt.onclick = (event) => {
      let value = event.currentTarget.parentNode.querySelector('input').value
      calcSum(value)
      if(!cartItems.length) {
        emptyCart.style.display = 'flex'
      }
      event.currentTarget.onclick = null
      event.currentTarget.parentNode.remove()
      courseNum.innerHTML = cartItems.length
      checkboxes = document.querySelectorAll('.select')
      opts = document.querySelectorAll('.opt')
    }
  }

})