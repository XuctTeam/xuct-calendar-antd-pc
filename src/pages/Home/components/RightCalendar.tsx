/*
 * @Author: Derek Xu
 * @Date: 2022-11-23 09:39:43
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-06 18:36:26
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\RightCalendar.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */

import FullCalendar from '@fullcalendar/react'
import React, { useEffect, useState } from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import rrulePlugin from '@fullcalendar/rrule'
import { isChinese, lunarDay } from '@/utils/calendar'
import zhCncale from '@fullcalendar/core/locales/zh-cn'
import { getIntl } from 'umi'
import { getWeekDay, formatWeekly } from '@/utils/calendar'
import dayjs from 'dayjs'
import { RRule } from '@/constants'

interface IPageOption {
  centerHeight: number
  selectDay: string
  dataView: string
  lunarView: string
  calendars: CALENDAR.Calendar[]
  components: CALENDAR.DayCompoent[]
  fullCalendarDayChage: (ty: number) => void
  fullCalendarDateClick: (data: any) => void
}

const RightCalendar = React.forwardRef<any, IPageOption>((props, ref: any) => {
  const { centerHeight, selectDay, dataView, lunarView, calendars, components } = props
  const { fullCalendarDayChage, fullCalendarDateClick } = props
  const disableLunarView = !isChinese() || lunarView === '0'
  const [events, setEvents] = useState<any[]>([])

  const calendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin],
    headerToolbar: {
      // 上一年，上一月，下一月，下一年 今天(逗号为紧相邻，空格为有间隙，不写哪个就不展示哪个按钮)
      left: 'customLeft,customRight customtoday',
      // 默认显示当前年月
      center: 'title',
      // 右侧月 周 天切换按钮
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    views: {
      dayGridMonth: {
        displayEventTime: false, //是否显示时间，
        dayCellContent(item: any) {
          return dayCellContent(item)
        }
      },
      timeGridWeek: {
        dayHeaderContent(item: any) {
          return dayHeaderContent(item)
        }
      },
      timeGridDay: {
        dayHeaderContent(item: any) {
          return dayHeaderContent(item)
        }
      }
    },
    selectable: true
  }

  useEffect(() => {
    fillEvents()
  }, [calendars, components])

  const getFullCustomButtons = () => {
    return {
      customLeft: {
        text: '<',
        click: () => fullCalendarDayChage(0)
      },
      customtoday: {
        text: getIntl().formatMessage({ id: 'pages.calendar.today.button' }),
        click: () => fullCalendarDayChage(2)
      },
      customRight: {
        text: '>',
        click: () => fullCalendarDayChage(1)
      }
    }
  }

  const dayCellContent = (item: any) => {
    if (disableLunarView) {
      const _dayjs = dayjs(item.date)
      return { html: `<p><label>${_dayjs.date()}</label></p>` }
    }
    let _dateF = lunarDay(item.date)
    return { html: `<p><label>${_dateF.cDay}</label><span>${_dateF.dayCn}</span></p>` }
  }

  const dayHeaderContent = (item: any) => {
    if (disableLunarView) {
      const _dayjs = dayjs(item.date)
      return { html: `<label>${_dayjs.date()}</label></br><span>${getWeekDay(_dayjs.day())}</span>` }
    }
    let _dateF = lunarDay(item.date)
    return { html: `<label>${_dateF.cDay}</label><span>${_dateF.dayCn}</span><br/><label>${_dateF.ncWeek}</label>` }
  }

  const fillEvents = () => {
    if (calendars.length === 0 || components.length === 0) return
    const displayCalendars = calendars.filter((item) => item.display === 1)
    const componentMap = new Map()
    components.forEach((dayComp) => {
      dayComp.components.forEach((comp) => {
        const _calendar = displayCalendars.find((item) => item.calendarId === comp.calendarId)
        if (!_calendar) return
        componentMap.set(comp.id, { ...comp, color: `#${_calendar.color}` })
      })
    })
    convertToEvent(Array.from(componentMap.values()))
  }

  const convertToEvent = (components: CALENDAR.Component[]) => {
    const events = components.map((item: CALENDAR.Component) => {
      debugger
      if (item.repeatStatus !== '0') {
        switch (item.repeatType) {
          case RRule.DAILY.toLocaleUpperCase():
            return repeatDailyEvent(item)
          case RRule.WEEKLY.toLocaleUpperCase():
            return repeatWeekEvent(item)
          case RRule.MONTHLY.toLocaleUpperCase():
            return repeatMonthlyEvent(item)
          default:
        }
      }
      return notRepeatEvent(item)
    })
    setEvents(events)
  }

  const notRepeatEvent = (component: CALENDAR.Component) => {
    return {
      title: component.summary,
      backgroundColor: component.color,
      borderColor: component.color,
      allDay: component.fullDay === 1,
      start: component.dtstart,
      end: component.dtend
    }
  }

  const repeatDailyEvent = (component: CALENDAR.Component) => {
    const vent = {
      title: component.summary,
      backgroundColor: component.color,
      borderColor: component.color,
      allDay: component.fullDay === 1
    }
    const rrule = {
      freq: RRule.DAILY,
      interval: component.repeatInterval,
      dtstart: component.fullDay === 1 ? dayjs(component.dtstart).format('YYYY-MM-DD') : dayjs(component.dtstart).format('YYYY-MM-DDTHH:mm:ss'),
      until: dayjs(component.repeatUntil).format('YYYY-MM-DD')
    }
    return _packageRepeatEvent(vent, rrule, component.fullDay, component.dtstart, component.dtend)
  }

  const repeatWeekEvent = (component: CALENDAR.Component) => {
    const vent = {
      title: component.summary,
      backgroundColor: component.color,
      borderColor: component.color,
      allDay: component.fullDay === 1
    }
    const rrule = {
      freq: RRule.WEEKLY,
      interval: component.repeatInterval,
      byweekday: formatWeekly(component?.repeatByday),
      until: dayjs(component.repeatUntil).format('YYYY-MM-DD')
    }
    return _packageRepeatEvent(vent, rrule, component.fullDay, component.dtstart, component.dtend)
  }

  const repeatMonthlyEvent = (component: CALENDAR.Component) => {
    const vent = {
      title: component.summary,
      backgroundColor: component.color,
      borderColor: component.color,
      allDay: component.fullDay === 1
    }
    let rrule
    /* 每月重复 */
    if (component.repeatStatus === '5' || (component.repeatStatus === '8' && component.repeatBymonthday)) {
      rrule = {
        freq: RRule.MONTHLY,
        interval: component.repeatInterval,
        until: dayjs(component.repeatUntil).format('YYYY-MM-DD'),
        bymonthday: [Number.parseInt(component.repeatBymonthday || '0')]
      }
      return _packageRepeatEvent(vent, rrule, component.fullDay, component.dtstart, component.dtend)
    }
  }

  /**
   * 封装循环日期显示
   * @param vent
   * @param rrule
   * @param fullDay
   * @param dtstart
   * @param dtend
   * @returns
   */
  const _packageRepeatEvent = (vent: any, rrule: any, fullDay: number, dtstart: Date, dtend: Date) => {
    const sameDay = dayjs(dtstart).isSame(dayjs(dtend), 'day')
    if (sameDay) {
      if (fullDay === 1) {
        return { ...vent, rrule: { ...rrule, dtstart: dayjs(dtstart).format('YYYY-MM-DD') } }
      }
      return { ...vent, rrule: { ...rrule, dtstart: dayjs(dtstart).format('YYYY-MM-DDTHH:mm:ss') } }
    }
    const dayjsStart = dayjs(dtstart)
    const dayjsEnd = dayjs(dtend)
    const diffDay = dayjsEnd.diff(dayjsStart, 'day')
    if (diffDay > 1) {
      return { ...vent, duration: { days: diffDay }, rrule }
    }
    if (diffDay === 0) {
      return { ...vent, duration: { day: 1 }, rrule }
    }
    return { ...vent, duration: { day: 2 }, rrule }
  }

  return (
    <FullCalendar
      ref={ref}
      {...calendarOptions}
      height={centerHeight}
      // select={select}
      dateClick={fullCalendarDateClick}
      initialDate={selectDay}
      locale={isChinese() ? zhCncale : ''}
      customButtons={getFullCustomButtons()}
      firstDay={Number.parseInt(dataView)}
      events={events}
      dayMaxEventRows={true}
    />
  )
})

export default RightCalendar
