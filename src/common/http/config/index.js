/* eslint-disable */
import toast from '../../toast'
// 可以再次单独配置的属性
const defaultProps = {
  loading: false,
  success: null,
  baseURL: null,
  tokenName: 'Authorization',
  withToken: true,
  error: null,
  beforeRequest: null,
  mock: false,
  original: false,
  customTimeout: 0,
  customHeaders: null,
}
export default function (http, config = {}) {
  const myConfig = http.prototype.myConfig || {}
  const scopeConfigObj = {}
  Object.keys(defaultProps).forEach((key) => {
    if (config.hasOwnProperty(key)) {
      scopeConfigObj[key] = config[key]
    } else {
      scopeConfigObj[key] = myConfig.hasOwnProperty(key) ? myConfig[key] : defaultProps[key]
    }
  })
  return {
    ...myConfig,
    ...scopeConfigObj,
  }
}
