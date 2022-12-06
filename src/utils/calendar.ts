/*
 * @Author: Derek Xu
 * @Date: 2022-11-22 15:15:51
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-06 18:34:56
 * @FilePath: \xuct-calendar-antd-pc\src\utils\calendar.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import solarLunar from 'solarlunar-es'
import dayjs from 'dayjs'
import { getLocale } from 'umi'
import { RRule, WeekDay, WeekDayEn } from '@/constants'

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
  return isChinese() ? Lanuage.ZH.toLocaleLowerCase() : Lanuage.EN
}

/**
 * 通过日期获取英语中的周几
 * @param week
 * @returns
 */
export const getWeekDay = (week: number) => {
  if (isChinese()) {
    switch (week) {
      case 1:
        return WeekDay.MO
      case 2:
        return WeekDay.TU
      case 3:
        return WeekDay.WE
      case 4:
        return WeekDay.TH
      case 5:
        return WeekDay.FR
      case 6:
        return WeekDay.SA
      default:
        return WeekDay.SU
    }
  }

  switch (week) {
    case 1:
      return WeekDayEn.MO
    case 2:
      return WeekDayEn.TU
    case 3:
      return WeekDayEn.WE
    case 4:
      return WeekDayEn.TH
    case 5:
      return WeekDayEn.FR
    case 6:
      return WeekDayEn.SA
    default:
      return WeekDayEn.SU
  }
}

/**
 * 获取每周循环
 * @param repeatByday
 */
export const formatWeekly = (repeatByday: string | undefined) => {
  if (!repeatByday) return []
  const weeklys = repeatByday.split(',')
  const weekSet = new Set()
  weeklys.forEach((item) => {
    const weeks = item.split(':')
    if (weeks.length !== 2) return
    switch (Number.parseInt(weeks[1])) {
      case 1:
        weekSet.add(RRule.MO)
        break
      case 2:
        weekSet.add(RRule.TU)
        break
      case 3:
        weekSet.add(RRule.WE)
        break
      case 4:
        weekSet.add(RRule.TH)
        break
      case 5:
        weekSet.add(RRule.FR)
        break
      case 6:
        weekSet.add(RRule.SA)
        break
      default:
        weekSet.add(RRule.SU)
    }
  })
  return Array.from(weekSet)
}
