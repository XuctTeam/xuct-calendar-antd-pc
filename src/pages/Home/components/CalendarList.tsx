/*
 * @Author: Derek Xu
 * @Date: 2022-12-02 16:39:55
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-01-30 13:18:30
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\CalendarList.tsx
 * @Description:
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */

import { deleteCalendar } from '@/services/calendar'
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { ProCard } from '@ant-design/pro-components'
import { EventEmitter } from 'ahooks/lib/useEventEmitter'
import { Button, Empty, Modal, Spin, message } from 'antd'
import { FC } from 'react'
import { FormattedMessage, getIntl, useIntl } from 'umi'
import styles from '../index.less'
import { ColoredCheckboxes } from '../ui'

interface IPageOption {
  loading: boolean
  calendars: CALENDAR.Calendar[]
  busEmitter: EventEmitter<Event.Action>
  selectedCalendarChange: (calendarId: string, display: number) => void
  calendarOnEdit: (id: string | undefined) => void
  refresh: () => void
}

const CalendarList: FC<IPageOption> = ({ loading, calendars, busEmitter, selectedCalendarChange, refresh, calendarOnEdit }) => {
  const init = useIntl()
  const checkboxCheck = (id: string, checked: boolean) => {
    selectedCalendarChange(id, !checked ? 0 : 1)
  }

  const calendarOnDelete = (id: string) => {
    Modal.confirm({
      title: init.formatMessage({ id: 'pages.calendar.manager.modal.delete.title' }),
      icon: <ExclamationCircleOutlined />,
      content: init.formatMessage({ id: 'pages.calendar.manager.modal.delete.content' }),
      okType: 'danger',
      onOk: () => {
        _deleteCalendar(id)
      }
    })
  }

  const calendarOnShare = (calendarId: string) => {
    busEmitter.emit({
      action: 'calendar_share',
      data: {
        calendarId
      }
    })
  }

  const _deleteCalendar = (calendarId: string) => {
    deleteCalendar(calendarId)
      .then(() => {
        message.success(getIntl().formatMessage({ id: 'pages.calendar.manager.delete.success' }))
        refresh()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <ProCard
      title={<FormattedMessage id='pages.calendar.manager.title' />}
      hoverable
      bordered
      headerBordered
      className={styles.card}
      extra={<Button type='primary' danger shape='round' icon={<PlusOutlined />} size='small' onClick={() => calendarOnEdit(undefined)} />}
    >
      <div className={styles.body}>
        <Spin spinning={loading}>
          {calendars.length === 0 ? (
            <Empty />
          ) : (
            calendars.map((item, index) => {
              return (
                <ColoredCheckboxes
                  key={index}
                  id={item.id}
                  color={`#${item.color}`}
                  name={item.name}
                  calendarId={item.calendarId}
                  display={item.display === 1}
                  onChange={checkboxCheck}
                  onEdit={calendarOnEdit}
                  onDelete={calendarOnDelete}
                  calendarOnShare={calendarOnShare}
                ></ColoredCheckboxes>
              )
            })
          )}
        </Spin>
      </div>
    </ProCard>
  )
}

export default CalendarList
