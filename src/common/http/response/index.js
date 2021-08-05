/* eslint-disable */
import getMyConfig from '../config'
import { isFunc, isStr } from '../../dataType'
import loadingUtil from '../../loading'
import toast from '../../toast'

export function handleResponse(http, res) {
  const { data, config, __mock__ } = res
  const myConfig = getMyConfig(http, config)
  const { loading, success } = myConfig
  if (loading) {
    loadingUtil.stop()
  }
  if (__mock__) {
    return data
  }
  if (isFunc(success)) {
    return success(data, res)
  }
  return data
}
function getErrorMsg(msg) {
  if (!isStr(msg) || msg.length > 40) {
    return '网络请求失败'
  }
  return msg
}
export default function (http) {
  http.interceptors.response.use(
    (res) => handleResponse(http, res),
    (err) => {
      const { error } = getMyConfig(http, err.config)
      if (isFunc(error)) {
        error(err.response, err)
      } else {
        toast(getErrorMsg(err.message))
      }
      loadingUtil.stop()
      return Promise.reject(err.response)
    }
  )
}
