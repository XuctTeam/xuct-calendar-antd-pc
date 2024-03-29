/*
 * @Author: Derek Xu
 * @Date: 2022-12-27 09:00:08
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-10-08 19:03:30
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\ComponentView.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { deleteComponent, getComponentById, queryComponentMembers } from '@/services/calendar'
import { DiffOutlined, ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons'
import { useSetState } from 'ahooks'
import { EventEmitter } from 'ahooks/lib/useEventEmitter'
import { Button, Col, Divider, Modal, Row, Select, Spin, message } from 'antd'
import dayjs from 'dayjs'
import { FC } from 'react'
import { FormattedMessage, useIntl, useModel } from 'umi'
import { ComponentAttendView, DifferentDay, SameDay } from '../ui'
import styles from './ComponentView.less'

interface IPageOption {
  refresh: () => void
  busEmitter: EventEmitter<Event.Action>
}

interface State {
  loading: boolean
  id: string
  summary: string
  color: string
  dtstart: Date
  dtend: Date
  calendarId: string
  fullDay: number
  location: string
  repeatStatus: string
  repeatUntil: string
  repeatInterval: number
  repeatType: string
  repeatByday: string
  repeatBymonth: string
  repeatBymonthday: string
  creatorMemberId: string
  creatorMemberName: string
  description: string
  alarmType: string
  alarmTimes: string
  attends: CALENDAR.Attend[]
  attendStatus: number
  visible: boolean
  left: number
  top: number
}
const doc = window.document

const ComponentView: FC<IPageOption> = ({ refresh, busEmitter }) => {
  const init = useIntl()
  const { initialState } = useModel('@@initialState')
  const [state, setState] = useSetState<State>({
    loading: false,
    id: '',
    summary: '',
    color: '',
    calendarId: '',
    dtstart: dayjs().toDate(),
    dtend: dayjs().toDate(),
    repeatStatus: '',
    location: '',
    fullDay: 0,
    repeatUntil: '',
    repeatType: '',
    repeatInterval: 0,
    repeatByday: '',
    repeatBymonth: '',
    repeatBymonthday: '',
    creatorMemberId: '',
    creatorMemberName: '',
    description: '',
    alarmType: '',
    alarmTimes: '',
    attends: [],
    attendStatus: 0,
    visible: false,
    left: 0,
    top: 0
  })

  busEmitter.useSubscription((values: any) => {
    const { action, data } = values
    if (action !== 'event_view') return
    const { id, x, y } = data
    initData(id, x, y)
  })

  const initData = async (id: string, x: number, y: number) => {
    setState({
      loading: true
    })
    const result = await Promise.all([getComponentById(id), queryComponentMembers('', id)])
    setState({
      loading: false
    })
    if (!result || result.length !== 2) return
    const attends = result[1] as any as CALENDAR.Attend[]
    _initComponent(result[0])
    _initAttends(result[0].creatorMemberId, attends)
    _initModalProp(id, x, y, attends.length)
  }

  const _initComponent = (component: CALENDAR.Component) => {
    const {
      id,
      summary,
      color,
      dtstart,
      dtend,
      location,
      fullDay,
      repeatStatus,
      repeatUntil,
      repeatInterval,
      calendarId,
      alarmTimes,
      repeatType,
      repeatByday,
      repeatBymonth,
      repeatBymonthday,
      creatorMemberId,
      description,
      alarmType
    } = component

    setState({
      id,
      summary,
      color: color || 'blue',
      dtstart,
      dtend,
      calendarId,
      location,
      fullDay: fullDay,
      repeatStatus: repeatStatus || '',
      repeatInterval: repeatInterval || 0,
      repeatType: repeatType || '',
      repeatUntil: repeatUntil || '',
      repeatByday: repeatByday || '',
      repeatBymonth: repeatBymonth || '',
      description,
      repeatBymonthday: repeatBymonthday || '',
      creatorMemberId,
      alarmType,
      alarmTimes: alarmTimes || ''
    })
  }

  const _initAttends = (createMemberId: string, attends: CALENDAR.Attend[]) => {
    const createMember: CALENDAR.Attend | undefined = attends.find((i) => i.memberId === createMemberId)
    const attend: CALENDAR.Attend | undefined = attends.find((i) => i.memberId === initialState?.currentUser?.member.id)
    setState({
      attends,
      creatorMemberName: createMember?.name || '',
      attendStatus: attend?.status || 0
    })
  }

  const _initModalProp = (id: string, x: number, y: number, len: number) => {
    const { clientWidth, clientHeight } = doc.body
    let h = 350
    if (len !== 1) {
      const diff = Math.ceil(len / 5)
      h += (diff > 4 ? 4 : diff) * 20 + 10 * diff
    }
    setState({
      id,
      left: x + 480 > clientWidth ? clientWidth - 480 : x,
      top: y + h > clientHeight ? clientHeight - h : y,
      visible: true
    })
  }

  const deleteEvent = () => {
    Modal.confirm({
      title: init.formatMessage({ id: 'pages.component.view.delete.title' }),
      centered: true,
      icon: <ExclamationCircleOutlined />,
      content: init.formatMessage({ id: 'pages.component.view.delete.content' }),
      onOk: () => {
        _deleteEvent()
      }
    })
  }

  const editEvent = () => {
    setState({
      visible: false
    })
    const { loading, top, left, visible: visible, ...comp } = state
    busEmitter.emit({
      action: 'event_edit',
      data: {
        ...comp
      }
    })
  }

  const _deleteEvent = async () => {
    await deleteComponent(state.id)
    message.success(init.formatMessage({ id: 'pages.component.view.delete.success' }))
    setState({
      visible: false
    })
    refresh()
  }

  return (
    <Modal
      style={{ position: 'absolute', top: state.top + 'px', left: state.left + 'px', zIndex: 999 }}
      open={state.visible}
      onCancel={() => setState({ visible: false })}
      width={460}
      mask={false}
      destroyOnClose={true}
      footer={null}
    >
      <Spin spinning={state.loading}>
        <div className={styles.container}>
          <Row className={`${styles.calendar} ${styles.cell}`}>
            <Col span={2}>
              <div className={styles.circle} style={{ background: `#${state.color}`, border: `#${state.color}` }} />
            </Col>
            <Col>
              <span className={styles.summary}>{state.summary}</span>
            </Col>
          </Row>
          <Row>
            <Col offset={2}>
              {dayjs(state.dtstart).isSame(state.dtend, 'date') ? (
                <SameDay
                  dtstart={state.dtstart}
                  dtend={state.dtend}
                  fullDay={state.fullDay}
                  repeatStatus={state.repeatStatus}
                  repeatType={state.repeatType}
                  repeatByday={state.repeatByday}
                  repeatBymonth={state.repeatBymonth}
                  repeatBymonthday={state.repeatBymonthday}
                  repeatInterval={state.repeatInterval}
                  repeatUntil={state.repeatUntil}
                ></SameDay>
              ) : (
                <DifferentDay
                  dtstart={state.dtstart}
                  dtend={state.dtend}
                  fullDay={state.fullDay}
                  repeatStatus={state.repeatStatus}
                  repeatType={state.repeatType}
                  repeatByday={state.repeatByday}
                  repeatBymonth={state.repeatBymonth}
                  repeatBymonthday={state.repeatBymonthday}
                  repeatInterval={state.repeatInterval}
                  repeatUntil={state.repeatUntil}
                ></DifferentDay>
              )}
            </Col>
          </Row>
          <Row className={styles.cell}>
            <Col span={2}>
              <UserOutlined />
            </Col>
            <Col>{state.creatorMemberName}</Col>
          </Row>
          <Row className={styles.cell}>
            <Col span={2}>
              <DiffOutlined />
            </Col>
            <Col>{state.description || ''}</Col>
          </Row>
          {state.attends.length > 1 && <ComponentAttendView attends={state.attends}></ComponentAttendView>}
        </div>
        <div>
          <Divider />
          <Row>
            <Col span={8}>
              <Select
                value={state.attendStatus}
                size='small'
                bordered={false}
                style={{ width: '100px' }}
                options={
                  initialState?.currentUser?.member.id === state.creatorMemberId
                    ? [
                        { label: init.formatMessage({ id: 'pages.component.view.accept' }), value: 1 },
                        { label: init.formatMessage({ id: 'pages.component.view.reject' }), value: 2, disabled: true },
                        { label: init.formatMessage({ id: 'pages.component.view.unknow' }), value: 0, disabled: true }
                      ]
                    : [
                        { label: init.formatMessage({ id: 'pages.component.view.accept' }), value: 1 },
                        { label: init.formatMessage({ id: 'pages.component.view.reject' }), value: 2 },
                        { label: init.formatMessage({ id: 'pages.component.view.unknow' }), value: 0 }
                      ]
                }
              />
            </Col>
            <Col span={6} offset={10} className={styles.btns}>
              <Button type='link' size='small' onClick={editEvent}>
                <FormattedMessage id='pages.component.view.button.edit' />
              </Button>
              <Divider type='vertical' />
              <Button type='link' danger size='small' onClick={deleteEvent}>
                <FormattedMessage id='pages.component.view.button.delete' />
              </Button>
            </Col>
          </Row>
        </div>
      </Spin>
    </Modal>
  )
}

export default ComponentView
