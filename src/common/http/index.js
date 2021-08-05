import axios from 'axios'
import requestIntercept from './request'
import responseIntercept from './response'
import { setVal } from '../object'
import toast from '../toast'

const http = axios.create()
requestIntercept(http)
responseIntercept(http)

Object.defineProperties(http, {
  setConfig: {
    value(config) {
      const { defaults, ...rest } = config
      http.prototype.myConfig = rest
      Object.keys(defaults || {}).forEach((key) => {
        setVal(http.defaults, key, defaults[key])
      })
    },
  },
  defaultSuccessHandler(res) {
    const { data, status_code, message } = res
    if (status_code === 200) {
      return data
    }
    toast(message)
    return Promise.reject(res)
  },
})

export default http
