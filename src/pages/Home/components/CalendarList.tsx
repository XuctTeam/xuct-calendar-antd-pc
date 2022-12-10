/*
 * @Author: Derek Xu
 * @Date: 2022-12-02 16:39:55
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-10 20:34:32
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\CalendarList.tsx
 * @Description:
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */

import { PlusOutlined } from '@ant-design/icons'
import { ProCard } from '@ant-design/pro-components'
import { Button, Empty, Spin } from 'antd'
import { FC } from 'react'
import { FormattedMessage } from 'umi'
import ColoredCheckboxes from './ColoredCheckboxes'
import CalendarEditFrom from './CalendarEditFrom'
import styles from '../index.less'

interface IPageOption {
  loading: boolean
  calendars: CALENDAR.Calendar[]
  calendarChageDisplay: (calendarId: string, display: number) => void
  refresh: () => void
}

const CalendarList: FC<IPageOption> = (props) => {
  const { loading, calendars, calendarChageDisplay, refresh } = props

  const checkboxCheck = (id: string, checked: boolean) => {
    calendarChageDisplay(id, !checked ? 0 : 1)
  }

  return (
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
  )
}

export default CalendarList
