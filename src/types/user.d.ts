/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 09:56:57
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-03-15 09:53:36
 * @FilePath: \xuct-calendar-antd-pc\src\types\user.d.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
declare namespace USER {
  type CurrentUser = {
    member: Userinfo
    auths: UserAuth[]
  }

  type Userinfo = {
    id: string
    name: string
    avatar?: string
    timeZone: string
    organization: string
  }

  type UserAuth = {
    memberId: string
    username: string
    nickName: string
    avatar: string
    identityType: string
  }

  type PublicKeyResult = {
    key: string
    randomStr: string
  }

  type CatchaResult = {
    captchaCode: string
    captchaKey: string
  }

  type CheckPasResult = {
    memberId: string
    code: string
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
}
