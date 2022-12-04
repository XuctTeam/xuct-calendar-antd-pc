/*
 * @Author: Derek Xu
 * @Date: 2022-12-02 16:39:55
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-02 17:47:36
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
import styles from '../index.less'

interface IPageOption {
  loading: boolean
  calendars: CALENDAR.Calendar[]
}

const CalendarList: FC<IPageOption> = (props) => {
  const { loading, calendars } = props

  const checkboxCheck = (id: string, checked: boolean) => {
    debugger
  }

  return (
    <ProCard
      title={<FormattedMessage id='page.calendar.manager.title' />}
      hoverable
      bordered
      headerBordered
      className={styles.card}
      extra={<Button type='primary' danger shape='round' icon={<PlusOutlined />} size='small' />}
    >
      <Spin spinning={loading}>
        <div className={styles.body}>
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
        </div>
      </Spin>
    </ProCard>
  )
}

export default CalendarList
