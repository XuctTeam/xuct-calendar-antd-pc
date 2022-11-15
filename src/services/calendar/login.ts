/*
 * @Author: Derek Xu
 * @Date: 2022-11-15 09:37:41
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-15 13:48:46
 * @FilePath: \xuct-calendar-antd-pc\src\services\calendar\login.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { request } from '@umijs/max'
import qs from 'qs'

/** 登录接口 POST /api/login/account */
const usernameLogin = async (body: API.LoginParams, options?: { [key: string]: any }) => {
  let dataObj = qs.stringify({ username: body.username, password: body.password })
  return request<API.LoginResult>(`/uaa/oauth2/token?grant_type=app&scope=server&login_type=password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: dataObj,
    ...(options || {})
  })
}

export { usernameLogin }
