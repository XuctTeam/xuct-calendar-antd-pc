/*
 * @Author: Derek Xu
 * @Date: 2022-11-18 08:58:43
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-18 18:24:57
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\ui\Center.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */

import { Button, Calendar } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import type { CalendarMode } from 'antd/es/calendar/generateCalendar'
import { Moment } from 'moment'
import { FormattedMessage, getLocale } from 'umi'
import { PlusOutlined } from '@ant-design/icons'
import Kalend, { CalendarEvent, CalendarView, OnEventDragFinish } from 'kalend' // import component
import styles from './center.less'
import 'kalend/dist/styles/index.css' // import styles

import { generateDemoEvents } from '@/utils/helper'

type OnNewEventClickData = {
  event: CalendarEvent
  day: Date
  hour: number
  startAt: string
  endAt: string
  view: string
}

// 必须引入的样式文件

const Center = () => {
  // const onPanelChange = (value: Moment, mode: CalendarMode) => {
  //   console.log(value.format('YYYY-MM-DD'), mode)
  // }

  const onPageChange = (data: any) => {
    console.log('pageChange')
    console.log(data)
  }

  const onNewEventClick = (data: any) => {
    // do something
    console.log(data)
  }

  const onSelectView = (data: any) => {
    debugger
    console.log(333333333)
    console.log(data)
  }

  const onEventDragFinish: OnEventDragFinish = (prevEvent: CalendarEvent, updatedEvent: CalendarEvent, events: any) => {
    // if you want just update whole state, you can just set events
    //setState(events);
    // OR you can handle logic for updating inside your app with access to "updatedEvent" and "prevEvent"
    console.log(2222222222)
  }

  return (
    <Content className={styles.center}>
      <div className={styles.left}>
        <Button type='primary' danger shape='round' icon={<PlusOutlined />} size='large' style={{ width: '100%' }}>
          <FormattedMessage id='pages.component.button.add' />
        </Button>
        <Calendar fullscreen={false} />
        <>{}</>
      </div>
      <div className={styles.right}>
        <Kalend
          onEventClick={() => {
            console.log(1111)
          }}
          onNewEventClick={onNewEventClick}
          events={generateDemoEvents()}
          initialDate={new Date().toISOString()}
          initialView={CalendarView.WEEK}
          disabledViews={[CalendarView.DAY]}
          onSelectView={onSelectView}
          //selectedView={selectedView}
          onPageChange={onPageChange}
          timeFormat={'24'}
          weekDayStart={'Monday'}
          calendarIDsHidden={['work']}
          language={getLocale() === 'en-US' ? 'en' : 'zh'}
        />
      </div>
    </Content>
  )
}

export default Center
