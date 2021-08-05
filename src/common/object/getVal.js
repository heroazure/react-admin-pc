import { isStr, isArr } from '../dataType'

export default function getVal(obj, path, defaultValue) {
  if (!obj) {
    return obj || defaultValue
  }
  if (isStr(path)) {
    path = path.replace(/\[/g, '.').replace(/\]/g, '').split('.')
  }
  if (!isArr(path)) {
    return defaultValue
  }
  if (!(path[0] + '').trim()) {
    path.shift()
  }
  const res = path.reduce((prev, next) => (prev || {})[(next + '').trim()], obj)
  return res !== undefined ? res : defaultValue
}
