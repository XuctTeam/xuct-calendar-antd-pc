/*
 * @Author: Derek Xu
 * @Date: 2022-12-02 16:39:55
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-01-04 16:06:09
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\CalendarList.tsx
 * @Description:
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */

import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { ProCard } from '@ant-design/pro-components'
import { Button, Empty, message, Modal, Spin } from 'antd'
import { FC, useState } from 'react'
import { FormattedMessage, getIntl } from 'umi'
import ColoredCheckboxes from './ColoredCheckboxes'
import CalendarEditFrom from './CalendarEditFrom'
import { deleteCalendar } from '@/services/calendar'
import styles from '../index.less'

interface IPageOption {
  loading: boolean
  calendars: CALENDAR.Calendar[]
  calendarChageDisplay: (calendarId: string, display: number) => void
  refresh: () => void
}

const CalendarList: FC<IPageOption> = (props) => {
  const { loading, calendars, calendarChageDisplay, refresh } = props
  const [formOpen, setFormOpen] = useState(false)
  const [calendarId, setCalendarId] = useState<any>()

  const checkboxCheck = (id: string, checked: boolean) => {
    calendarChageDisplay(id, !checked ? 0 : 1)
  }

  const calendarOnEdit = (id?: string) => {
    setCalendarId(id || undefined)
    setFormOpen(true)
  }

  const changeFormOpen = (open: boolean) => {
    setFormOpen(open)
    if (!open) {
      setCalendarId(undefined)
    }
  }

  const calendarOnDelete = (id: string) => {
    Modal.confirm({
      title: getIntl().formatMessage({ id: 'pages.calendar.manager.modal.delete.title' }),
      icon: <ExclamationCircleOutlined />,
      content: getIntl().formatMessage({ id: 'pages.calendar.manager.modal.delete.content' }),
      okType: 'danger',
      onOk: () => {
        _deleteCalendar(id)
      }
    })
  }

  const _deleteCalendar = (calendarId: string) => {
    deleteCalendar(calendarId)
      .then(() => {
        message.success(getIntl().formatMessage({ id: 'pages.calendar.mananger.delete.success' }))
        refresh()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <ProCard
        title={<FormattedMessage id='pages.calendar.manager.title' />}
        hoverable
        bordered
        headerBordered
        className={styles.card}
        extra={<Button type='primary' danger shape='round' icon={<PlusOutlined />} size='small' onClick={() => calendarOnEdit()} />}
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
                  ></ColoredCheckboxes>
                )
              })
            )}
          </Spin>
        </div>
      </ProCard>
      <CalendarEditFrom visable={formOpen} setVisable={changeFormOpen} refresh={refresh} id={calendarId}></CalendarEditFrom>
    </>
  )
}

export default CalendarList
