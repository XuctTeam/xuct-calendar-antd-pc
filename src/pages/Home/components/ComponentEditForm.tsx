/*
 * @Author: Derek Xu
 * @Date: 2022-12-20 09:04:06
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-01-06 18:03:33
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\ComponentEditForm.tsx
 * @Description:
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */

import { isChinese, dayWeekInMonth, dayInYear } from '@/utils/calendar'
import {
  DrawerForm,
  ProForm,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDateTimeRangePicker,
  ProFormDependency,
  ProFormInstance,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-components'
import { message, SelectProps } from 'antd'
import dayjs from 'dayjs'
import { FC, useRef, useState } from 'react'
import { useIntl, FormattedMessage } from 'umi'
import RepeatFormItem from './RepeatFormItem'
import { saveOrUpdateComponent } from '@/services/calendar'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { EventEmitter } from 'ahooks/lib/useEventEmitter'
import ComponentAttendChoose from './ComponentAttendChoose'

interface IPageOption {
  visable: boolean
  calendars: CALENDAR.Calendar[]
  setVisable: (open: any) => void
  refresh: () => void
  busEmitter: EventEmitter<Event.Action>
}

const ComponentForm: FC<IPageOption> = ({ calendars, visable, setVisable, refresh, busEmitter }) => {
  const formRef = useRef<ProFormInstance>()
  const init = useIntl()
  const repeatRef = useRef<any>()
  const chinese = isChinese()
  const [initialValues, setInitialValues] = useState<any>()
  const [repeatInitialValues, setRepeatInitialValues] = useState<any>()
  const [attendVisable, setAttendVisable] = useState<boolean>(false)

  const calendarItems: SelectProps['options'] = calendars.map((item) => {
    return {
      label: item.name,
      value: item.calendarId,
      color: item.color
    }
  })

  const alarmTypeItem: SelectProps['options'] = [
    {
      value: '0',
      label: init.formatMessage({ id: 'pages.component.add.alarm.select.none' })
    },
    {
      value: '1',
      label: init.formatMessage({ id: 'pages.component.add.alarm.select.inner.message' })
    },
    {
      value: '2',
      label: init.formatMessage({ id: 'pages.component.add.alarm.select.email' })
    },
    {
      value: '3',
      label: init.formatMessage({ id: 'pages.component.add.alarm.select.official.accounts' })
    }
  ]

  const alramTimeItem: SelectProps['options'] = [
    {
      value: '15',
      label: `${init.formatMessage({ id: 'pages.component.add.alarm.select.label' }) + '15' + init.formatMessage({ id: 'pages.component.repeat.min' })}`
    },
    {
      value: '30',
      label: `${init.formatMessage({ id: 'pages.component.add.alarm.select.label' }) + '30' + init.formatMessage({ id: 'pages.component.repeat.min' })}`
    },
    {
      value: '60',
      label: `${init.formatMessage({ id: 'pages.component.add.alarm.select.label' }) + '60' + init.formatMessage({ id: 'pages.component.repeat.min' })}`
    },
    {
      value: '1440',
      label: `${
        init.formatMessage({ id: 'pages.component.add.alarm.select.label' }) + '1' + init.formatMessage({ id: 'pages.component.add.alarm.select.day' })
      }`
    }
  ]

  const drawFormOpenChage = (e: any) => {
    if (e) return
    setInitialValues(undefined)
    setRepeatInitialValues(undefined)
    setVisable(false)
  }

  busEmitter.useSubscription((values: Event.Action) => {
    const { action, data } = values
    if (!(action === 'event_edit' || action === 'event_create')) return
    setVisable(true)
    switch (action) {
      case 'event_edit':
        _componentEdit(data)
        break
      case 'event_create':
        _componentCreate(data)
        break
    }
  })

  const _componentCreate = (data: any) => {
    const { startStr, endStr, fullDay } = data
    setInitialValues({
      dtTime: [startStr, endStr],
      fullDay
    })
  }

  const _componentEdit = (data: any) => {
    const { dtstart, dtend, calendarId, alarmType, repeatStatus, repeatType, repeatInterval, repeatByday, repeatBymonth, repeatBymonthday, ...comp } = data
    let _alarmType
    switch (alarmType) {
      default:
        _alarmType = '0'
    }
    setInitialValues({
      ...comp,
      calendar: calendarId,
      alarmType: _alarmType,
      repeatStatus,
      dtTime: [dtstart, dtend]
    })
    if (repeatStatus !== '8') return
    setRepeatInitialValues({
      repeatType,
      repeatInterval,
      repeatByday,
      repeatBymonth,
      repeatBymonthday
    })
  }

  return (
    <>
      <DrawerForm<{
        summary: string
        description: string
        display: number
        alarmType: string
        alarmTime: string
      }>
        title={<FormattedMessage id='pages.component.add.title' />}
        formRef={formRef}
        autoFocusFirstInput
        open={visable}
        preserve
        initialValues={initialValues}
        drawerProps={{
          destroyOnClose: true
        }}
        omitNil
        onOpenChange={drawFormOpenChage}
        submitTimeout={2000}
        onFinish={async (values: any) => {
          const { repeatStatus, dtTime, calendar, alarmTimes, fullDay, ...comp } = values
          const dtStart = dayjs(dtTime[0]).toDate()
          let repeatValues = {
            repeatStatus: repeatStatus,
            repeatType: '',
            repeatInterval: 1,
            repeatBymonthday: '',
            repeatBymonth: '',
            repeatByday: ''
          }
          switch (repeatStatus) {
            case '8':
              repeatValues = repeatRef.current.repeatValues()
              break
            case '1':
              repeatValues.repeatType = 'DAILY'
              break
            case '2':
              repeatValues.repeatType = 'WEEKLY'
              repeatValues.repeatByday = '0:1,0:2,0:3,0:4,0:5'
              break
            case '3':
              repeatValues.repeatType = 'WEEKLY'
              repeatValues.repeatByday = '0:6,0:0'
              break
            case '4':
              repeatValues.repeatType = 'WEEKLY'
              repeatValues.repeatByday = '0:6'
              break
            case '5':
              repeatValues.repeatType = 'MONTHLY'
              repeatValues.repeatBymonthday = `${dayjs(dtStart).get('date')}`
              break
            case '6':
              repeatValues.repeatType = 'MONTHLY'
              repeatValues.repeatByday = Math.ceil(dtStart.getDate() / 7) + ':' + dayjs(dtStart).day()
              break
            case '7':
              repeatValues.repeatType = 'YEARLY'
              repeatValues.repeatBymonth = `${dayjs(dtStart).get('month') + 1}`
              repeatValues.repeatBymonthday = `${dayjs(dtStart).get('date')}`
              break
          }
          try {
            await saveOrUpdateComponent({
              ...comp,
              id: initialValues?.id,
              fullDay: fullDay ? 1 : 0,
              ...repeatValues,
              alarmTimes: alarmTimes || [],
              ...{ calendarId: calendar, dtstart: dtStart, dtend: dayjs(dtTime[1]).toDate() }
            })
          } catch (err) {
            console.log(err)
            return false
          }
          message.success(
            init.formatMessage({ id: !initialValues?.id ? 'pages.calendar.mananger.component.add.success' : 'pages.calendar.mananger.component.edit.success' })
          )
          setVisable(false)
          refresh()
          return true
        }}
      >
        <ProFormText
          width='xl'
          name='summary'
          label={<FormattedMessage id='pages.component.add.summary.label' />}
          placeholder={init.formatMessage({ id: 'pages.component.add.summary.placeholder' })}
          rules={[{ required: true, message: init.formatMessage({ id: 'pages.component.add.summary.require' }) }]}
        />
        <ProFormSelect
          name='calendar'
          width='xl'
          label={<FormattedMessage id='pages.component.add.calendar.label' />}
          options={calendarItems}
          fieldProps={{
            optionItemRender(item) {
              return <span style={{ color: `#${item.color}` }}>{item.label}</span>
            }
          }}
          placeholder={init.formatMessage({ id: 'pages.component.add.calendar.placeholder' })}
          rules={[{ required: true, message: init.formatMessage({ id: 'pages.component.add.calendar.require' }) }]}
        />
        <ProFormText
          width='xl'
          name='location'
          label={<FormattedMessage id='pages.component.add.location.label' />}
          placeholder={init.formatMessage({ id: 'pages.component.add.location.placeholder' })}
        />
        <ProForm.Group>
          <ProFormSwitch
            name='fullDay'
            label={init.formatMessage({ id: 'pages.compoennt.repeat.full.day' })}
            fieldProps={{
              checkedChildren: <CheckOutlined />,
              unCheckedChildren: <CloseOutlined />
            }}
          />
          <ProFormDependency name={['fullDay']}>
            {({ fullDay }) => {
              if (fullDay) {
                return (
                  <ProFormDateRangePicker
                    name='dtTime'
                    width='lg'
                    label={<FormattedMessage id='pages.component.add.dtstart.label' />}
                    rules={[{ required: true, message: init.formatMessage({ id: 'pages.component.add.dtstart.require' }) }]}
                  />
                )
              }

              return (
                <ProFormDateTimeRangePicker
                  name='dtTime'
                  width='lg'
                  label={<FormattedMessage id='pages.component.add.dtstart.label' />}
                  fieldProps={{
                    showTime: {
                      minuteStep: 5,
                      secondStep: 10
                    }
                  }}
                  rules={[{ required: true, message: init.formatMessage({ id: 'pages.component.add.dtstart.require' }) }]}
                />
              )
            }}
          </ProFormDependency>
        </ProForm.Group>
        <ProForm.Group>
          <ProFormDependency name={['dtTime']}>
            {({ dtTime }) => {
              const selectedDate = !dtTime ? new Date() : dayjs(dtTime[0]).toDate()
              return (
                <ProFormSelect
                  options={[
                    {
                      label: init.formatMessage({ id: 'pages.component.add.repeat.norepeat' }),
                      value: '0'
                    },
                    {
                      label: init.formatMessage({ id: 'pages.component.add.repeat.everyday' }),
                      value: '1'
                    },
                    {
                      label: init.formatMessage({ id: 'pages.component.repeat.week.mo.fr' }),
                      value: '2'
                    },
                    {
                      label: init.formatMessage({ id: 'pages.component.repeat.week.st.su' }),
                      value: '3'
                    },
                    {
                      label: init.formatMessage({ id: 'pages.component.repeat.week.st' }),
                      value: '4'
                    },
                    {
                      label: `${
                        init.formatMessage({ id: 'pages.component.add.repeat.every.month' }) +
                        (chinese ? dayjs(selectedDate).format('（DD日）') : dayjs(selectedDate).format('（DD）'))
                      }`,
                      value: '5'
                    },
                    {
                      label: `${init.formatMessage({ id: 'pages.component.add.repeat.every.month' }) + '（' + dayWeekInMonth(selectedDate) + '）'}`,
                      value: '6'
                    },
                    {
                      label: `${init.formatMessage({ id: 'pages.component.repeat.every.year' }) + '（' + dayInYear(selectedDate) + '）'}`,
                      value: '7'
                    },
                    {
                      label: init.formatMessage({ id: 'pages.component.add.repeat.custom' }),
                      value: '8'
                    }
                  ]}
                  width='sm'
                  name='repeatStatus'
                  label={<FormattedMessage id='pages.component.add.repeat.label' />}
                  rules={[{ required: true, message: init.formatMessage({ id: 'pages.component.add.repeat.require' }) }]}
                />
              )
            }}
          </ProFormDependency>
          <ProFormDependency name={['repeatStatus']}>
            {({ repeatStatus }) => {
              if (repeatStatus && repeatStatus !== '0') {
                return (
                  <ProFormDatePicker
                    width='sm'
                    name='repeatUntil'
                    label={<FormattedMessage id='pages.component.add.repeat.until.label' />}
                    rules={[{ required: true, message: init.formatMessage({ id: 'pages.component.add.repeat.until.require' }) }]}
                  />
                )
              }
              return <></>
            }}
          </ProFormDependency>
        </ProForm.Group>
        <ProFormDependency name={['repeatStatus', 'dtTime']}>
          {({ repeatStatus, dtTime }) => {
            if (repeatStatus !== '8') return <></>
            const selectedDate = !dtTime ? new Date() : dayjs(dtTime[0]).toDate()
            return <RepeatFormItem selectedDate={selectedDate} ref={repeatRef} initialValues={repeatInitialValues} />
          }}
        </ProFormDependency>
        <ProForm.Group>
          <ProFormSelect
            name='alarmType'
            width='sm'
            label={<FormattedMessage id='pages.component.add.alarm.type.label' />}
            options={alarmTypeItem}
            rules={[{ required: true, message: init.formatMessage({ id: 'pages.component.add.alarm.type.rquire' }) }]}
          />
          <ProFormDependency name={['alarmType']}>
            {({ alarmType }) => {
              if (!alarmType || alarmType === '0') return <></>
              return (
                <ProFormSelect
                  name='alarmTimes'
                  width='md'
                  label={<FormattedMessage id='pages.component.add.alarm.time.label' />}
                  options={alramTimeItem}
                  placeholder='Please select a country'
                  rules={[{ required: true, message: init.formatMessage({ id: 'pages.component.add.alarm.time.rquire' }) }]}
                  fieldProps={{
                    mode: 'multiple'
                  }}
                />
              )
            }}
          </ProFormDependency>
        </ProForm.Group>

        <ProFormText
          width='xl'
          name='name'
          required
          dependencies={[['contract', 'name']]}
          addonAfter={<a onClick={() => setAttendVisable(true)}>点击查看更多</a>}
          label='签约客户名称'
          tooltip='最长为 24 位'
          placeholder='请输入名称'
          rules={[{ required: true, message: '这是必填项' }]}
        />

        <ProFormTextArea
          name='description'
          width='xl'
          label={<FormattedMessage id='pages.component.add.description.label' />}
          placeholder={init.formatMessage({ id: 'pages.component.add.description.placeholder' })}
        />
      </DrawerForm>
      <ComponentAttendChoose visable={attendVisable} setVisable={() => setAttendVisable(false)} />
    </>
  )
}

export default ComponentForm
