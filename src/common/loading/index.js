/* eslint-disable */
import {
  getConfig,
  getLoadingWarp,
  overflowHideBody,
  recoverBody,
  countDataAttr,
  loadingWarpClass,
  loadingMaskClass,
  loadingHiddenClass,
} from './helper'
import { loadingTypes, getLoadingContent } from './types'
import './style.less'
import './ani.less'

function loading(config) {
  // 只有false时才停止loading
  if (config === false) {
    stop()
  } else {
    start(config)
  }
}
function getLoadingCount(loadingWarp) {
  return +loadingWarp.getAttribute(countDataAttr) || 0
}
function setLoadingCount(loadingWarp, count) {
  loadingWarp.setAttribute(countDataAttr, count + '')
}
function setLoadingMask(loadingWarp, mask) {
  let maskDom = loadingWarp.getElementsByClassName(loadingMaskClass)[0]
  if (mask) {
    if (!maskDom) {
      // 创建mask
      maskDom = document.createElement('div')
      maskDom.className = loadingMaskClass
      loadingWarp.appendChild(maskDom)
    }
  } else {
    if (maskDom) {
      // 移除mask
      loadingWarp.removeChild(maskDom)
    }
  }
}
function setLoadingContent(loadingWarp, option) {
  const { type } = option || {}
  const childNodes = loadingWarp.childNodes
  const content = Array.prototype.find.call(childNodes, (item) => {
    // loadingWarp中除了mask就是content
    return item.className !== loadingMaskClass
  })
  let newContent = loadingWarp.getElementsByClassName(`sk-${type}`)[0]
  if (content !== newContent) {
    loadingWarp.removeChild(content)
    const temporary = document.createElement('div')
    temporary.innerHTML = getLoadingContent(option)
    loadingWarp.appendChild(temporary.childNodes[0])
  }
}
function start(option) {
  const _option = getConfig(option)
  const { mask } = _option
  let loadingWarp = getLoadingWarp()
  if (loadingWarp) {
    loadingWarp.classList.remove(loadingHiddenClass)
    const count = getLoadingCount(loadingWarp)
    setLoadingCount(loadingWarp, count + 1)
    setLoadingMask(loadingWarp, mask)
    setLoadingContent(loadingWarp, _option)
  } else {
    loadingWarp = document.createElement('div')
    loadingWarp.className = loadingWarpClass
    let innerHTML = ''
    if (mask) {
      innerHTML += `<div class="${loadingMaskClass}"></div>`
    }
    const loadingContent = getLoadingContent(_option)
    loadingWarp.innerHTML = innerHTML + loadingContent
    setLoadingCount(loadingWarp, 1)
    overflowHideBody()
    document.body.appendChild(loadingWarp)
  }
}
function stop() {
  const loadingWarp = getLoadingWarp()
  if (loadingWarp && !loadingWarp.classList.contains(loadingHiddenClass)) {
    const count = getLoadingCount(loadingWarp)
    // 次数减一
    const surplus = count - 1
    if (surplus <= 0) {
      loadingWarp.classList.add(loadingHiddenClass)
      const timer = setTimeout(() => {
        clearTimeout(timer)
        /*
         在这500ms内重新调用了start之后，
         不加控制照样会被销毁
          */
        if (loadingWarp && loadingWarp.classList.contains(loadingHiddenClass)) {
          destroy()
        }
      }, 500)
    }
    setLoadingCount(loadingWarp, surplus)
  }
}
function destroy() {
  const loadingWarp = getLoadingWarp()
  if (loadingWarp) {
    document.body.removeChild(loadingWarp)
    recoverBody()
  }
}

Object.defineProperties(loading, {
  start: { value: start },
  stop: { value: stop },
  destroy: {
    value: destroy,
  },
  TYPES: {
    value: loadingTypes,
  },
})
export { loadingTypes }
export default loading
