/*
 * @Author: Derek Xu
 * @Date: 2022-12-01 23:48:43
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-06 11:58:02
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

  type Component = {
    id: string
    calendarId: string
    creatorMemberId: string
    status: string
    summary: string
    location: string
    description: string
    dtstart: Date
    dtend: Date
    startTime?: string
    endTime?: string
    alarmType: string
    alarmTimes?: string
    fullDay: number
    color?: string
    calendarName?: string
    repeatStatus?: string
    repeatType?: string
    repeatByday?: string
    repeatBymonth?: string
    repeatBymonthday?: string
    repeatInterval?: number
    repeatUntil?: string
    memberIds?: string[]
    attendStatus: number
  }

  type DayCompoent = {
    day: string
    calendarId: string
    components: Array<Component>
  }
}
