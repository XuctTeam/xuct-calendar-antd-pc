/*
 * @Author: Derek Xu
 * @Date: 2022-12-27 09:00:08
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-27 16:33:00
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\ComponentView.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { useIntl } from 'umi'
import { Col, Modal, Row } from 'antd'
import { FC, useEffect, useState } from 'react'
import { getComponentById, queryComponentMembers } from '@/services/calendar'
import styles from './ComponentView.less'
import dayjs from 'dayjs'
import { DifferentDay, SameDay } from '../ui'
import { UserOutlined } from '@ant-design/icons'

interface IPageOption {
  id: string
  clientX: number
  clientY: number
  open: boolean
  setOpen: (open: any) => void
}

const ComponentView: FC<IPageOption> = ({ id, clientX, clientY, open, setOpen }) => {
  const init = useIntl()
  const [summary, setSummary] = useState<string>('')
  const [color, setColor] = useState<string>('')
  const [dtstart, setDtstart] = useState<Date>(dayjs().toDate())
  const [dtend, setDtend] = useState<Date>(dayjs().toDate())
  const [fullDay, setFullDay] = useState<number>(0)
  const [repeatStatus, setRepeatStatus] = useState<string>('0')
  const [repeatUntil, setRepeatUntil] = useState<string>('')
  const [repeatInterval, setrepeatInterval] = useState<number>(0)
  const [repeatType, setRepeatType] = useState<string>('')
  const [repeatByday, setRepeatByday] = useState<string>('')
  const [repeatBymonth, setRepeatBymonth] = useState<string>('')
  const [repeatBymonthday, setRepeatBymonthday] = useState<string>('')
  const [createMemberName, setCreateMemberName] = useState<string>('')

  useEffect(() => {
    if (!id) return
    initData(id)
  }, [id])

  const initData = async (id: string) => {
    const result = await Promise.all([getComponentById(id), queryComponentMembers('', id)])
    if (!result || result.length !== 2) return
    _initComponent(result[0])
    _initAttends(result[0].creatorMemberId, result[1] as any as CALENDAR.Attend[])
  }

  const _initComponent = (component: CALENDAR.Component) => {
    const { summary, color, dtstart, dtend, fullDay, repeatStatus, repeatUntil, repeatInterval, repeatType, repeatByday, repeatBymonth, repeatBymonthday } =
      component
    setSummary(summary)
    setColor(color || 'blue')
    setDtstart(dtstart)
    setDtend(dtend)
    setFullDay(fullDay)
    setRepeatStatus(repeatStatus || '')
    setRepeatUntil(repeatUntil || '')
    setrepeatInterval(repeatInterval || 0)
    setRepeatType(repeatType || '')
    setRepeatByday(repeatByday || '')
    setRepeatBymonth(repeatBymonth || '')
    setRepeatBymonthday(repeatBymonthday || '')
  }

  const _initAttends = (createMemberId: string, attends: CALENDAR.Attend[]) => {
    const createMember: CALENDAR.Attend | undefined = attends.find((i) => i.memberId === createMemberId)
    setCreateMemberName(createMember?.name || '')
  }

  return (
    <Modal
      title={init.formatMessage({ id: 'pages.component.view.title' })}
      style={{ position: 'absolute', top: clientY + 'px', left: clientX + 'px' }}
      open={open}
      onOk={setOpen}
      onCancel={setOpen}
      width={500}
      mask={false}
      destroyOnClose={true}
    >
      <Row className={styles.calendar}>
        <Col span={2}>
          <div className={styles.circle} style={{ background: `#${color}`, border: `#${color}` }} />
        </Col>
        <Col>
          <div className={styles.summary}>{summary}</div>
          {dayjs(dtstart).isSame(dtend, 'date') ? (
            <SameDay
              dtstart={dtstart}
              dtend={dtend}
              fullDay={fullDay}
              repeatStatus={repeatStatus}
              repeatType={repeatType}
              repeatByday={repeatByday}
              repeatBymonth={repeatBymonth}
              repeatBymonthday={repeatBymonthday}
              repeatInterval={repeatInterval}
              repeatUntil={repeatUntil}
            ></SameDay>
          ) : (
            <DifferentDay
              dtstart={dtstart}
              dtend={dtend}
              fullDay={fullDay}
              repeatStatus={repeatStatus}
              repeatType={repeatType}
              repeatByday={repeatByday}
              repeatBymonth={repeatBymonth}
              repeatBymonthday={repeatBymonthday}
              repeatInterval={repeatInterval}
              repeatUntil={repeatUntil}
            ></DifferentDay>
          )}
        </Col>
      </Row>
      <Row>
        <Col span={2}>
          <UserOutlined />
        </Col>
        <Col>{createMemberName}</Col>
      </Row>
      <Row>
        <Col span={2}>
          <UserOutlined />
        </Col>
        <Col>3</Col>
      </Row>
    </Modal>
  )
}

export default ComponentView
