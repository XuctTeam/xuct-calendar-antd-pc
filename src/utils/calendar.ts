/*
 * @Author: Derek Xu
 * @Date: 2022-11-22 15:15:51
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-22 15:20:25
 * @FilePath: \xuct-calendar-antd-pc\src\utils\calendar.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import solarLunar from 'solarlunar-es'
import moment from 'moment'

/**
 *
 * @param date 获取阴历日期
 * @returns
 */
export const lunarDay = (date: Date | string): any => {
  const dayjsDay = moment(date)
  return solarLunar.solar2lunar(dayjsDay.get('year'), dayjsDay.get('month'), dayjsDay.get('date'))
}
