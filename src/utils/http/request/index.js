/* eslint-disable */
import getMyConfig from '../config'
import { isFunc, isNum, isPlainObj } from '../../dataType'
import loadingUtil from '../../loading'

export default function (http) {
  http.interceptors.request.use(
    (config) => {
      const myConfig = getMyConfig(http, config)
      const {
        loading,
        setToken,
        getToken,
        baseURL,
        beforeRequest,
        withToken,
        tokenName,
        customTimeout,
        customHeaders,
      } = myConfig
      const { method, data, params } = config
      if (method === 'get' && data && !params) {
        config.params = data
      }
      if (customTimeout) {
        // 设置timeout
        const resTimeout = isFunc(customTimeout) ? customTimeout(config) : customTimeout
        if (isNum(resTimeout)) {
          config.timeout = resTimeout
        }
      }
      // 设置headers
      if (customHeaders) {
        const resHeaders = isFunc(customHeaders) ? customHeaders(config) : customHeaders
        if (isPlainObj(resHeaders)) {
          Object.keys(resHeaders).forEach((key) => {
            config.headers[key] = resHeaders[key]
          })
        }
      }
      // 设置baseURL
      if (baseURL) {
        const resBaseURL = isFunc(baseURL) ? baseURL(config) : baseURL
        if (resBaseURL && config.url.indexOf('http') !== 0) {
          config.url = resBaseURL + config.url
        }
      }
      if (withToken) {
        if (isFunc(setToken)) {
          setToken(config)
        } else {
          /*
           如果没有自定义token的存储规则那就按照默认规则取存储token
           取token的优先级是localStorage-->sessionStorage
            */
          if (!config.headers.Authorization) {
            const token = isFunc(getToken)
              ? getToken()
              : (localStorage && localStorage.getItem(tokenName)) ||
                sessionStorage.getItem(tokenName)
            if (token) {
              config.headers.Authorization = token
            }
          }
        }
      }
      if (isFunc(beforeRequest)) {
        const back = beforeRequest(config)
        if (back) {
          config = back
        }
      }
      if (loading) {
        loadingUtil.start(loading)
      }
      return config
    },
    (error) => {
      loadingUtil.stop()
      return Promise.reject(error)
    }
  )
}
