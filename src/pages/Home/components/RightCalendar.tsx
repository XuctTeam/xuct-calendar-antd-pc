/*
 * @Author: Derek Xu
 * @Date: 2022-11-23 09:39:43
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-25 19:42:20
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\RightCalendar.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */

import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { isChinese, lunarDay } from '@/utils/calendar'
import zhCncale from '@fullcalendar/core/locales/zh-cn'
import { getIntl } from 'umi'
import { getEnglishWeek } from '@/utils/calendar'
import dayjs from 'dayjs'

interface IPageOption {
  centerHeight: number
  selectDay: string
  dataView: string
  lunarView: string
  fullCalendarDayChage: (ty: number) => void
  fullCalendarDateClick: (data: any) => void
}

const RightCalendar = React.forwardRef<any, IPageOption>((props, ref: any) => {
  const { centerHeight, selectDay, dataView, lunarView } = props
  const { fullCalendarDayChage, fullCalendarDateClick } = props
  const disableLunarView = !isChinese() || lunarView === '0'

  const calendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
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
      return { html: `<label>${_dayjs.date()}</label></br><span>${getEnglishWeek(_dayjs.day())}</span>` }
    }
    let _dateF = lunarDay(item.date)
    return { html: `<label>${_dateF.cDay}</label><span>${_dateF.dayCn}</span><br/><label>${_dateF.ncWeek}</label>` }
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
    />
  )
})

export default RightCalendar
