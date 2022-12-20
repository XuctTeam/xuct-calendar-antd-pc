/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 08:34:15
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-20 09:40:51
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */

import React, { useCallback } from 'react'
import { useState, useEffect, useRef } from 'react'
import { Badge, Button, Calendar } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { connect, FormattedMessage, useSelector } from 'umi'
import { PlusOutlined } from '@ant-design/icons'
import dayjs, { Dayjs } from 'dayjs'
import { ProCard } from '@ant-design/pro-components'
import { CalendarList, RightCalendar, ComponentForm } from './components'
import { componentsDaysById, list, updateDisplay } from '@/services/calendar'
import styles from './index.less'

const HomePage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [centerHeight, setCenterHeight] = useState<number>(300)
  const calenarRefContent = useRef<any>()
  const calendarRef = React.createRef<any>()
  const [selectDay, setSelectDay] = useState<any>()
  const [calendars, setCalendars] = useState<CALENDAR.Calendar[]>([])
  const [marks, setMarks] = useState<string[]>([])
  const [components, setComponents] = useState<CALENDAR.DayCompoent[]>([])
  const [compOpen, setCompOpen] = useState<boolean>(false)

  // 只要调用的dva中的state数据更新了 这里就能触发获取到最新数据
  const { dataView, lunarView } = useSelector(function (state: any) {
    return state.system
  })
  useEffect(() => {
    /* 更新calendar高度 */
    setCenterHeight(calenarRefContent.current.offsetHeight - 20)
    // 页面变化时获取浏览器窗口的大小
    window.addEventListener('resize', resizeUpdate)
    //加载日历数据
    initData()
    return () => {
      // 组件销毁时移除监听事件
      window.removeEventListener('resize', resizeUpdate)
    }
  }, [])

  const resizeUpdate = () => {
    // 通过事件对象获取浏览器窗口的高度
    setCenterHeight(calenarRefContent.current.offsetHeight - 20)
  }

  const initData = async () => {
    setLoading(true)
    let _calendars: any
    try {
      _calendars = await list()
    } catch (err) {
      console.log(err)
      setLoading(false)
      return
    }
    setLoading(false)
    if (!(_calendars && _calendars.length > 0)) return
    setCalendars(_calendars)
    /** 加载日程 */
    _queryComponent(_calendars, dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss'), dayjs().endOf('month').format('YYYY-MM-DD HH:mm:ss'))
  }

  // const select = (info: any) => {
  //   console.log('select')
  //   console.log('info')
  // }

  const antdCalendarDateCellRender = useCallback(
    (value: Dayjs) => {
      if (marks.includes(value.format('YYYY-MM-DD')))
        return (
          <div className={styles.mark}>
            <Badge status='default' />
          </div>
        )
      return <></>
    },
    [marks]
  )

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
    _dateChageLoadComponent(day, selecteDay)
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
    _dateChageLoadComponent(day, selecteDay)
  }

  /**
   * 更新日历显示状态
   * @param calendarId
   * @param display
   */
  const calendarChageDisplay = async (calendarId: string, display: number) => {
    updateDisplay(calendarId, display).catch((err) => {
      console.log(err)
    })
    const _calendars = [...calendars]
    const index = _calendars.findIndex((item) => item.id === calendarId)
    _calendars.splice(index, 1, { ..._calendars[index], display })
    setCalendars(_calendars)
  }

  const refresh = () => {
    setCalendars([])
    setComponents([])
    initData()
  }

  /**
   * 判断是否是同一月
   * @param day
   * @param selecteDay
   * @returns
   */
  const _dateChageLoadComponent = (day: string, selecteDay: string) => {
    const sameMonth = dayjs(selecteDay).isSame(day, 'month')
    if (sameMonth) return
    _queryComponent(calendars, dayjs(day).startOf('month').format('YYYY-MM-DD HH:mm:ss'), dayjs(day).endOf('month').format('YYYY-MM-DD HH:mm:ss'))
  }

  /**
   * 根据日历查询事件
   * @param calList
   * @param start
   * @param end
   */
  const _queryComponent = (calList: CALENDAR.Calendar[], start: string, end: string) => {
    let pList: Array<Promise<any>> = []
    calList.forEach((item: any) => {
      pList.push(
        new Promise(function (resolve, reject) {
          componentsDaysById(item.calendarId, start, end)
            .then((res: any) => {
              resolve(res)
            })
            .catch((err: any) => {
              reject(err)
            })
        })
      )
    })
    let calendarComponents: Array<CALENDAR.DayCompoent> = []
    Promise.all(
      pList.map((p) => {
        return p.catch((error) => error)
      })
    )
      .then((res) => {
        res.forEach((i) => (calendarComponents = calendarComponents.concat(i)))
        _fillMarkDay(calendarComponents)
        setComponents(calendarComponents)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const _fillMarkDay = (components: Array<CALENDAR.DayCompoent>) => {
    if (components.length === 0) return
    const daySet: Set<string> = new Set<string>([])
    components.forEach((comp) => {
      daySet.add(dayjs(comp.day).format('YYYY-MM-DD'))
    })
    setMarks(Array.from(daySet))
  }

  return (
    <>
      <Content className={styles.center}>
        <div className={styles.left}>
          <Button type='primary' icon={<PlusOutlined />} block onClick={() => setCompOpen(true)}>
            <FormattedMessage id='pages.component.button.add' />
          </Button>
          <ProCard hoverable bordered className={styles.calendar}>
            <Calendar fullscreen={false} value={dayjs(selectDay)} onSelect={antdCalendarSelect} dateCellRender={antdCalendarDateCellRender} />
          </ProCard>
          <CalendarList loading={loading} calendars={calendars} calendarChageDisplay={calendarChageDisplay} refresh={refresh} />
        </div>
        <div className={styles.right} ref={calenarRefContent}>
          <div className={styles.calendar}>
            <RightCalendar
              ref={calendarRef}
              selectDay={selectDay}
              centerHeight={centerHeight}
              dataView={dataView}
              lunarView={lunarView}
              calendars={calendars}
              components={components}
              fullCalendarDateClick={fullCalendarDateClick}
              fullCalendarDayChage={fullCalendarDayChage}
            ></RightCalendar>
          </div>
        </div>
      </Content>
      <ComponentForm calendars={calendars} open={compOpen} setOpen={setCompOpen} />
    </>
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
