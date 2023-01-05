/*
 * @Author: Derek Xu
 * @Date: 2023-01-05 10:44:42
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-01-05 10:54:45
 * @FilePath: \xuct-calendar-antd-pc\src\services\group.ts
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */
import { request } from 'umi'

/**
 * 获取所有群组及组内所有成员
 *
 * @returns
 */
export const groupTree = () => {
  return request<GROUP.TreeMember>('/ums/api/app/v1/group/tree')
}
