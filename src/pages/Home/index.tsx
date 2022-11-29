/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 08:34:15
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-29 21:50:39
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */

import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Alert, Button, Calendar, Spin } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { connect, FormattedMessage, useSelector } from 'umi'
import { PlusOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
//import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import { ProCard } from '@ant-design/pro-components'
import { ColoredCheckboxes, RightCalendar } from './components'
import styles from './index.less'

const HomePage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [centerHeight, setCenterHeight] = useState<number>(300)
  const calenarRefContent = useRef<any>()
  const calendarRef = React.createRef<any>()
  const [selectDay, setSelectDay] = useState<any>()

  // 只要调用的dva中的state数据更新了 这里就能触发获取到最新数据
  const { dataView, lunarView } = useSelector(function (state: any) {
    return state.system
  })
  useEffect(() => {
    /* 更新calendar高度 */
    setCenterHeight(calenarRefContent.current.offsetHeight - 20)
    // 页面变化时获取浏览器窗口的大小
    window.addEventListener('resize', resizeUpdate)
    return () => {
      // 组件销毁时移除监听事件
      window.removeEventListener('resize', resizeUpdate)
    }
  }, [])

  const resizeUpdate = () => {
    // 通过事件对象获取浏览器窗口的高度
    setCenterHeight(calenarRefContent.current.offsetHeight - 20)
  }

  // const select = (info: any) => {
  //   console.log('select')
  //   console.log('info')
  // }

  const fullCalendarDateClick = (info: any) => {
    console.log('dateClick')
    setSelectDay(dayjs(info.date).format('YYYY-MM-DD'))
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
    const day = dayjs(api.getDate()).format('YYYY-MM-DD')
    const selecteDay = selectDay
    setSelectDay(day)
    /** 判断是否是同一月 */
    const sameMonth = dayjs(selecteDay).isSame(day, 'month')
    if (sameMonth) return
  }

  /**
   * 左侧日期点击
   * @param info
   */
  const antdCalendarSelect = (info: any) => {
    const api = calendarRef.current.getApi()
    const day = dayjs(info).format('YYYY-MM-DD')
    const selecteDay = selectDay
    setSelectDay(day)
    api.gotoDate(day)
    api.select(day)
    /** 判断是否是同一月 */
    const sameMonth = dayjs(selecteDay).isSame(day, 'month')
    if (sameMonth) return
  }

  return (
    <Content className={styles.center}>
      <div className={styles.left}>
        <Button type='primary' icon={<PlusOutlined />} block>
          <FormattedMessage id='pages.component.button.add' />
        </Button>
        <ProCard hoverable bordered className={styles.calendar}>
          <Calendar fullscreen={false} value={dayjs(selectDay)} onSelect={antdCalendarSelect} />
        </ProCard>

        <ProCard
          title={<FormattedMessage id='page.calendar.manager.title' />}
          hoverable
          bordered
          headerBordered
          className={styles.card}
          extra={<Button type='primary' danger shape='round' icon={<PlusOutlined />} size='small' />}
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
            dataView={dataView}
            lunarView={lunarView}
            fullCalendarDateClick={fullCalendarDateClick}
            fullCalendarDayChage={fullCalendarDayChage}
          ></RightCalendar>
        </div>
      </div>
    </Content>
  )
}

export default connect(
  ({ system }: any) => {
    return system
  },
  (dispatch: any) => {
    return { dispatch }
  }
)(HomePage)
