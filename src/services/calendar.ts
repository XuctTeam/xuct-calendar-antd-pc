/*
 * @Author: Derek Xu
 * @Date: 2022-12-01 23:45:38
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-11 19:42:25
 * @FilePath: \xuct-calendar-antd-pc\src\services\calendar.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { request } from 'umi'

/**
 * 查询日历列表
 * @returns
 */
export const list = () => {
  return request<CALENDAR.Calendar>('/cms/api/app/v1/calendar/list')
}

/**
 * 更新日历显示状态
 * @param calendarId
 * @param display
 */
export const updateDisplay = (calendarId: string, display: number) => {
  return request<API.Response>('/cms/api/app/v1/calendar/display/status', {
    method: 'post',
    data: {
      calendarId,
      display
    }
  })
}

/**
 * 新增日历
 * 
 * @param calendar 
 */
export const saveCalendar = (calendar: CALENDAR.Calendar) => {
  return request<API.Response>('/cms/api/app/v1/calendar', {
    method: 'post',
    data: calendar
  })
}

/**
 * 更新日历
 * @param calendar 
 * @returns 
 */
export const updateCalendar = (calendar: CALENDAR.Calendar) => { 
  return request<API.Response>('/cms/api/app/v1/calendar', {
    method: 'put',
    data: calendar
  })
}

/**
 * 获取日历详情
 * @param calendarId 
 * @returns 
 */
export const getCalendar = (calendarId: string) => {
   return request<CALENDAR.Calendar>('/cms/api/app/v1/calendar', {
     method: 'get',
     params: {
      id: calendarId
    }
  })
}

/**
 * 根据日历和开始时间查询事件
 * @param calendarId
 * @param start
 * @param end
 */
export const componentsDaysById = (calendarId: string, start: string, end: string) => {
  return request<CALENDAR.DayCompoent>('/cms/api/app/v1/component/list/calendar/days', {
    method: 'get',
    params: {
      calendarId,
      start,
      end
    }
  })
}



