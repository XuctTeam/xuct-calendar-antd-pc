/*
 * @Author: Derek Xu
 * @Date: 2022-11-15 09:37:52
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-03-03 13:52:34
 * @FilePath: \xuct-calendar-antd-pc\src\types\api.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
declare namespace API {
  type SmsPublicKey = {
    key: string
    randomStr: string
  }

  type UserNameCatcha = {
    captchaCode: string
    captchaKey: string
  }

  type LoginParams = {
    username?: string
    password?: string
    autoLogin?: boolean
    type?: string
    captcha?: UserNameCatcha
  }

  type LoginPhoneParam = {
    autoLogin?: boolean
    phone?: string
    type?: string
    captcha?: UserNameCatcha
  }

  type LoginResult = {
    access_token: string
    refresh_token: string
  }

  type RuleListItem = {
    key?: number
    disabled?: boolean
    href?: string
    avatar?: string
    name?: string
    owner?: string
    desc?: string
    callNo?: number
    status?: number
    updatedAt?: string
    createdAt?: string
    progress?: number
  }

  type RuleList = {
    data?: RuleListItem[]
    /** 列表的内容总数 */
    total?: number
    success?: boolean
  }

  type FakeCaptcha = {
    code?: number
    status?: string
  }

  type Response = {
    /** 业务约定的错误码 */
    code: number
    /** 业务上的错误信息 */
    message?: string
    /** 业务上的请求是否成功 */
    success?: boolean
    /** 返回数据 */
    data?: any
  }

  type NoticeIconList = {
    data?: NoticeIconItem[]
    /** 列表的内容总数 */
    total?: number
    success?: boolean
  }

  type NoticeIconItemType = 'notification' | 'message' | 'event'

  type NoticeIconItem = {
    id?: string
    extra?: string
    key?: string
    read?: boolean
    avatar?: string
    title?: string
    status?: string
    datetime?: string
    description?: string
    type?: NoticeIconItemType
  }
}
