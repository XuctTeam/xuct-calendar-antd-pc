/*
 * @Author: Derek Xu
 * @Date: 2022-11-22 15:15:51
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-27 18:44:08
 * @FilePath: \xuct-calendar-antd-pc\src\utils\calendar.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import solarLunar from 'solarlunar-es'
import dayjs from 'dayjs'
import { getLocale, getIntl } from 'umi'
import { RRule, WeekDay, WeekDayEn } from '@/constants'

enum Lanuage {
  ZH = 'zh-CN',

  EN = 'en-US'
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

/**
 * 每月第几个星期几
 * @param date
 */
export const dayWeekInMonth = (date: Date) => {
  const num = Math.ceil(date.getDate() / 7)
  if (isChinese()) {
    return '第' + num + '个' + getWeekDay(dayjs(date).day())
  }
  const week = dayjs(date).format('ddd')
  switch (num) {
    case 1:
      return '1st ' + week
    case 2:
      return '2nd ' + week
    case 3:
      return '3rd ' + week
    case 4:
      return '4th ' + week
    case 5:
      return 'The 5th ' + week
  }
  return ''
}

export const dayInYear = (date: Date) => {
  if (isChinese()) {
    return dayjs(date).format('MM月DD日')
  }
  return dayjs(date).format('MMM DD')
}

/**
 * 格式化重复事件
 * @param repeatType
 * @param repeatByday
 * @param repeatBymonth
 * @param repeatBymonthday
 */
export const formatRepeatTime = (
  repeatType: string,
  repeatStatus: string,
  repeatByday: string,
  repeatBymonth: string,
  repeatBymonthday: string,
  repeatInterval: number
): string => {
  const init = getIntl()
  switch (repeatType) {
    case 'DAILY':
      return repeatInterval === 1
        ? init.formatMessage({ id: 'pages.component.add.repeat.everyday' })
        : `${
            init.formatMessage({ id: 'pages.component.repeat.each' }) +
            ' ' +
            repeatInterval +
            ' ' +
            init.formatMessage({ id: 'pages.component.repeat.frequency.day' })
          }`
    case 'WEEKLY':
      return _formatWeeklyText(repeatInterval, repeatStatus, repeatByday)
    case 'MONTHLY':
      return _formatMonthlyText(repeatInterval, repeatStatus, repeatByday, repeatBymonthday)
    default:
      return _formatYearlyText(repeatInterval, repeatBymonth, repeatBymonthday)
  }
}
/**
 * 格式化星期显示
 * @param repeatInterval
 * @param repeatStatus
 * @param repeatByday
 * @returns
 */
const _formatWeeklyText = (repeatInterval: number, repeatStatus: string, repeatByday: string): string => {
  const init = getIntl()
  switch (repeatStatus) {
    case '2':
      return init.formatMessage({ id: 'pages.component.add.repeat.week.mo.fr' })
    case '3':
      return init.formatMessage({ id: 'pages.component.add.repeat.week.st.su' })
    case '4':
      return init.formatMessage({ id: 'pages.component.add.repeat.week.st' })
    default:
      break
  }

  const weeks = repeatByday.split(',').map((i: string) => {
    const week: string | undefined = i.split(':')[1]
    if (!week) return
    return getWeekDay(Number.parseInt(week))
  })
  return (
    (repeatInterval === 1
      ? init.formatMessage({ id: 'pages.component.add.repeat.week.st' })
      : init.formatMessage({ id: 'pages.component.repeat.each' }) + repeatInterval + init.formatMessage({ id: 'pages.component.repeat.frequency.week' })) +
    weeks.join(',')
  )
}

/**
 * 格式化月显示
 * @param repeatInterval
 * @param repeatStatus
 * @param repeatBymonth
 * @param repeatBymonthday
 * @param selectedDate
 */
const _formatMonthlyText = (repeatInterval: number, repeatStatus: string, repeatByday: string, repeatBymonthday: string): string => {
  const init = getIntl()
  const chinese = isChinese()
  let dayText = '日'
  if (!chinese) {
    switch (repeatBymonthday) {
      case '1':
        dayText = '1st'
      case '2':
        dayText = '2nd'
      case '3':
        dayText = '3rd'
      default:
        dayText = repeatBymonthday + 'th'
    }
  }
  if (repeatStatus === '5') {
    return init.formatMessage({ id: 'pages.component.add.repeat.every.month' }) + '（' + repeatBymonthday + '）'
  }
  if (repeatStatus === '6') {
    const monthDays = repeatByday ? repeatByday.split(':') : []
    if (!monthDays[1]) return ''
    return '每月（第' + monthDays[0] + '个' + getWeekDay(Number.parseInt(monthDays[1])) + ')'
  }
  if (repeatBymonthday) {
    if (repeatInterval === 1) {
      return init.formatMessage({ id: 'pages.component.add.repeat.every.month' }) + '（' + dayText + '）'
    }
    return (
      init.formatMessage({ id: 'pages.component.repeat.each' }) +
      ' ' +
      repeatInterval +
      ' ' +
      init.formatMessage({ id: 'pages.component.repeat.frequency.month' }) +
      '（' +
      dayText +
      '）'
    )
  }
  const monthDays = repeatByday ? repeatByday.split(':') : []
  if (!monthDays[1]) return ''
  if (repeatInterval === 1) {
    return '每月（第' + monthDays[0] + '个' + monthDays[1] + ')'
  }
  return '每' + repeatInterval + '月（第' + monthDays[0] + '个' + getWeekDay(Number.parseInt(monthDays[1])) + ')'
}

