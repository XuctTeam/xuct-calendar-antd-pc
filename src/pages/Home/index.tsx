/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 08:34:15
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-23 10:02:17
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */

import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Button, Calendar } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { FormattedMessage, getLocale } from 'umi'
import { PlusOutlined } from '@ant-design/icons'
import moment from 'moment'
//import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import { ProCard } from '@ant-design/pro-components'
import { ColoredCheckboxes, RightCalendar } from './components'
import styles from './index.less'

export default function HomePage() {
  const [loading, setLoading] = useState<boolean>(false)
  const [centerHeight, setCenterHeight] = useState<number>(300)
  const calenarRefContent = useRef<any>()
  const calendarRef = React.createRef<any>()
  const [selectDay, setSelectDay] = useState<any>()

  useEffect(() => {
    setCenterHeight(calenarRefContent.current.offsetHeight - 20)
    console.log(getLocale())
  }, [])

  // const select = (info: any) => {
  //   console.log('select')
  //   console.log('info')
  // }

  const fullCalendarDateClick = (info: any) => {
    console.log('dateClick')
    setSelectDay(moment(info.date).format('YYYY-MM-DD'))
  }

  const fullCalendarDayChage = (ty: any) => {
    const api = calendarRef.current.getApi()
    switch (ty) {
      case 0:
        api.prev()
        break
      case 1:
        api.next()
        break
      case 2:
        api.today()
    }
    const day = moment(api.getDate()).format('YYYY-MM-DD')
    const selecteDay = selectDay
    setSelectDay(day)
    /** 判断是否是同一月 */
    const sameMonth = moment(selecteDay).isSame(day, 'month')
    if (sameMonth) return
  }

  /**
   * 左侧日期点击
   * @param info
   */
  const antdCalendarSelect = (info: any) => {
    const api = calendarRef.current.getApi()
    const day = moment(info).format('YYYY-MM-DD')
    const selecteDay = selectDay
    setSelectDay(day)
    api.gotoDate(day)
    api.select(day)
    /** 判断是否是同一月 */
    const sameMonth = moment(selecteDay).isSame(day, 'month')
    if (sameMonth) return
  }

  return (
    <Content className={styles.center}>
      <div className={styles.left}>
        <Button type='primary' icon={<PlusOutlined />} block>
          <FormattedMessage id='pages.component.button.add' />
        </Button>
        <ProCard hoverable bordered className={styles.calendar}>
          <Calendar fullscreen={false} value={moment(selectDay)} onSelect={antdCalendarSelect} />
        </ProCard>

        <ProCard
          title={<FormattedMessage id='page.calendar.manager.title' />}
          hoverable
          bordered
          headerBordered
          className={styles.card}
          extra={<Button type='primary' shape='round' icon={<PlusOutlined />} size='small' />}
        >
          <div className={styles.body}>
            <ColoredCheckboxes color='#ee0a24' name='123'></ColoredCheckboxes>
            <ColoredCheckboxes color='#2eb82e' name='123'></ColoredCheckboxes>
          </div>
        </ProCard>
      </div>
      <div className={styles.right} ref={calenarRefContent}>
        <div className={styles.calendar}>
          <RightCalendar
            ref={calendarRef}
            selectDay={selectDay}
            centerHeight={centerHeight}
            fullCalendarDateClick={fullCalendarDateClick}
            fullCalendarDayChage={fullCalendarDayChage}
          ></RightCalendar>
        </div>
      </div>
    </Content>
  )
}
