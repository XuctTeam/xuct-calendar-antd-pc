/*
 * @Author: Derek Xu
 * @Date: 2023-01-05 10:47:15
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-01-09 14:24:17
 * @FilePath: \xuct-calendar-antd-pc\src\types\group.d.ts
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */
declare namespace GROUP {
  type GroupMember = {
    id: string
    name: string
    memberId: string
    avatar: string
    groupId?: string
    groupName?: string
    groupCreateMemberId?: string
    groupCreateMemberName?: string
    checked?: boolean
  }

  type TreeMember = {
    groupName: string
    groupId: string
    groupCreateMemberId: string
    members: GroupMember[]
  }
}
