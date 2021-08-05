import { isStr, isPlainObj } from '../dataType'
import './style.less'

/* eslint-disable */
function destroyToast() {
  const toastNode = document.getElementsByClassName('core-toast')[0]
  if (toastNode) {
    document.body.removeChild(toastNode)
  }
}

function combineConfig(msg, config) {
  let option = null
  if (isPlainObj(msg)) {
    option = msg
  } else if (isStr(msg)) {
    option = { text: msg }
    if (isPlainObj(config)) {
      option = {
        ...config,
        text: msg,
      }
    }
  }
  return option || {}
}
export default function toast(msg, config) {
  const option = combineConfig(msg, config)
  const { text = '系统异常', title = '提示', okText = '确定' } = option || {}
  let toastNode = document.getElementsByClassName('core-toast')[0]
  if (toastNode) {
    toastNode.querySelector('.toast-text').innerText = text
  } else {
    toastNode = document.createElement('div')
    toastNode.innerHTML = `
      <div class="toast-mask" style="z-index: 9998;"></div>
      <div class="toast-content" style="z-index: 9999;">
        <div class="toast-title">${title}</div>
        <div class="toast-text">${text}</div>
        <div class="toast-ok-but">${okText}</div>
      </div> `
    toastNode.className = 'core-toast'
    toastNode.querySelector('.toast-ok-but').onclick = () => {
      destroyToast()
    }
    toastNode.querySelector('.toast-mask').onclick = () => {
      destroyToast()
    }
    document.body.appendChild(toastNode)
  }
}
Object.defineProperties(toast, {
  destroy: {
    value: destroyToast,
  },
})
