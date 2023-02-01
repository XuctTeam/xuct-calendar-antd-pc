/*
 * @Author: Derek Xu
 * @Date: 2023-01-29 17:00:56
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-02-01 18:36:08
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\CalendarShareView.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */

import { shareCalendar } from '@/services/calendar'
import { useSetState } from 'ahooks'
import { EventEmitter } from 'ahooks/lib/useEventEmitter'
import { Modal } from 'antd'
import { FC } from 'react'

interface IPageOption {
  busEmitter: EventEmitter<Event.Action>
}

interface State {
  visable: boolean
  title: string
}

const CalendarShareView: FC<IPageOption> = ({ busEmitter }) => {
  const [state, setState] = useSetState<State>({
    visable: false,
    title: ''
  })

  busEmitter.useSubscription((values: Event.Action) => {
    const { action, data } = values
    if (action !== 'calendar_share') return
    const { calendarId } = data
    console.log(calendarId)
    setState({
      visable: true
    })
    _initData(calendarId)
  })

  const _initData = (calendarId: string) => {
    shareCalendar(calendarId)
      .then((res) => {
        const { name } = res
        setState({
          title: name
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Modal title={`${state.title}分享`} open={state.visable} onCancel={() => setState({ visable: false })} footer={null}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}

export default CalendarShareView
