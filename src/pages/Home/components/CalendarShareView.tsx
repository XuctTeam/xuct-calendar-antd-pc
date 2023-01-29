/*
 * @Author: Derek Xu
 * @Date: 2023-01-29 17:00:56
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-01-29 17:49:45
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\CalendarShareView.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */

import { useSetState } from 'ahooks'
import { EventEmitter } from 'ahooks/lib/useEventEmitter'
import { Modal } from 'antd'
import { FC } from 'react'

interface IPageOption {
  busEmitter: EventEmitter<Event.Action>
}

interface State {
  visable: boolean
}

const CalendarShareView: FC<IPageOption> = ({ busEmitter }) => {
  const [state, setState] = useSetState<State>({
    visable: false
  })

  busEmitter.useSubscription((values: Event.Action) => {
    const { action, data } = values
    if (action !== 'calendar_share') return
    const { calendarId } = data
    setState({
      visable: true
    })
  })

  return (
    <Modal title='Basic Modal' open={state.visable}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}

export default CalendarShareView
