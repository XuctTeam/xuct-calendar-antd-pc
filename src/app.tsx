/*
 * @Author: Derek Xu
 * @Date: 2022-11-16 22:10:12
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-17 08:49:31
 * @FilePath: \xuct-calendar-antd-pc\src\app.tsx
 * @Description:
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { notification } from 'antd'
import { RequestConfig, history, getIntl } from 'umi'
import { SECURITY_OAUTH2_IGNORE_URL } from '@/constants/url'
import sessionStore from '@/cache'
import defaultSettings from '../config/defaultSettings'
import { Settings as LayoutSettings } from '@ant-design/pro-components'

const isDev = process.env.NODE_ENV === 'development'
const loginPath = '/user/login'

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>
  currentUser?: API.CurrentUser
  loading?: boolean
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>
}> {
  const fetchUserInfo = async () => {
    try {
      // const msg = await queryCurrentUser({
      //   skipErrorHandler: true
      // })
      //return msg.data
    } catch (error) {
      history.push(loginPath)
    }
    return undefined
  }
  // 如果不是登录页面，执行
  if (window.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo()
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    }
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  }
}

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */

/** 请求拦截 */
const requestInterceptor = (url: any, options: any): any => {
  const match = SECURITY_OAUTH2_IGNORE_URL.some(
    (item) => url.indexOf(item) > -1,
  )
  if (!match) {
    /* 非登录接口都要通过token请求 */
    if (!url.includes('/oauth2/token')) {
      options.headers['Authorization'] = sessionStore.getItem('accessToken')
    } else {
      options.headers['Authorization'] = 'Basic ' + `${APP_CLIENT}`
    }
  }
  return {
    url: url,
    options: { ...options },
  }
}
/** 响应拦截 */
const responseInterceptors = (response: any): any => {
  debugger
  if (response.status !== 200) {
    switch (response.status) {
      case 401:
        notification.warn({
          message: '登录超时，请重新登陆!',
        })
        history.push('/login')
        break
    }
  }
  return response
}
/** 异常处理程序 */
const codeMessage: any = {
  400: 'code.message.bad.request',
  401: 'code.message.unauthorized',
  428: 'code.message.request.params.error',
  404: 'code.message.not.found',
  500: 'code.message.service.error',
  502: 'code.message.getway.error',
  503: 'code.message.server.maintain',
  504: 'code.message.gateway.timeout',
}

const errorThrower = (res: any) => {
  debugger
}

const errorHandler = (error: any, opts: any) => {
  if (opts?.skipErrorHandler) return
  const { response, config } = error
  if (response && response.status) {
    let { message } = response?.data
    if (!message) {
      const initMsgCode = codeMessage[response.status]
      message = initMsgCode
        ? getIntl().formatMessage({ id: initMsgCode })
        : response.statusText
    }
    const { status } = response
    notification.error({
      message:
        getIntl().formatMessage({ id: 'code.message.error' }) +
        ` ${status}: ${config?.url}`,
      description: message,
    })
  } else if (!response) {
    notification.error({
      description: getIntl().formatMessage({
        id: 'code.message.network.eror.describe',
      }),
      message: getIntl().formatMessage({ id: 'code.message.network.eror' }),
    })
  } else {
    // 发送请求时出了点问题
    notification.error({
      message: getIntl().formatMessage({ id: 'code.message.network.eror' }),
    })
  }
  return response
}

// request运行时配置
export const request: RequestConfig = {
  timeout: 3000, //请求超时时间
  baseURL: `${API_URL}`,
  // prefix: process.env.NODE_ENV === "production" ? config.baseurl :'api/', // 统一的请求前缀

  // 自定义端口规范(可以对后端返回的数据格式按照我们的需求进行处理)
  errorConfig: {
    errorThrower: errorThrower,
    errorHandler: errorHandler,
  },
  //请求错误处理
  requestInterceptors: [requestInterceptor], //请求拦截
  responseInterceptors: [responseInterceptors], //响应拦截
}
