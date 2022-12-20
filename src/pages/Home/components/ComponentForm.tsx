/*
 * @Author: Derek Xu
 * @Date: 2022-12-20 09:04:06
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-20 20:42:36
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\ComponentForm.tsx
 * @Description:
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */

import { useIntl } from '@/.umi/plugin-locale'
import {
  ModalForm,
  ProForm,
  ProFormCheckbox,
  ProFormDateRangePicker,
  ProFormDateTimeRangePicker,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-components'
import { Checkbox } from 'antd'
import { FC, useRef, useState } from 'react'
import { FormattedMessage } from 'umi'

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
  const calendarItems = calendars.map((item) => {
    return {
      label: item.name,
      value: item.calendarId,
      color: item.color
    }
  })

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
