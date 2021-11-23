import { isArr, isStr } from '../dataType'

export default function setVal(obj, path, value) {
  let arr
  let key
  if (!obj) {
    obj = {}
  }
  if (isStr(path)) {
    path = path.replace(/\[/g, '.').replace(/\]/g, '').split('.')
  }
  if (isArr(path) && path.length > 0) {
    if (!(path[0] + '').trim()) {
      path.shift()
    }
    arr = path
    key = (arr[0] + '').replace(/(\[|\])/g, '')
    if (arr.length > 1) {
      arr.shift()
      obj[key] = setVal(obj[key], arr, value)
    } else {
      obj[key] = value
    }
  }
  return obj
}
