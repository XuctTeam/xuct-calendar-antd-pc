/*
 * @Author: Derek Xu
 * @Date: 2022-12-01 23:45:38
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-01 23:55:06
 * @FilePath: \xuct-calendar-antd-pc\src\services\calendar.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { request } from 'umi'

export const list = () => {
  return request<CALENDAR.Calendar>('/cms/api/app/v1/calendar/list')
}