/**
 * 格式化年重复
 * @param repeatInterval
 * @param repeatBymonth
 * @param repeatBymonthday
 */
const _formatYearlyText = (repeatInterval: number, repeatBymonth: string, repeatBymonthday: string) => {
  const init = getIntl()
  const chinese = isChinese()
  let yearText
  if (chinese) {
    yearText =
      '（' +
      repeatBymonth +
      init.formatMessage({ id: 'pages.component.repeat.frequency.month' }) +
      repeatBymonthday +
      init.formatMessage({ id: 'pages.component.repeat.frequency.daily' }) +
      '）'
  } else {
    let dayText
    switch (repeatBymonthday) {
      case '1':
        dayText = '1st'
      case '2':
        dayText = '2nd'
      case '3':
        dayText = '3rd'
      default:
        dayText = repeatBymonthday + 'th'
    }
    switch (repeatBymonth) {
      case '1':
        yearText = '（January ' + dayText + '）'
      case '2':
        yearText = '（February  ' + dayText + '）'
      case '3':
        yearText = '（March  ' + dayText + '）'
      case '4':
        yearText = '（April ' + dayText + '）'
      case '5':
        yearText = '（May ' + dayText + '）'
      case '6':
        yearText = '（June ' + dayText + '）'
      case '7':
        yearText = '（July ' + dayText + '）'
      case '8':
        yearText = '（August ' + dayText + '）'
      case '9':
        yearText = '（September ' + dayText + '）'
      case '10':
        yearText = '（October ' + dayText + '）'
      case '11':
        yearText = '（November ' + dayText + '）'
      case '12':
        yearText = '（December ' + dayText + '）'
    }
  }

  if (repeatInterval === 1) {
    return init.formatMessage({ id: 'pages.component.repeat.every.year' }) + yearText
  }
  return (
    init.formatMessage({ id: 'pages.component.repeat.each' }) + repeatInterval + init.formatMessage({ id: 'pages.component.repeat.frequency.year' }) + yearText
  )
}

/**
 * 格式化不同时间区间
 * @param type
 * @param fullDay
 * @param date
 * @returns
 */
export const formatDifferentDayTime = (type: number, fullDay: number, date: Date): string => {
  const chinese = isChinese()
  if (chinese) {
    if (type === 1) {
      return dayjs(date).format(fullDay === 0 ? 'YYYY年MM月DD日 HH:mm' : 'YYYY年MM月DD日') + ' 开始'
    }
    return dayjs(date).format(fullDay === 0 ? 'YYYY年MM月DD日 HH:mm' : 'YYYY年MM月DD日') + ' 结束'
  }
  if (type === 1) {
    return dayjs(date).format(fullDay === 0 ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD日') + ' start'
  }
  return dayjs(date).format(fullDay === 0 ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD日') + ' end'
}

/**
 * 格式化相同时间区间
 * @param fullDay
 * @param dtstart
 * @param dtend
 * @returns
 */
export const formatSameDayTime = (fullDay: number, dtstart: Date, dtend: Date): string => {
  const chinese = isChinese()
  const day: string = dayjs(dtstart).format(chinese ? 'YYYY年MM月DD日' : 'YYYY-MM-DD') + '(' + getWeekDay(dayjs(dtend).get('day')) + ')'
  if (fullDay === 1) return day
  return day + dayjs(dtstart).format('HH:mm') + '-' + dayjs(dtend).format('HH:mm')
}

/**
 * 格式化相同时间区间的分、秒
 * @returns
 */
export const formateSameDayDuration = (fullDay: number, dtstart: Date, dtend: Date): string => {
  const init = getIntl()
  const minText = init.formatMessage({ id: 'pages.component.repeat.min' })
  if (fullDay === 1) return init.formatMessage({ id: 'pages.compoennt.repeat.full.day' })
  let days = dayjs(dtend)
  let daye = dayjs(dtstart)
  const day1 = days.format('YYYY-MM-DD') + ' ' + days.hour() + ':' + days.minute() + ':00'
  const day2 = daye.format('YYYY-MM-DD') + ' ' + daye.hour() + ':' + daye.minute() + ':00'
  days = dayjs(day1)
  daye = dayjs(day2)
  const diff: number = days.diff(daye, 'minute')
  if (diff === 0) return ''
  if (diff < 60 && diff > 0) return diff + minText
  if (diff === 60) return init.formatMessage({ id: 'pages.component.repeat.one.hour' })
  const hour = parseInt(diff / 60 + '')
  return hour + init.formatMessage({ id: 'pages.component.repeat.hour' }) + (diff - hour * 60 > 0 ? diff - hour * 60 : diff) + minText
}
