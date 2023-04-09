/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 08:34:15
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-04-09 23:36:12
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */

import { componentsDaysById, list, updateDisplay } from '@/services/calendar'
import { groupTree } from '@/services/group'
import { PlusOutlined } from '@ant-design/icons'
import { ProCard } from '@ant-design/pro-components'
import { useEventEmitter, useSetState, useSize } from 'ahooks'
import { Badge, Button, Calendar } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import dayjs, { Dayjs } from 'dayjs'
import React, { useCallback, useEffect, useRef } from 'react'
import { connect, FormattedMessage, useSelector } from 'umi'
import { CalendarEditFrom, CalendarList, CalendarShareView, ComponentEditForm, ComponentView, RightCalendar } from './components'

import styles from './index.less'

interface State {
  loading: boolean
  compLoading: boolean
  selectDay: any
  calendars: CALENDAR.Calendar[]
  marks: string[]
  components: CALENDAR.DayCompoent[]
  compVisable: boolean
  calendarVisable: boolean
  calendarShareVisable: boolean
  attendChooseVisable: boolean
  calendarId?: string
  groups: GROUP.TreeMember[]
}

const HomePage = () => {
  const calenarRefContent = useRef<any>()
  const calendarRef = React.createRef<any>()
  const size = useSize(calenarRefContent)
  const busEmitter = useEventEmitter<any>()

  const [state, setState] = useSetState<State>({
    loading: false,
    compLoading: false,
    selectDay: dayjs().format('YYYY-MM-DD'),
    calendars: [],
    marks: [],
    components: [],
    groups: [],
    compVisable: false,
    calendarVisable: false,
    calendarShareVisable: false,
    attendChooseVisable: false,
    calendarId: undefined
  })

  // 只要调用的dva中的state数据更新了 这里就能触发获取到最新数据
  const { dataView, lunarView, fullCalendarLocal } = useSelector(function (state: any) {
    return state.system
  })

  useEffect(() => {
    initData()
  }, [])

  const initData = async () => {
    setState({
      loading: true
    })
    let _calendars: any
    try {
      _calendars = await list()
    } catch (err) {
      console.log(err)
      setState({
        loading: false
      })
      return
    }
    setState({
      loading: false
    })
    if (!(_calendars && _calendars.length > 0)) return
    setState({
      calendars: _calendars
    })
    /** 加载日程 */
    _queryComponent(_calendars, dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss'), dayjs().endOf('month').format('YYYY-MM-DD HH:mm:ss'))
    /** 加载通讯录 */
    _queryGroup()
  }

  // const select = (info: any) => {
  //   console.log('select')
  //   console.log('info')
  // }

  const antdCalendarDateCellRender = useCallback(
    (value: Dayjs) => {
      if (state.marks.includes(value.format('YYYY-MM-DD')))
        return (
          <div className={styles.mark}>
            <Badge status='default' />
          </div>
        )
      return <></>
    },
    [state.marks]
  )

  const fullCalendarDateClick = (info: any) => {
    console.log('dateClick')
    setState({
      selectDay: dayjs(info.date).format('YYYY-MM-DD')
    })
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
    const selecteDay = state.selectDay
    setState({
      selectDay: day
    })
    _dateChageLoadComponent(day, selecteDay)
  }

  /**
   * 左侧日期点击
   * @param info
   */
  const antdCalendarSelect = (info: any) => {
    const api = calendarRef.current.getApi()
    const day = dayjs(info).format('YYYY-MM-DD')
    const selecteDay = state.selectDay
    setState({
      selectDay: day
    })
    api.gotoDate(day)
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
    const _calendars = [...state.calendars]
    const index = _calendars.findIndex((item) => item.id === calendarId)
    _calendars.splice(index, 1, { ..._calendars[index], display })
    setState({
      calendars: _calendars
    })
  }

  const refresh = () => {
    setState({
      calendars: [],
      components: []
    })
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
    _queryComponent(state.calendars, dayjs(day).startOf('month').format('YYYY-MM-DD HH:mm:ss'), dayjs(day).endOf('month').format('YYYY-MM-DD HH:mm:ss'))
  }

  /**
   * 根据日历查询事件
   * @param calList
   * @param start
   * @param end
   */
  const _queryComponent = (calList: CALENDAR.Calendar[], start: string, end: string) => {
    setState({
      compLoading: true
    })
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
        setState({
          components: calendarComponents,
          compLoading: false
        })
      })
      .catch((err) => {
        console.log(err)
        setState({
          compLoading: false
        })
      })
  }

  const _fillMarkDay = (components: Array<CALENDAR.DayCompoent>) => {
    if (components.length === 0) return
    const daySet: Set<string> = new Set<string>([])
    components.forEach((comp) => {
      daySet.add(dayjs(comp.day).format('YYYY-MM-DD'))
    })
    setState({
      marks: Array.from(daySet)
    })
  }

  const _queryGroup = () => {
    groupTree()
      .then((res) => {
        setState({ groups: res as any as GROUP.TreeMember[] })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Content className={styles.center}>
        <div className={styles.left}>
          <Button type='primary' icon={<PlusOutlined />} block onClick={() => setState({ compVisable: true })}>
            <FormattedMessage id='pages.component.button.add' />
          </Button>
          <ProCard hoverable bordered>
            <Calendar fullscreen={false} value={dayjs(state.selectDay)} onSelect={antdCalendarSelect} cellRender={antdCalendarDateCellRender} />
          </ProCard>
          <CalendarList
            loading={state.loading}
            calendars={state.calendars}
            selectedCalendarChage={calendarChageDisplay}
            refresh={refresh}
            busEmitter={busEmitter}
            calendarOnEdit={(calendarId: string | undefined) => {
              setState({ calendarVisable: true, calendarId })
            }}
          />
        </div>
        <div className={styles.right} ref={calenarRefContent}>
          <div className={styles.calendar}>
            <RightCalendar
              loading={state.compLoading}
              busEmitter={busEmitter}
              ref={calendarRef}
              selectDay={state.selectDay}
              centerHeight={size?.height || 0}
              dataView={dataView}
              lunarView={lunarView}
              calendars={state.calendars}
              components={state.components}
              fullCalendarDateClick={fullCalendarDateClick}
              fullCalendarDayChage={fullCalendarDayChage}
              fullCalendarLocal={fullCalendarLocal}
            />
          </div>
        </div>
      </Content>
      <CalendarEditFrom
        visable={state.calendarVisable}
        setVisable={(e) => {
          if (!e) {
            setState({ calendarVisable: e, calendarId: undefined })
            return
          }
          setState({ calendarVisable: e })
        }}
        refresh={refresh}
        id={state.calendarId}
      />
      <CalendarShareView busEmitter={busEmitter} />
      <ComponentEditForm
        busEmitter={busEmitter}
        calendars={state.calendars}
        visable={state.compVisable}
        groups={state.groups}
        setVisable={(e) => {
          setState({ compVisable: e })
        }}
        refresh={refresh}
      />
      <ComponentView busEmitter={busEmitter} refresh={refresh} />
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
