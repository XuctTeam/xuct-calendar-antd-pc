/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 11:15:17
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-24 11:18:18
 * @FilePath: \xuct-calendar-antd-pc\src\services\user.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { request } from 'umi'

/**
 * 获取当前用户及所有认证方式
 * @returns
 */
export const userInfo = ({ ...ops }) => {
  return request<USER.CurrentUser>(`/ums/api/app/v1/member/info/all`, { ops })
}

/**
 * @description:  修改密码
 * @param {string} password
 * @return {*}
 */
export const updatePassword = (password: string): Promise<any> => {
  return request<API.Response>('/ums/api/app/v1/member/password', {
    method: 'POST',
    data: { password }
  })
}
