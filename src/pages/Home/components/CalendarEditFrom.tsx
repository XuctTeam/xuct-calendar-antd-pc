/*
 * @Author: Derek Xu
 * @Date: 2022-12-07 18:10:24
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-10 12:33:03
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\CalendarEditFrom.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FC } from 'react'
import { ModalForm, ProForm, ProFormDependency, ProFormRadio, ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-components'
import { Form, message } from 'antd'
import { FormattedMessage, getIntl } from 'umi'
import { saveOrUpdateCalendar } from '@/services/calendar'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

interface IPageOption {
  trigger: JSX.Element
  refresh: () => void
}

const CalendarEditFrom: FC<IPageOption> = (props) => {
  const { trigger, refresh } = props
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
      onFinish={async (values: any) => {
        const { display = true, alarmTime = 0, isShare = 0 } = values
        try {
          await saveOrUpdateCalendar({
            ...values,
            display: display ? 1 : 0,
            isShare: isShare ? 1 : 0,
            alarmTime
          })
          message.success(getIntl().formatMessage({ id: 'pages.calendar.mananger.add.success' }))
          refresh()
        } catch (err) {
          console.log(err)
        }
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
      <ProForm.Group>
        <ProFormSwitch
          name='display'
          label={<FormattedMessage id={'pages.calendar.add.display.label'} />}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
        <div style={{ width: '200px' }}></div>
        <ProFormSwitch
          name='isShare'
          label={<FormattedMessage id={'pages.calendar.add.isshare.label'} />}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      </ProForm.Group>
      <ProFormTextArea
        width='lg'
        name='description'
        label={<FormattedMessage id={'pages.calendar.add.description.label'} />}
        placeholder={getIntl().formatMessage({ id: 'pages.calendar.add.description.placeholder' })}
      />

      <ProForm.Group key='group'>
        <ProFormSelect
          required
          options={alartTyleSelect}
          width='sm'
          name='alarmType'
          label={<FormattedMessage id={'pages.calendar.add.alarmtype.label'} />}
          rules={[{ required: true, message: <FormattedMessage id={'pages.calendar.add.alarmtype.error'} /> }]}
        />
        <ProFormDependency name={['alarmType']}>
          {({ alarmType }: any) => {
            if (alarmType === '0') {
              return <ProFormText width='sm' name='alarmTime' label={<FormattedMessage id={'pages.calendar.add.alarmtime.label'} />} disabled />
            }
            return (
              <ProFormSelect
                required
                options={alarmTimeSelect}
                width='sm'
                name='alarmTime'
                label={<FormattedMessage id={'pages.calendar.add.alarmtime.label'} />}
                rules={[{ required: true, message: <FormattedMessage id={'pages.calendar.add.alarmtime.error'} /> }]}
              />
            )
          }}
        </ProFormDependency>
      </ProForm.Group>
    </ModalForm>
  )
}

export default CalendarEditFrom
