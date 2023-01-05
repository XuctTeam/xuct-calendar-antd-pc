/*
 * @Author: Derek Xu
 * @Date: 2022-12-02 16:39:55
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-01-05 12:40:00
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\CalendarList.tsx
 * @Description:
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */

import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { ProCard } from '@ant-design/pro-components'
import { Button, Empty, message, Modal, Spin } from 'antd'
import { FC } from 'react'
import { FormattedMessage, getIntl } from 'umi'
import ColoredCheckboxes from './ColoredCheckboxes'
import { deleteCalendar } from '@/services/calendar'
import styles from '../index.less'

interface IPageOption {
  loading: boolean
  calendars: CALENDAR.Calendar[]
  selectedCalendarChage: (calendarId: string, display: number) => void
  calendarOnEdit: (id: string | undefined) => void
  refresh: () => void
}

const CalendarList: FC<IPageOption> = ({ loading, calendars, selectedCalendarChage, refresh, calendarOnEdit }) => {
  const checkboxCheck = (id: string, checked: boolean) => {
    selectedCalendarChage(id, !checked ? 0 : 1)
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
