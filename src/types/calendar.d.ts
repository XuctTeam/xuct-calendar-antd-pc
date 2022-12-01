/*
 * @Author: Derek Xu
 * @Date: 2022-12-01 23:48:43
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-01 23:53:55
 * @FilePath: \xuct-calendar-antd-pc\src\types\calendar.d.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
declare namespace CALENDAR {
  type Calendar = {
    id: string
    name: string
    color: string
    major: number
    display: number
    checked: boolean
    memberId: string
    calendarId: string
    createMemberId: string
    createMemberName: string
    description: string
    isShare: number
    alarmTime: number
    alarmType: string
  }
}
