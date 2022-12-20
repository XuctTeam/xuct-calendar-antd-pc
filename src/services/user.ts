/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 11:15:17
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-19 20:07:32
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
export const updatePassword = (password: string) => {
  return request<API.Response>('/ums/api/app/v1/member/password', {
    method: 'POST',
    data: { password }
  })
}

/**
 * @description: 修改姓名
 * @param name
 * @returns
 */
export const modifyName = (name: string) => {
  return request<API.Response>('/ums/api/app/v1/member/name', {
    method: 'POST',
    data: { name }
  })
}

/**
 * @description: 修改头像
 * @param avatar 
 * @returns 
 */
export const modifyAvatar = (avatar: string) => {
  return request<API.Response>('/ums/api/app/v1/member/avatar', {
    method: 'POST',
    data: { avatar }
  })
}
