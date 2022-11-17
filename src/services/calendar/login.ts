/*
 * @Author: Derek Xu
 * @Date: 2022-11-15 09:37:41
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-17 10:28:47
 * @FilePath: \xuct-calendar-antd-pc\src\services\calendar\login.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import ENCRYPTION_CODE from '@/constants'
import { encryption } from '@/utils'
import { request } from 'umi'
import qs from 'qs'

/**
 * 用户名密码登录
 * @param body
 * @param options
 * @returns
 */
const usernameLogin = async (body: API.LoginParams, options?: { [key: string]: any }) => {
  if (body.type === 'account') return _loginByUsername(body, options)
  return _loginByPhone(body)
}

/**
 * 发送登录短信
 * @param phone
 * @returns
 */
export const sendLoginSmsCode = (phone: string) => {
  return request<API.Response>('/ums/api/app/v1/sms/anno/login', {
    method: 'POST',
    data: { phone, type: 0 }
  })
}

const _loginByUsername = (body: API.LoginParams, options?: { [key: string]: any }) => {
  const user = encryption({
    data: body,
    key: ENCRYPTION_CODE,
    param: ['password']
  })
  let dataObj = qs.stringify({
    username: user.username,
    password: user.password
  })
  return request<API.LoginResult>(`/uaa/oauth2/token?grant_type=app&scope=server&login_type=password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: dataObj,
    ...(options || {})
  })
}

const _loginByPhone = (body: API.LoginPhoneParam) => {
  return request<API.LoginResult>(`/uaa/oauth2/token?grant_type=app&scope=server&phone=${body.mobile}&code=${body.captcha}&login_type=phone`, {})
}

export { usernameLogin }
