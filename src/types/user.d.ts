/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 09:56:57
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-17 09:57:43
 * @FilePath: \xuct-calendar-antd-pc\src\types\user.d.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
declare namespace USER {
  type IUserAuth = {
    memberId: string
    username: string
    nickName: string
    avatar: string
    identityType: string
  }
}
