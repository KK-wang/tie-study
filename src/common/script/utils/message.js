/* option 包括如下内容:
 * message: 消息文字
 * duration: 显示时间
 * type: 消息类型
 * onclose: 当 message 消失时，回调的事件。
 */
export default function ({ message, duration = 700, type = 'message', onclose }) {
  if (document.querySelector('.message-container') !== null) return;
  // 为了实现 CSS Module，使用 Shadow DOM 将 CSS 的作用域限定在 div 中。
  const messageContainer = document.createElement('div'),
    shadowMessage = messageContainer.attachShadow({
      mode: 'open'
    }), color = getMessageColor(type);

  shadowMessage.innerHTML = `
    <div class="container">
      ${eval(type)}
      <span class="message">${message}</span>
    </div>
    <style>
      .container {
        position: relative;
        width: auto;
        max-width: 500px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-content: center;
        color: ${color[0]};
        border-radius: 5px;
        background-color: ${color[1]};
        padding-left: 50px;
        padding-right: 15px;
        animation: fade-in .3s;
      }
      
      .container.fade-out {
        animation: fade-out .3s forwards;
      }
      
      @keyframes fade-out {
        0% {
          top: 0;
          opacity: 1;
        }
        100% {
          top: -20px;
          opacity: 0;
        }      
      }
      
      @keyframes fade-in {
        0% {
          top: -20px;
          opacity: 0;
        }
        100% {
          top: 0;
          opacity: 1;
        }      
      }
      
      .message {
        line-height: 40px;
        overflow: hidden; 
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 15px;
        width: 25px;
        height: 25px;
        fill: ${color[0]};
      }
    </style>
  `;

  messageContainer.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10000;
  `; // login 界面的 z-index 是 9999。
  messageContainer.classList.add("message-container");
  document.body.insertBefore(messageContainer, document.body.firstChild);
  setTimeout((onclose) => {
    try {
      // 为了防止 onclose 中出现异步操作，需要使用 await 阻塞一下。
      const container = shadowMessage.querySelector('.container');
      container.addEventListener('animationend', () => {
        messageContainer.parentNode.removeChild(messageContainer);
      });
      container.classList.add('fade-out');
      onclose && onclose(); // onclose 不为 undefined 的时才执行 onclose 函数。
    } catch (e) {
      console.log(e);
    }
  }, duration, onclose);
}

const message = `<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 64a448 448 0 110 896.064A448 448 0 01512 64zm67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344zM590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 01-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 017.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"/></svg>`


const success = `<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 64a448 448 0 110 896 448 448 0 010-896zm-55.808 536.384l-99.52-99.584a38.4 38.4 0 10-54.336 54.336l126.72 126.72a38.272 38.272 0 0054.336 0l262.4-262.464a38.4 38.4 0 10-54.272-54.336L456.192 600.384z"/></svg>`;


const warning = `<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 64a448 448 0 110 896 448 448 0 010-896zm0 192a58.432 58.432 0 00-58.24 63.744l23.36 256.384a35.072 35.072 0 0069.76 0l23.296-256.384A58.432 58.432 0 00512 256zm0 512a51.2 51.2 0 100-102.4 51.2 51.2 0 000 102.4z"/></svg>`;

const error = `<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 64a448 448 0 110 896 448 448 0 010-896zm0 393.664L407.936 353.6a38.4 38.4 0 10-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1054.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1054.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 10-54.336-54.336L512 457.664z"/></svg>`;

function getMessageColor(type) {
  switch (type) {
    case "message":
      return ["#909399", "#e9e9eb"];
    case "success":
      return ["#67c23a", "#e1f3d8"];
    case "warning":
      return ["#e6a23c", "#faecd8"];
    default:
      return ["#f56c6c", "#fde2e2"]; // error
  }
}

