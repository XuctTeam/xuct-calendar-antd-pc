/*
 * @Author: Derek Xu
 * @Date: 2022-12-20 09:04:06
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-24 20:55:36
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\ComponentForm.tsx
 * @Description:
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */

import { useIntl } from '@/.umi/plugin-locale'
import { isChinese, dayWeekInMonth, dayInYear } from '@/utils/calendar'
import {
  ModalForm,
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
import { FormattedMessage } from 'umi'
import RepeatFormItem from './RepeatFormItem'
import { saveOrUpdateComponent } from '@/services/calendar'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

interface IPageOption {
  id?: string
  open: boolean
  calendars: CALENDAR.Calendar[]
  setOpen: (open: any) => void
  refresh: () => void
}

const ComponentForm: FC<IPageOption> = ({ calendars, open, setOpen, refresh }) => {
  const formRef = useRef<ProFormInstance>()
  const init = useIntl()
  const repeatRef = useRef<any>()
  const [id, setId] = useState<string>('')
  const chinese = isChinese()
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
      label: `${
        init.formatMessage({ id: 'pages.component.add.alarm.select.label' }) + '15' + init.formatMessage({ id: 'pages.component.add.alarm.select.min' })
      }`
    },
    {
      value: '30',
      label: `${
        init.formatMessage({ id: 'pages.component.add.alarm.select.label' }) + '30' + init.formatMessage({ id: 'pages.component.add.alarm.select.min' })
      }`
    },
    {
      value: '60',
      label: `${
        init.formatMessage({ id: 'pages.component.add.alarm.select.label' }) + '60' + init.formatMessage({ id: 'pages.component.add.alarm.select.min' })
      }`
    },
    {
      value: '1440',
      label: `${
        init.formatMessage({ id: 'pages.component.add.alarm.select.label' }) + '1' + init.formatMessage({ id: 'pages.component.add.alarm.select.day' })
      }`
    }
  ]

  return (
    <ModalForm<{
      summary: string
      description: string
      display: number
      alarmType: string
      alarmTime: string
    }>
      title={<FormattedMessage id='pages.component.add.title' />}
      formRef={formRef}
      autoFocusFirstInput
      open={open}
      preserve
      modalProps={{
        destroyOnClose: true
      }}
      omitNil
      onOpenChange={setOpen}
      submitTimeout={2000}
      onFinish={async (values: any) => {
        const { repeatStatus, dtTime, calendar, ...comp } = values
        let repeatValues
        if (repeatStatus === '8') {
          repeatValues = repeatRef.current.repeatValues()
          if (!repeatValues) {
            return false
          }
        }
        try {
          await saveOrUpdateComponent({
            ...comp,
            ...repeatValues,
            ...{ calendarId: calendar, dtstart: dayjs(dtTime[0]).toDate(), dtend: dayjs(dtTime[1]).toDate() }
          })
        } catch (err) {
          console.log(err)
          return false
        }
        message.success(init.formatMessage({ id: !id ? 'pages.calendar.mananger.component.add.success' : 'pages.calendar.mananger.component.edit.success' }))
        setOpen(false)
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
          label={init.formatMessage({ id: 'pages.compoennt.add.full.day' })}
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
                    label: init.formatMessage({ id: 'pages.component.add.repeat.week.mo.fr' }),
                    value: '2'
                  },
                  {
                    label: init.formatMessage({ id: 'pages.component.add.repeat.week.st.su' }),
                    value: '3'
                  },
                  {
                    label: init.formatMessage({ id: 'pages.component.add.repeat.week.st' }),
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
                    label: `${init.formatMessage({ id: 'pages.component.add.repeat.every.year' }) + '（' + dayInYear(selectedDate) + '）'}`,
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
          return <RepeatFormItem selectedDate={selectedDate} ref={repeatRef} />
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

      <ProFormTextArea
        name='description'
        width='xl'
        label={<FormattedMessage id='pages.component.add.description.label' />}
        placeholder={init.formatMessage({ id: 'pages.component.add.description.placeholder' })}
      />
    </ModalForm>
  )
}

export default ComponentForm
