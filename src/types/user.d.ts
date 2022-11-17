/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 09:56:57
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-17 11:24:14
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
}
