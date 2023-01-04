/*
 * @Author: Derek Xu
 * @Date: 2022-11-23 09:39:43
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-01-04 13:36:29
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
import { getWeekDay, formatWeekly } from '@/utils/calendar'
import dayjs from 'dayjs'
import { RRule as RRuleJs } from 'rrule'
import { useIntl } from 'umi'
import { RRule } from '@/constants'
import { EventEmitter } from 'ahooks/lib/useEventEmitter'

interface IPageOption {
  centerHeight: number
  selectDay: string
  dataView: string
  lunarView: string
  fullCalendarLocal: any
  calendars: CALENDAR.Calendar[]
  components: CALENDAR.DayCompoent[]
  fullCalendarDayChage: (ty: number) => void
  fullCalendarDateClick: (data: any) => void
  event$: EventEmitter<Event.Action>
}

const RightCalendar = React.forwardRef<any, IPageOption>((props, ref: any) => {
  const { centerHeight, selectDay, fullCalendarLocal, dataView, lunarView, calendars, components, event$ } = props
  const { fullCalendarDayChage, fullCalendarDateClick } = props
  const disableLunarView = !isChinese() || lunarView === '0'
  const [events, setEvents] = useState<any[]>([])
  const init = useIntl()

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
    selectable: true,
    selectMinDistance: 2
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
        text: init.formatMessage({ id: 'pages.calendar.today.button' }),
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

  const fullCalendarEventClick = (info: any) => {
    const { id } = info.event
    const { clientX, clientY } = info.jsEvent
    event$.emit({
      action: 'event_view',
      data: {
        id,
        x: clientX,
        y: clientY
      }
    })
  }

  const fullCalendarSelect = (info: any) => {
    const { startStr, endStr, allDay } = info
    event$.emit({
      action: 'event_create',
      data: {
        startStr,
        endStr,
        fullDay: allDay
      }
    })
  }

  const convertToEvent = (components: CALENDAR.Component[]) => {
    const events = components.map((item: CALENDAR.Component) => {
      if (item.repeatStatus !== '0') {
        switch (item.repeatType) {
          case RRule.DAILY.toLocaleUpperCase():
            return repeatDailyEvent(item)
          case RRule.WEEKLY.toLocaleUpperCase():
            return repeatWeekEvent(item)
          case RRule.MONTHLY.toLocaleUpperCase():
            return repeatMonthlyEvent(item)
          default:
            return repeatYearlyEvent(item)
        }
      }
      return notRepeatEvent(item)
    })
    setEvents(events)
  }

  const notRepeatEvent = (component: CALENDAR.Component) => {
    return {
      id: component.id,
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
      id: component.id,
      title: component.summary,
      backgroundColor: component.color,
      borderColor: component.color,
      allDay: component.fullDay === 1
    }
    const rrule = {
      freq: RRule.DAILY,
      interval: component.repeatInterval,
      until: dayjs(component.repeatUntil).format('YYYY-MM-DD')
    }
    return _packageRepeatEvent(vent, rrule, component.fullDay, component.dtstart, component.dtend)
  }

  const repeatWeekEvent = (component: CALENDAR.Component) => {
    const { id, summary, color, fullDay, dtstart, dtend, repeatInterval = 1, repeatUntil = '', repeatByday = '' } = component
    const vent = {
      id,
      title: summary,
      backgroundColor: color,
      borderColor: color,
      allDay: fullDay === 1
    }
    const rrule = {
      freq: RRule.WEEKLY,
      interval: repeatInterval,
      byweekday: formatWeekly(repeatByday),
      until: dayjs(repeatUntil).format('YYYY-MM-DD')
    }
    return _packageRepeatEvent(vent, rrule, fullDay, dtstart, dtend)
  }

  const repeatMonthlyEvent = (component: CALENDAR.Component) => {
    const {
      id,
      summary,
      color,
      fullDay,
      dtstart,
      dtend,
      repeatStatus,
      repeatInterval = 1,
      repeatUntil = '',
      repeatByday = '',
      repeatBymonthday = ''
    } = component
    const vent = {
      id,
      title: summary,
      backgroundColor: color,
      borderColor: color,
      allDay: fullDay === 1
    }
    if (!repeatStatus) throw new Event('repeatStatus empty')
    const repeatStatusNum = Number.parseInt(repeatStatus)
    let rrule
    switch (repeatStatusNum) {
      case 5 /* 每月重复 */:
        rrule = _repeatMonthlyEventMonthRule(repeatInterval, repeatUntil, repeatBymonthday)
        break
      case 6 /** 每月第几天循环 */:
        rrule = _repeatMonthlyEventMonthDayRule(repeatInterval, repeatUntil, repeatByday)
        break
      case 8:
        rrule = _repeatMonthlyEventCustomize(repeatInterval, repeatUntil, repeatByday, repeatBymonthday)
        break
    }
    return _packageRepeatEvent(vent, rrule, fullDay, dtstart, dtend)
  }

  /**
   * 每月循环，自定义循环周期
   * @param repeatInterval
   * @param repeatUntil
   * @param repeatByday
   * @param repeatBymonthday
   * @returns
   */
  const _repeatMonthlyEventCustomize = (repeatInterval: number, repeatUntil: string, repeatByday: string, repeatBymonthday: string) => {
    if (repeatBymonthday) {
      return _repeatMonthlyEventMonthRule(repeatInterval, repeatUntil, repeatBymonthday)
    }
    return _repeatMonthlyEventMonthDayRule(repeatInterval, repeatUntil, repeatByday)
  }

  const _repeatMonthlyEventMonthRule = (repeatInterval: number, repeatUntil: string, repeatBymonthday: string) => {
    return {
      freq: RRule.MONTHLY,
      interval: repeatInterval,
      until: dayjs(repeatUntil).format('YYYY-MM-DD'),
      bymonthday: [Number.parseInt(repeatBymonthday)]
    }
  }

  const _repeatMonthlyEventMonthDayRule = (repeatInterval: number, repeatUntil: string, repeatByday: string) => {
    if (!repeatByday) throw Error('repeatByday error')
    const bydays = repeatByday.split(':')
    let rrule = {
      freq: RRule.MONTHLY,
      interval: repeatInterval,
      until: dayjs(repeatUntil).format('YYYY-MM-DD')
    }
    const day = Number.parseInt(bydays[0])
    switch (Number.parseInt(bydays[1])) {
      case 1:
        rrule['byweekday'] = [RRuleJs.MO.nth(day)]
        break
      case 2:
        rrule['byweekday'] = [RRuleJs.TU.nth(day)]
        break
      case 3:
        rrule['byweekday'] = [RRuleJs.WE.nth(day)]
        break
      case 4:
        rrule['byweekday'] = [RRuleJs.TH.nth(day)]
        break
      case 5:
        rrule['byweekday'] = [RRuleJs.FR.nth(day)]
        break
      case 6:
        rrule['byweekday'] = [RRuleJs.SA.nth(day)]
        break
      default:
        rrule['byweekday'] = [RRuleJs.SU.nth(day)]
    }
    return rrule
  }

  const repeatYearlyEvent = (component: CALENDAR.Component) => {
    const { id, summary, color, fullDay, dtstart, dtend, repeatInterval = 1, repeatUntil = '', repeatBymonth = '', repeatBymonthday = '' } = component
    const vent = {
      id,
      title: summary,
      backgroundColor: color,
      borderColor: color,
      allDay: fullDay === 1
    }
    const rrule = {
      freq: RRule.YEARLY,
      interval: repeatInterval,
      until: dayjs(repeatUntil).format('YYYY-MM-DD'),
      bymonth: [Number.parseInt(repeatBymonth)],
      bymonthday: [Number.parseInt(repeatBymonthday)]
    }
    return _packageRepeatEvent(vent, rrule, fullDay, dtstart, dtend)
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
    const dtstartStr = fullDay === 1 ? dayjs(dtstart).format('YYYY-MM-DD') : dayjs(dtstart).format('YYYY-MM-DDTHH:mm:ss')
    if (sameDay) {
      return { ...vent, rrule: { ...rrule, dtstart: dtstartStr } }
    }
    const dayjsStart = dayjs(dtstart)
    const dayjsEnd = dayjs(dtend)
    const diffDay = dayjsEnd.diff(dayjsStart, 'day')
    if (diffDay > 1) {
      return { ...vent, dtstart: dtstartStr, duration: { days: diffDay }, rrule }
    }
    if (diffDay === 0) {
      return { ...vent, dtstart: dtstartStr, duration: { day: 1 }, rrule }
    }
    return { ...vent, dtstart: dtstartStr, duration: { day: 2 }, rrule }
  }

  return (
    <FullCalendar
      ref={ref}
      {...calendarOptions}
      height={centerHeight - 20}
      select={fullCalendarSelect}
      locale={fullCalendarLocal}
      dateClick={fullCalendarDateClick}
      initialDate={selectDay}
      customButtons={getFullCustomButtons()}
      firstDay={Number.parseInt(dataView)}
      events={events}
      dayMaxEventRows={true}
      eventClick={fullCalendarEventClick}
    />
  )
})

export default RightCalendar
