/*
 * @Author: Derek Xu
 * @Date: 2022-11-22 15:15:51
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-25 17:57:08
 * @FilePath: \xuct-calendar-antd-pc\src\utils\calendar.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import solarLunar from 'solarlunar-es'
import dayjs from 'dayjs'
import { getLocale } from 'umi'

enum Lanuage {
  ZH = 'zh-CN',
  
  EN = 'en'
}

/**
 * @param date 获取阴历日期
 * @returns
 */
export const lunarDay = (date: Date | string): any => {
  const dayjsDay = dayjs(date)
  return solarLunar.solar2lunar(dayjsDay.get('year'), dayjsDay.get('month') + 1, dayjsDay.get('date'))
}

/**
 * 判断是否为中文
 * @returns 
 */
export const isChinese = () => {
   return getLocale() == Lanuage.ZH
}

/**
 * 获取dayjs的国际化语言
 * @returns 
 */
export const getDayJsLocal = () => {
   return isChinese() ? 'zh-cn' : 'en'
}

/**
 * 通过日期获取英语中的周几
 * @param week 
 * @returns 
 */
export const getEnglishWeek = (week: number) => {
  switch (week) {
    case 0:
      return 'Sun'
    case 1:
      return 'Mon'
    case 2:
      return 'Tue'
    case 3:
      return 'Wed'
    case 4:
      return 'Thu'
    case 5:
      return 'Fri'
    case 6:
      return 'Sat'
   }
}


