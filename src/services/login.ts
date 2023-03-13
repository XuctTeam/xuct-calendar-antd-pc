/*
 * @Author: Derek Xu
 * @Date: 2022-11-15 09:37:41
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-03-13 14:43:40
 * @FilePath: \xuct-calendar-antd-pc\src\services\login.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { ENCRYPTION_CODE } from '@/constants'
import { encryption } from '@/utils'
import qs from 'qs'
import { request } from 'umi'

/**
 * 短信验证的publicKey
 * @param phone
 * @returns
 */
export const smsPublicKey = (randomStr: string) => {
  return request<API.SmsPublicKey>('/ums/api/app/v1/anno/public/key', {
    method: 'get',
    params: {
      randomStr
    }
  })
}

/**
 * 用户名密码登录
 * @param body
 * @param options
 * @returns
 */
const usernameLogin = (body: API.LoginParams, options?: { [key: string]: any }) => {
  if (body.type === 'account') return _loginByUsername(body, options)
  return _loginByPhone(body)
}

/**
 * 发送登录短信
 * @param phone
 * @returns
 */
export const sendLoginSmsCode = (phone: string, key: string, randomStr: string) => {
  return request<API.Response>('/ums/api/app/v1/sms/anno/login', {
    method: 'POST',
    data: { phone, key, randomStr, type: 0 }
  })
}

/**
 * 退出登录
 * @returns
 */
export const logout = () => {
  return request<API.Response>('/uaa/token/logout', { method: 'DELETE' })
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
  return request<API.LoginResult>(
    `/uaa/oauth2/token?grant_type=password&scope=server&code=${body.captcha?.captchaCode}&randomStr=${body.captcha?.captchaKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      skipErrorHandler: true,
      data: dataObj,
      ...(options || {})
    }
  )
}

const _loginByPhone = (body: API.LoginPhoneParam) => {
  return request<API.LoginResult>(`/uaa/oauth2/token?grant_type=phone&scope=server&phone=${body.phone}&code=${body.captcha}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    skipErrorHandler: true
  })
}
export { usernameLogin }
