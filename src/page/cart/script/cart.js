import {throttle, format} from "../../../common/script/utils/commonUtils";
import {getCartItems} from "../../../api/cart/getCartItems";
import {clearCart, deleteCartItem} from "../../../api/cart/deleteCartItem";
import showMessage from "../../../common/script/utils/message";

let selectAllBtn = document.querySelector('.select-all')
let checkBtn = document.querySelector('.check')
let deleteBtn = document.querySelector('.delete')
let cartItemsDiv = document.querySelector(".cart-items")
let emptyCart = document.querySelector('.empty-cart')
let sum = document.querySelector('.money')
let courseNum = document.querySelector('.title > span > span')
let money = Number(sum.innerHTML)
let cartItems = []
let opts, checkboxes
let time1 = format(new Date(), "yyyy-MM-dd hh:mm:ss")

function calcSum(value) {
  for(let i = 0; i < cartItems.length; i++) {
    if(Number(cartItems[i].courseId) === value) {
      money = (money * 1000 - cartItems[i].price * 1000) / 1000
      sum.innerHTML = money
      cartItems.splice(i, 1)
      break
    }
  }
}

async function generateCartItems() {
  //获取用户购物车
  let res = await getCartItems({
    headTime: time1,
    pageNum: 1,
    pageSize: 10
  })

  //获取购物车内容失败
  if(res.code !== 200) {
    showMessage({
      message: '获取购物车内容失败',
      duration: 700,
      type: 'error'
    })
    return
  }
  cartItems = res.data.cartItemVOList

  //生成购物车中的商品
  let formHTML = ""
  for(let cartItem of cartItems) {
    money = (money * 1000 + cartItem.price * 1000) / 1000
    formHTML += `<div class="cart-row cart-item">
        <label>
          <input class="select" type="checkbox" value="${cartItem.courseId}">
        </label>
        <img src="${cartItem.cover}" class="cover" alt="加载中"/>
        <div class="name">${cartItem.title}</div>
        <div class="date">${cartItem.createdTime}</div>
        <div class="price">${cartItem.price}</div>
        <div class="opt">
          <svg t="1634461628889" class="icon" viewBox="0 0 1024 1024" p-id="5217" width="20" height="20"><path d="M840 288H688v-56c0-40-32-72-72-72h-208C368 160 336 192 336 232V288h-152c-12.8 0-24 11.2-24 24s11.2 24 24 24h656c12.8 0 24-11.2 24-24s-11.2-24-24-24zM384 288v-56c0-12.8 11.2-24 24-24h208c12.8 0 24 11.2 24 24V288H384zM758.4 384c-12.8 0-24 11.2-24 24v363.2c0 24-19.2 44.8-44.8 44.8H332.8c-24 0-44.8-19.2-44.8-44.8V408c0-12.8-11.2-24-24-24s-24 11.2-24 24v363.2c0 51.2 41.6 92.8 92.8 92.8h358.4c51.2 0 92.8-41.6 92.8-92.8V408c-1.6-12.8-12.8-24-25.6-24z" p-id="5218" fill="#8F8E94"></path><path d="M444.8 744v-336c0-12.8-11.2-24-24-24s-24 11.2-24 24v336c0 12.8 11.2 24 24 24s24-11.2 24-24zM627.2 744v-336c0-12.8-11.2-24-24-24s-24 11.2-24 24v336c0 12.8 11.2 24 24 24s24-11.2 24-24z" p-id="5219" fill="#8F8E94"></path></svg>
        </div>
</div>`
  }
  cartItemsDiv.innerHTML = formHTML
  sum.innerHTML = money
  courseNum.innerHTML = cartItems.length

  if(cartItems.length) {
    emptyCart.style.display = 'none'
  }

  opts = document.querySelectorAll('.opt')
  checkboxes = document.querySelectorAll('.select')

  //绑定选择全部商品事件
  selectAllBtn.addEventListener('click', () => {
    for(let checkbox of checkboxes) {
      checkbox.checked = selectAllBtn.checked !== false;
    }
  });

  //绑定选择商品事件
  checkBtn.addEventListener('click', throttle(async function () {
    const cartItems = document.querySelectorAll('.cart-item'),
      itemsInfo = []
    for (let item of cartItems) {
      const itemInfo = {
        courseId: item.querySelector('label input').value,
        courseCover: item.querySelector('img').src,
        courseTitle: item.querySelector('.name').textContent,
        price: item.querySelector('.price').textContent
      }
      itemsInfo.push(itemInfo);
    }
    if (itemsInfo.length !== 0) {
      sessionStorage.setItem("paymentData", JSON.stringify(itemsInfo));
      try {
        const res = await clearCart();
        // 将要生成订单，因此需要清空购物车。
        console.log(res);
        window.location.href = `${process.env.STATIC_SERVER}/html/payment.html`;
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('没有商品');
    }
  }, 1000));

  //绑定删除所选商品事件
  deleteBtn.addEventListener('click', throttle(async function () {
    let deleteItems = [];
    let deleteNodes = [];
    for (let i = 0; i < checkboxes.length; i++) {
      if(checkboxes[i].checked) {
        deleteItems.push(Number(checkboxes[i].value))
        deleteNodes.push(checkboxes[i].parentNode.parentNode)
      }
    }
    let deleteRes = await deleteCartItem({cartItems: deleteItems.join()})

    //如果删除成功
    if(deleteRes.code === 204) {
      let len = deleteNodes.length
      //删除节点
      for(let i = 0; i < len; i++) {
        calcSum(deleteItems[i])
        deleteNodes.shift().remove()
      }
      if(!cartItems.length) {
        emptyCart.style.display = 'flex'
      }
      courseNum.innerHTML = cartItems.length
      checkboxes = document.querySelectorAll('.select')
      opts = document.querySelectorAll('.opt')
      showMessage({
        message: '删除成功',
        type: 'success'
      })
    } else {
      showMessage({
        message: '删除失败',
        type: 'error'
      })
    }

  }, 1000))

  //绑定删除指定商品事件
  for(let opt of opts) {
    opt.onclick = async (event) => {
      let value = Number(event.currentTarget.parentNode.querySelector('input').value)
      let self = event.target.parentNode.parentNode
      let deleteRes = await deleteCartItem({cartItems: value})
      if(deleteRes.code === 204) {
        calcSum(value)
        if(!cartItems.length) {
          emptyCart.style.display = 'flex'
        }
        self.onclick = null
        self.parentNode.remove()
        courseNum.innerHTML = cartItems.length
        checkboxes = document.querySelectorAll('.select')
        opts = document.querySelectorAll('.opt')

        showMessage({
          message: '删除成功',
          type: 'success'
        })
      } else {
        showMessage({
          message: '删除失败',
          type: 'error'
        })
      }
    }
  }
}

window.addEventListener('load', () => {

  generateCartItems().then(r => {});

})
