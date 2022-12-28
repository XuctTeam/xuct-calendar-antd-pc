/*
 * @Author: Derek Xu
 * @Date: 2022-12-27 09:00:08
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-28 15:10:07
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\ComponentView.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { useIntl, useModel } from 'umi'
import { Button, Col, Modal, Radio, Row, Space } from 'antd'
import { FC, useEffect, useState } from 'react'
import { getComponentById, queryComponentMembers } from '@/services/calendar'
import dayjs from 'dayjs'
import { DifferentDay, SameDay } from '../ui'
import { UserOutlined } from '@ant-design/icons'
import ComponentAttendView from './ComponentAttendView'
import styles from './ComponentView.less'

interface IPageOption {
  id: string
  clientX: number
  clientY: number
  open: boolean
  setOpen: (open: any) => void
}

const ComponentView: FC<IPageOption> = ({ id, clientX, clientY, open, setOpen }) => {
  const init = useIntl()
  const { initialState } = useModel('@@initialState')
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
  const [createMemberId, setCreateMemberId] = useState<string>('')
  const [createMemberName, setCreateMemberName] = useState<string>('')
  const [attends, setAttends] = useState<CALENDAR.Attend[]>([])
  const [attendStatus, setAttendStatus] = useState<number>(1)

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
    const {
      summary,
      color,
      dtstart,
      dtend,
      fullDay,
      repeatStatus,
      repeatUntil,
      repeatInterval,
      repeatType,
      repeatByday,
      repeatBymonth,
      repeatBymonthday,
      creatorMemberId
    } = component
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
    setCreateMemberId(creatorMemberId)
  }

  const _initAttends = (createMemberId: string, attends: CALENDAR.Attend[]) => {
    setAttends([...attends, ...attends, ...attends, ...attends, ...attends, ...attends, ...attends, ...attends, ...attends, ...attends])
    const createMember: CALENDAR.Attend | undefined = attends.find((i) => i.memberId === createMemberId)
    const attend: CALENDAR.Attend | undefined = attends.find((i) => i.memberId === initialState?.currentUser?.member.id)
    setCreateMemberName(createMember?.name || '')
    setAttendStatus(attend?.status || 0)
  }

  return (
    <Modal
      title={init.formatMessage({ id: 'pages.component.view.title' })}
      style={{ position: 'absolute', top: clientY + 'px', left: clientX + 'px' }}
      open={open}
      onOk={setOpen}
      onCancel={setOpen}
      width={460}
      mask={false}
      destroyOnClose={true}
      footer={null}
    >
      <Row className={`${styles.calendar} ${styles.cell}`}>
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
      <Row className={styles.cell}>
        <Col span={2}>
          <UserOutlined />
        </Col>
        <Col>{createMemberName}</Col>
      </Row>
      <ComponentAttendView attends={attends}></ComponentAttendView>
      <Row className={styles.action}>
        <Col span={2}></Col>
        <Col span={12}>
          <Radio.Group
            size='small'
            value={attendStatus}
            options={
              initialState?.currentUser?.member.id === createMemberId
                ? [
                    { label: '接受', value: 1 },
                    { label: '拒绝', value: 2, disabled: true },
                    { label: '待定', value: 0, disabled: true }
                  ]
                : [
                    { label: '接受', value: 1 },
                    { label: '拒绝', value: 2 },
                    { label: '待定', value: 0 }
                  ]
            }
            optionType='button'
            buttonStyle='solid'
          />
        </Col>
        <Col span={2} offset={3}>
          <Space>
            <Button type='primary' size='small'>
              编辑
            </Button>
            <Button type='primary' danger size='small'>
              删除
            </Button>
          </Space>
        </Col>
      </Row>
    </Modal>
  )
}

export default ComponentView
