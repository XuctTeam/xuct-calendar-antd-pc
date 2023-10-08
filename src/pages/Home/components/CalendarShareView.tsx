/*
 * @Author: Derek Xu
 * @Date: 2023-01-29 17:00:56
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-02-16 19:11:11
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\CalendarShareView.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */

import { FormattedMessage } from '@/.umi/plugin-locale'
import { shareCalendar } from '@/services/calendar'
import { useSetState } from 'ahooks'
import { EventEmitter } from 'ahooks/lib/useEventEmitter'
import { Button, Divider, Input, message, Modal, Space } from 'antd'
import copy from 'copy-to-clipboard'
import { FC } from 'react'
import { useIntl } from 'umi'

interface IPageOption {
  busEmitter: EventEmitter<Event.Action>
}

interface State {
  visible: boolean
  title: string
  shortUrl: string
}

const CalendarShareView: FC<IPageOption> = ({ busEmitter }) => {
  const init = useIntl()

  const [state, setState] = useSetState<State>({
    visible: false,
    title: '',
    shortUrl: ''
  })

  busEmitter.useSubscription((values: Event.Action) => {
    const { action, data } = values
    if (action !== 'calendar_share') return
    const { calendarId } = data
    console.log(calendarId)
    setState({
      visible: true
    })
    _initData(calendarId)
  })

  const _initData = (calendarId: string) => {
    shareCalendar(calendarId)
      .then((res) => {
        const { name, shortUrl } = res
        setState({
          title: name,
          shortUrl
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const copyUrl = () => {
    copy(state.shortUrl)
    message.success(init.formatMessage({ id: 'pages.calendar.manager.share.copy.success' }))
  }

  return (
    <Modal
      title={init.formatMessage({ id: 'pages.calendar.share.title' }) + `${state.title}`}
      open={state.visible}
      onCancel={() => setState({ visible: false })}
      footer={null}
    >
      <Divider>
        <FormattedMessage id='pages.calendar.manager.share.or' />
      </Divider>
      <Space>
        <Input value={state.shortUrl} disabled style={{ width: '300px' }} />
        <Button type='primary' onClick={copyUrl}>
          <FormattedMessage id='pages.calendar.manager.share.button' />
        </Button>
      </Space>
    </Modal>
  )
}

export default CalendarShareView
