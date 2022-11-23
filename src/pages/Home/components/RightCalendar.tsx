/*
 * @Author: Derek Xu
 * @Date: 2022-11-23 09:39:43
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-23 10:08:25
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
import { lunarDay } from '@/utils/calendar'
import zhCncale from '@fullcalendar/core/locales/zh-cn'
import { getIntl, getLocale } from 'umi'

interface IPageOption {
  centerHeight: number
  selectDay: string
  fullCalendarDayChage: (ty: number) => void
  fullCalendarDateClick: (data: any) => void
}

const RightCalendar = React.forwardRef<any, IPageOption>((props, ref: any) => {
  const { centerHeight, selectDay } = props
  const { fullCalendarDayChage, fullCalendarDateClick } = props
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
      //对应月视图
      dayGridMonth: {
        displayEventTime: false, //是否显示时间
        dayCellContent(item: any) {
          let _dateF = lunarDay(item.date)
          return { html: `<p><label>${_dateF.cDay}</label><span>${_dateF.dayCn}</span></p>` }
        }
      },
      timeGridWeek: {
        dayHeaderContent(item: any) {
          let _dateF = lunarDay(item.date)
          return { html: `<label>${_dateF.ncWeek}</label><br/><label>${_dateF.cDay}</label><span>${_dateF.dayCn}</span>` }
        }
      },
      timeGridDay: {
        dayHeaderContent(item: any) {
          let _dateF = lunarDay(item.date)
          return { html: `<label>${_dateF.ncWeek}</label><br/><label>${_dateF.cDay}</label><span>${_dateF.dayCn}</span>` }
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

  return (
    <FullCalendar
      ref={ref}
      {...calendarOptions}
      height={centerHeight}
      // select={select}
      dateClick={fullCalendarDateClick}
      initialDate={selectDay}
      locale={getLocale() === 'zh-CN' ? zhCncale : ''}
      customButtons={getFullCustomButtons()}
    />
  )
})

export default RightCalendar
