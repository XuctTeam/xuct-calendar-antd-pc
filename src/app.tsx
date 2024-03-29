/*
 * @Author: Derek Xu
 * @Date: 2022-11-16 22:10:12
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-02-27 11:44:47
 * @FilePath: \xuct-calendar-antd-pc\src\app.tsx
 * @Description:
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import store from '@/cache'
import { NP_AUTH_URL } from '@/constants/url'
import { userInfo } from '@/services/user'
import { Settings as LayoutSettings } from '@ant-design/pro-components'
import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css'
import 'react-slider-verify/dist/index.css'
import { history } from 'umi'
import defaultSettings from '../config/defaultSettings'
import { requestConfig } from './requestConfig'

/**
 * v5.0日期类国际化
 */
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/zh-cn'
import updateLocale from 'dayjs/plugin/updateLocale'
import React from 'react'
import { getDayJsLocal, isChinese } from './utils/calendar'
dayjs.extend(updateLocale)

//const isDev = process.env.NODE_ENV === 'development'
const loginPath = '/user/login'

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>
  currentUser?: USER.CurrentUser
  loading?: boolean
  fetchUserInfo?: () => Promise<USER.CurrentUser | undefined>
}> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = await userInfo({ skipErrorHandler: true })
      return currentUser
    } catch (error) {
      console.log(error)
      //清除登录缓存
      store.removeItem('access_token')
      store.removeItem('refresh_token')
      history.push(loginPath)
    }
    return undefined
  }
  const _authIndex = NP_AUTH_URL.findIndex((noAuthUrl) => noAuthUrl === location.pathname)
  // 如果不是登录页面，执行
  if (_authIndex === -1) {
    const currentUser = await fetchUserInfo()
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings
    }
  }
  return {
    fetchUserInfo,
    settings: defaultSettings
  }
}

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...requestConfig
}

/**
 * @name rootContainer 配置
 * 修改交给 react-dom 渲染时的根组件
 * @doc https://umijs.org/docs/max/request#配置
 */
export const rootContainer = (container: any) => {
  const dataView = store.localGetItem('data_view') || '0'
  if (isChinese()) {
    if (dataView === '0') {
      dayjs.updateLocale(getDayJsLocal(), { weekStart: Number.parseInt(dataView) })
    }
  }
  if (dataView === '1') {
    dayjs.updateLocale(getDayJsLocal(), { weekStart: Number.parseInt(dataView) })
  }
  // const provider = (
  //   <ConfigProvider
  //     theme={{
  //       algorithm: theme.darkAlgorithm
  //     }}
  //   >
  //     {container}
  //   </ConfigProvider>
  // )
  return React.createElement(ConfigProvider, null, container)
}
