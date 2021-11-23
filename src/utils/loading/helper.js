/* eslint-disable */
import { isStr, isPlainObj } from '../dataType'
import { loadingTypes } from './types'
export const loadingHiddenClass = 'core-loading-hidden'
export const loadingWarpClass = 'core-loading-warp'
export const loadingMaskClass = 'core-loading-mask'
export const countDataAttr = 'data-count'
export const bodyOverflowHiddenClass = 'core-body-overflow'
export function getConfig(config) {
  let res = null
  const defaultConfig = {
    // loading形状类型
    type: 'circle',
    // 是否显示遮罩
    mask: false,
    // 尺寸大小
    size: null
  }
  if (isPlainObj(config)) {
    res = {
      ...defaultConfig,
      ...config
    }
  }
  if (isStr(config)) {
    res = {
      type: config,
      delay: 0,
      mask: false
    }
  }
  if (res) {
    let { type } = res
    const resType = isStr(type) ? loadingTypes[type.trim()] : 'circle'
    res.type = resType || 'circle'
    return res
  }
  return defaultConfig
}
export function getLoadingWarp() {
  return document.getElementsByClassName(loadingWarpClass)[0]
}
export function overflowHideBody() {
  if (!document.body.classList.contains(bodyOverflowHiddenClass)) {
    document.body.classList.add(bodyOverflowHiddenClass)
  }
}
export function recoverBody() {
  document.body.classList.remove(bodyOverflowHiddenClass)
}
