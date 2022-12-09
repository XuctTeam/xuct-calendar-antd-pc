/*
 * @Author: Derek Xu
 * @Date: 2022-12-07 18:10:24
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-09 18:04:04
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\CalendarEditFrom.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FC } from 'react'
import { ModalForm, ProForm, ProFormDependency, ProFormRadio, ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-components'
import { Form, message } from 'antd'
import { FormattedMessage, getIntl } from 'umi'

interface IPageOption {
  trigger: JSX.Element
}

const CalendarEditFrom: FC<IPageOption> = (props) => {
  const { trigger } = props
  const [form] = Form.useForm<{ name: string; description: string; display: number; alarmType: string }>()

  const getCalendarColor = (): any[] => {
    return ['ee0a24', '2eb82e', 'ffaa00', '3399ff', '990000', 'bb33ff', '3366cc', 'c68c53', '006600', 'ff99dd'].map((item) => {
      return {
        label: <div style={{ width: '16px', height: '16px', background: `#${item}`, marginBottom: '-2px' }}></div>,
        value: item
      }
    })
  }

  const alartTyleSelect = [
    {
      value: '0',
      label: <FormattedMessage id={'pages.calendar.add.alarmtype.select.none'} />
    },
    {
      value: '1',
      label: <FormattedMessage id={'pages.calendar.add.alarmtype.select.inner'} />
    },
    {
      value: '2',
      label: <FormattedMessage id={'pages.calendar.add.alarmtype.select.email'} />
    },
    {
      value: '3',
      label: <FormattedMessage id={'pages.calendar.add.alarmtype.select.wx'} />
    }
  ]

  const alarmTimeSelect = [
    {
      value: '15',
      label: <FormattedMessage id={'pages.calendar.add.alarmtime.select.fifteen'} />
    },
    {
      value: '30',
      label: <FormattedMessage id={'pages.calendar.add.alarmtime.select.thirty'} />
    },
    {
      value: '60',
      label: <FormattedMessage id={'pages.calendar.add.alarmtime.select.sixty'} />
    }
  ]

  return (
    <ModalForm<{
      name: string
      description: string
      display: number
      alarmType: string
    }>
      title={<FormattedMessage id='pages.calendar.add.title' />}
      trigger={trigger}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true
      }}
      omitNil
      submitTimeout={2000}
      onFinish={async (values) => {
        console.log(values.name)
        message.success('提交成功')
        return true
      }}
    >
      <ProFormText
        width='lg'
        name='name'
        required
        label={<FormattedMessage id={'pages.calendar.add.name.label'} />}
        tooltip='最长为 24 位'
        placeholder={getIntl().formatMessage({ id: 'pages.calendar.add.name.placeholder' })}
        rules={[{ required: true, message: <FormattedMessage id={'pages.calendar.add.name.error'} /> }]}
      />
      <ProFormRadio.Group label={<FormattedMessage id={'pages.calendar.add.color.label'} />} name='color' initialValue='ee0a24' options={getCalendarColor()} />
      <ProFormTextArea
        width='lg'
        name='description'
        label={<FormattedMessage id={'pages.calendar.add.description.label'} />}
        placeholder={getIntl().formatMessage({ id: 'pages.calendar.add.description.placeholder' })}
      />
      <ProFormSwitch name='display' label={<FormattedMessage id={'pages.calendar.add.display.label'} />} />
      <ProForm.Group key='group'>
        <ProFormSelect
          required
          options={alartTyleSelect}
          width='md'
          name='alarmType'
          label={<FormattedMessage id={'pages.calendar.add.alarmtype.label'} />}
          rules={[{ required: true, message: <FormattedMessage id={'pages.calendar.add.alarmtype.error'} /> }]}
        />
        <ProFormDependency name={['alarmType']}>
          {({ alarmType }) => {
            if (alarmType === '0') {
              return <ProFormText width='md' name='alarmTime' label={<FormattedMessage id={'pages.calendar.add.alarmtime.label'} />} disabled />
            }
            return (
              <ProFormSelect
                required
                options={alarmTimeSelect}
                width='md'
                name='alarmTime'
                label={<FormattedMessage id={'pages.calendar.add.alarmtime.label'} />}
              />
            )
          }}
        </ProFormDependency>
      </ProForm.Group>
    </ModalForm>
  )
}

export default CalendarEditFrom
