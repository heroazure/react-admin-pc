/* eslint-disable */
import http from '../index'
import { handleResponse } from '../response'
import loadingUtil from '../../loading'
import Mock from 'mockjs'

export default function (config) {
  const { mock, mockDelay } = config
  if (mock) {
    return new Promise((resolve, reject) => {
      if (config.loading) {
        loadingUtil.start(config.loading)
      }
      const timer = setTimeout(() => {
        try {
          const res = handleResponse(http, {
            data: Mock.mock(typeof mock === 'function' ? mock(Mock.Random, config) : mock),
            __mock__: true,
            config,
          })
          resolve(res)
        } catch (e) {
          reject(e)
        } finally {
          clearTimeout(timer)
        }
      }, mockDelay || 0)
    })
  }
  return http(config)
}
