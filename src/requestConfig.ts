import { notification } from 'antd'
import { getIntl, RequestConfig } from 'umi'
import { SECURITY_OAUTH2_IGNORE_URL } from './constants/url'
import store from '@/cache'

/** 请求拦截 */
const requestInterceptor = (url: any, options: any): any => {
  const match = SECURITY_OAUTH2_IGNORE_URL.some((item) => url.indexOf(item) > -1)
  if (!match) {
    /* 非登录接口都要通过token请求 */
    if (!url.includes('/oauth2/token')) {
      options.headers['Authorization'] = store.getItem('access_token')
    } else {
      options.headers['Authorization'] = 'Basic ' + `${APP_CLIENT}`
    }
  }
  return {
    url: url,
    options: { ...options }
  }
}
/** 响应拦截 */
const responseInterceptors = (response: any): any => {
  const { config, data } = response
  const { url } = config
  if (url && url.includes('/oauth2/token')) return response
  if (!data) return response
  const { code } = data
  if (code === 200) return data
  return response
}
/** 异常处理程序 */
const codeMessage: any = {
  400: 'code.message.bad.request',
  401: 'code.message.unauthorized',
  424: 'code.message.token.expire',
  428: 'code.message.request.params.error',
  404: 'code.message.not.found',
  500: 'code.message.service.error',
  502: 'code.message.getway.error',
  503: 'code.message.server.maintain',
  504: 'code.message.gateway.timeout'
}

const errorThrower = (res: any) => {
  const { code, message, success } = res
  if (!success) {
    const error: any = new Error(message)
    error.name = 'BizError'
    error.info = { code, message }
    throw error // 抛出自制的错误
  }
}

const errorHandler = (error: any, opts: any) => {
  if (opts?.skipErrorHandler) throw error
  if (error.name === 'BizError') {
    const { code, message } = error.info
    if (code) {
      notification.error({
        message: getIntl().formatMessage({ id: 'pages.modal.commit.title' }),
        description: `【${code}】: ` + message
      })
    }
    return
  }
  const { response, config } = error
  if (response && response.status) {
    const { url } = config
    const { status } = response
    let message
    if (url && url.includes('/oauth2/token')) {
      if (status === 401) {
        message = response?.data.message
      } else {
        message = getIntl().formatMessage({ id: codeMessage[status] })
      }
    } else {
      const initMsgCode = codeMessage[response.status]
      message = initMsgCode ? getIntl().formatMessage({ id: initMsgCode }) : response.statusText
    }
    notification.error({
      message: getIntl().formatMessage({ id: 'code.message.error' }) + ` ${status}: ${config?.url}`,
      description: message
    })
  } else if (!response) {
    notification.error({
      description: getIntl().formatMessage({
        id: 'code.message.network.eror.describe'
      }),
      message: getIntl().formatMessage({ id: 'code.message.network.eror' })
    })
  } else {
    // 发送请求时出了点问题
    notification.error({
      message: getIntl().formatMessage({ id: 'code.message.network.eror' })
    })
  }
}

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const requestConfig: RequestConfig = {
  timeout: 3000, //请求超时时间
  baseURL: `${API_URL}`,
  // prefix: process.env.NODE_ENV === "production" ? config.baseurl :'notification/', // 统一的请求前缀

  // 自定义端口规范(可以对后端返回的数据格式按照我们的需求进行处理)
  errorConfig: {
    errorThrower: errorThrower,
    errorHandler: errorHandler
  },
  //请求错误处理
  requestInterceptors: [requestInterceptor], //请求拦截
  responseInterceptors: [responseInterceptors] //响应拦截
}
