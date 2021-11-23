/* eslint-disable */
import { isStr, isFunc, isArr, isObj } from '../dataType'

function hasKey(type, obj, keys) {
  if (!isObj(obj)) {
    return false
  }
  if (isStr(keys)) {
    return Object.prototype.hasOwnProperty.call(obj, keys)
  }
  if (isArr(keys)) {
    const cb = (item) => hasKey(type, obj, item)
    return type === 'some' ? keys.some(cb) : keys.every(cb)
  }
  return false
}
export function hasSomeKey(obj, keys) {
  return hasKey('some', obj, keys)
}
export function hasEveryKey(obj, keys) {
  return hasKey('every', obj, keys)
}
export function resetStore(self, instant) {
  for (let item in instant) {
    const res = instant[item]
    if (!isFunc(res)) {
      self[item] = res
    }
  }
}
export function getFuncVal(func, ...params) {
  if (isFunc(func)) {
    return func(...params)
  }
  return func
}
export { default as getVal } from './getVal'
export { default as setVal } from './setVal'
