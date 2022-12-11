/*
 * @Author: Derek Xu
 * @Date: 2022-12-02 16:39:55
 * @LastEditors: Derek Xu
<<<<<<< Updated upstream
 * @LastEditTime: 2022-12-10 20:34:32
=======
 * @LastEditTime: 2022-12-11 22:37:22
>>>>>>> Stashed changes
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\CalendarList.tsx
 * @Description:
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */

import { PlusOutlined } from '@ant-design/icons'
import { ProCard } from '@ant-design/pro-components'
import { Button, Empty, Spin } from 'antd'
import { FC, useCallback, useState } from 'react'
import { FormattedMessage } from 'umi'
import ColoredCheckboxes from './ColoredCheckboxes'
import CalendarEditFrom from './CalendarEditFrom'
import { getCalendar } from '@/services/calendar'
import styles from '../index.less'

interface IPageOption {
  loading: boolean
  calendars: CALENDAR.Calendar[]
  calendarChageDisplay: (calendarId: string, display: number) => void
  refresh: () => void
}

const CalendarList: FC<IPageOption> = (props) => {
  const { loading, calendars, calendarChageDisplay, refresh } = props
  const [modalVisit, setModalVisit] = useState(false)
  const [formValues, setFormValues] = useState<any>()
  const [type, setType] = useState<string>('add')

  const checkboxCheck = (id: string, checked: boolean) => {
    calendarChageDisplay(id, !checked ? 0 : 1)
  }

  const calendarOnEdit = (id: string) => {
    getCalendar(id)
      .then((res) => {
        setType('update')
        setFormValues(res as any as CALENDAR.Calendar)
        setModalVisit(true)
      })
      .catch((err) => {})
  }

  const calendarOnAdd = () => {
    setType('add')
    setModalVisit(true)
  }

  return (
<<<<<<< Updated upstream
    <ProCard
      title={<FormattedMessage id='pages.calendar.manager.title' />}
      hoverable
      bordered
      headerBordered
      className={styles.card}
      extra={<CalendarEditFrom trigger={<Button type='primary' danger shape='round' icon={<PlusOutlined />} size='small' />} refresh={refresh} />}
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
                  display={item.display === 1}
                  onChange={checkboxCheck}
                ></ColoredCheckboxes>
              )
            })
          )}
        </Spin>
      </div>
    </ProCard>
=======
    <>
      <ProCard
        title={<FormattedMessage id='pages.calendar.manager.title' />}
        hoverable
        bordered
        headerBordered
        className={styles.card}
        extra={<Button type='primary' danger shape='round' icon={<PlusOutlined />} size='small' onClick={calendarOnAdd} />}
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
                    display={item.display === 1}
                    onChange={checkboxCheck}
                    onEdit={calendarOnEdit}
                  ></ColoredCheckboxes>
                )
              })
            )}
          </Spin>
        </div>
      </ProCard>
      <CalendarEditFrom modalVisit={modalVisit} type={type} refresh={refresh} setModalVisit={setModalVisit} initValues={formValues} />
    </>
>>>>>>> Stashed changes
  )
}

export default CalendarList
