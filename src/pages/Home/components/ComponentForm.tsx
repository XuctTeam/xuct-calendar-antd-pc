/*
 * @Author: Derek Xu
 * @Date: 2022-12-20 09:04:06
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-22 15:59:14
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
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-components'
import { Checkbox, SelectProps } from 'antd'
import dayjs from 'dayjs'
import { FC, useRef, useState } from 'react'
import { FormattedMessage } from 'umi'
import RepeatFormItem from './RepeatFormItem'

interface IPageOption {
  id?: string
  open: boolean
  calendars: CALENDAR.Calendar[]
  setOpen: (open: any) => void
}

const ComponentForm: FC<IPageOption> = ({ calendars, open, setOpen }) => {
  const formRef = useRef<ProFormInstance>()
  const init = useIntl()
  const [fullDay, setFullDay] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<Date>(dayjs().toDate())
  const chinese = isChinese()
  const calendarItems: SelectProps['options'] = calendars.map((item) => {
    return {
      label: item.name,
      value: item.calendarId,
      color: item.color
    }
  })

  const repeatItems: SelectProps['options'] = [
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
  ]

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
        {fullDay ? (
          <ProFormDateRangePicker
            name='dateTimeRange'
            width='lg'
            label={<FormattedMessage id='pages.component.add.dtstart.label' />}
            rules={[{ required: true, message: init.formatMessage({ id: 'pages.component.add.dtstart.require' }) }]}
          />
        ) : (
          <ProFormDateTimeRangePicker
            name='dateTimeRange'
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
        )}

        <div>
          <div style={{ height: '34px' }}></div>
          <Checkbox
            onChange={() => {
              setFullDay(!fullDay)
            }}
          >
            <FormattedMessage id='pages.compoennt.add.full.day' />
          </Checkbox>
        </div>
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          options={repeatItems}
          width='sm'
          name='repeatStatus'
          label={<FormattedMessage id='pages.component.add.repeat.label' />}
          rules={[{ required: true, message: init.formatMessage({ id: 'pages.component.add.repeat.require' }) }]}
        />
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
      <ProFormDependency name={['repeatStatus']}>
        {({ repeatStatus }) => {
          if (repeatStatus !== '8') return <></>
          return <RepeatFormItem selectedDate={selectedDate} />
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
                name='alarmTime'
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
