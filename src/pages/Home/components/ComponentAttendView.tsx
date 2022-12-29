/*
 * @Author: Derek Xu
 * @Date: 2022-12-28 11:42:14
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-29 09:14:52
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\ComponentAttendView.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FormattedMessage } from '@/.umi/plugin-locale'
import { CheckOutlined, CloseOutlined, InfoOutlined, TeamOutlined } from '@ant-design/icons'
import { Button, Col, Row, Tag } from 'antd'
import { FC, useState, useEffect } from 'react'
import styles from './ComponentAttendView.less'

interface IPageOption {
  attends: CALENDAR.Attend[]
}

const ComponentAttendView: FC<IPageOption> = ({ attends }) => {
  const [accept, setAccept] = useState<number>(0)
  const [reject, setReject] = useState<number>(0)
  const [users, setUsers] = useState<CALENDAR.Attend[]>([])

  useEffect(() => {
    setAccept(attends.filter((i) => i.status === 1).length)
    setReject(attends.filter((i) => i.status === 0).length)
    setUsers(attends.length > 20 ? [...attends.slice(0, 20)] : attends)
  }, [attends])

  return (
    <Row className={styles.cell}>
      <Col span={2}>
        <TeamOutlined />
      </Col>
      <Col span={22} className={styles.attend}>
        <div>
          <FormattedMessage id='pages.component.view.invited' /> {attends.length} <FormattedMessage id='pages.component.view.person' />；
          <FormattedMessage id='pages.component.view.accept' />： {accept} ； <FormattedMessage id='pages.component.view.reject' />: {reject}
        </div>
        <div>
          {users.map((item, index) => {
            return (
              <span key={index}>
                <Tag
                  icon={item.status === 1 ? <CheckOutlined /> : item.status === 2 ? <CloseOutlined /> : <InfoOutlined />}
                  color={item.status === 1 ? 'success' : item.status === 2 ? 'error' : 'processing'}
                >
                  {item.name}
                </Tag>
              </span>
            )
          })}
        </div>
        {attends.length > 20 && (
          <Button block type='link'>
            <FormattedMessage id='pages.component.view.more' />
          </Button>
        )}
      </Col>
    </Row>
  )
}

export default ComponentAttendView
