/*
 * @Author: Derek Xu
 * @Date: 2022-11-15 09:37:41
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-03-15 10:18:52
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
export const publicKey = (randomStr: string) => {
  return request<USER.PublicKeyResult>('/ums/api/app/v1/anno/public/key', {
    method: 'GET',
    params: {
      randomStr
    }
  })
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
 * 发送找回密码信息
 * @param phone
 * @param key
 * @param randomStr
 * @returns
 */
export const sendFindPassSmsCode = (phone: string, key: string, randomStr: string) => {
  return request<API.Response>('/ums/api/app/v1/sms/anno/forget', {
    method: 'POST',
    data: { phone, key, randomStr, type: 2 },
    skipErrorHandler: true
  })
}

/**
 * 发送找回密码信息
 * @param email
 * @param key
 * @param randomStr
 * @returns
 */
export const sendFindPassEmailCode = (email: string, key: string, randomStr: string) => {
  return request<API.Response>('/ums/api/app/v1/email/anno/forget', {
    method: 'POST',
    data: { email, key, randomStr, type: 2 },
    skipErrorHandler: true
  })
}

/**
 * 校验用户
 * @param username
 * @param code
 */
export const findPassCheck = (username: string, code: string) => {
  return request<USER.CheckPasResult>('/ums/api/app/v1/member/anno/forget/check', {
    method: 'POST',
    data: { username, code },
    skipErrorHandler: true
  })
}

/**
 * 修改用户密码
 * @param memberId
 * @param password
 * @param code
 * @returns
 */
export const findPassUpdate = (memberId: string, password: string, code: string) => {
  return request<USER.CheckPasResult>('/ums/api/app/v1/member/anno/forget/modify', {
    method: 'POST',
    data: { memberId, password, code }
  })
}

/**
 * 用户名密码登录
 * @param body
 * @param options
 * @returns
 */
const usernameLogin = (body: USER.LoginParams, options?: { [key: string]: any }) => {
  if (body.type === 'account') return _loginByUsername(body, options)
  return _loginByPhone(body)
}

/**
 * 退出登录
 * @returns
 */
export const logout = () => {
  return request<API.Response>('/uaa/token/logout', { method: 'DELETE' })
}

const _loginByUsername = (body: USER.LoginParams, options?: { [key: string]: any }) => {
  const user = encryption({
    data: body,
    key: ENCRYPTION_CODE,
    param: ['password']
  })
  let dataObj = qs.stringify({
    username: user.username,
    password: user.password
  })
  return request<USER.LoginResult>(
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

const _loginByPhone = (body: USER.LoginPhoneParam) => {
  return request<USER.LoginResult>(`/uaa/oauth2/token?grant_type=phone&scope=server&phone=${body.phone}&code=${body.captcha}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    skipErrorHandler: true
  })
}
export { usernameLogin }
