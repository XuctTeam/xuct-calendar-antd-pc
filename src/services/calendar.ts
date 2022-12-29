/*
 * @Author: Derek Xu
 * @Date: 2022-12-01 23:45:38
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-29 09:50:13
 * @FilePath: \xuct-calendar-antd-pc\src\services\calendar.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { request } from 'umi'

/**
 * @description: 查询日历列表
 * @returns
 */
export const list = () => {
  return request<CALENDAR.Calendar>('/cms/api/app/v1/calendar/list')
}

/**
 * @description: 更新日历显示状态
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
 * @description: 新增日历
 * @param calendar
 */
export const saveCalendar = (calendar: CALENDAR.Calendar) => {
  return request<API.Response>('/cms/api/app/v1/calendar', {
    method: 'post',
    data: calendar
  })
}

/**
 * @description: 更新日历
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
 * @description: 获取日历详情
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
 * @description: 删除日历
 * @param id
 * @returns
 */
export const deleteCalendar = (calendarId: string) => {
  return request<API.Response>('/cms/api/app/v1/calendar', {
    method: 'delete',
    params: {
      calendarId
    }
  })
}

/**
 * @description: 根据日历和开始时间查询事件
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

/**
 * @description: 新增或修改事件
 * @param component
 */
export const saveOrUpdateComponent = (component: CALENDAR.Component) => {
  return request<API.Response>('/cms/api/app/v1/component', {
    data: component,
    method: 'post'
  })
}

/**
 * @description: 通过ID查询事件
 * @param id
 */
export const getComponentById = (id: string) => {
  return request<CALENDAR.Component>(`/cms/api/app/v1/component/${id}`)
}

/**
 * @description: 通过事件查询参会人
 * @param {string} createMemberId
 * @param {string} componentId
 * @return {*}
 * @author: Derek Xu
 */
export const queryComponentMembers = (createMemberId: string, componentId: string) => {
  return request<CALENDAR.Attend>('/cms/api/app/v1/component/attend/member', {
    method: 'get',
    params: { createMemberId, componentId }
  })
}

/**
 * 删除事项
 * @param componentId
 * @returns
 */
export const deleteComponent = (componentId: string) => {
  return request<API.Response>(`/cms/api/app/v1/component/${componentId}`, {
    method: 'delete'
  })
}
