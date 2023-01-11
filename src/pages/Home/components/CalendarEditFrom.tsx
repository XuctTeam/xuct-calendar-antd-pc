/*
 * @Author: Derek Xu
 * @Date: 2022-12-07 18:10:24
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-01-09 13:15:51
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\CalendarEditFrom.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FC, useRef } from 'react'
import {
  DrawerForm,
  ProForm,
  ProFormDependency,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-components'
import { message } from 'antd'
import { FormattedMessage, getIntl } from 'umi'
import { saveCalendar, updateCalendar, getCalendar } from '@/services/calendar'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Color } from '@/constants'

interface IPageOption {
  id?: string
  visable: boolean
  refresh: () => void
  setVisable: (modalVisit: boolean) => void
}

const CalendarEditFrom: FC<IPageOption> = ({ id, visable, refresh, setVisable }) => {
  const formRef = useRef<ProFormInstance>()

  const getCalendarColor = (): any[] => {
    return Color.map((item) => {
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

  const saveOrUpdate = (values: any) => {
    const { display = true, alarmTime = 0, isShare = 0 } = values
    if (!id) {
      return saveCalendar({
        ...values,
        display: display ? 1 : 0,
        isShare: isShare ? 1 : 0,
        alarmTime
      })
    }
    return updateCalendar({
      ...values,
      id: id,
      display: display ? 1 : 0,
      isShare: isShare ? 1 : 0,
      alarmTime
    })
  }

  return (
    <DrawerForm<{
      name: string
      description: string
      display: number
      alarmType: string
      alarmTime: string
      color: string
    }>
      title={<FormattedMessage id='pages.calendar.add.title' />}
      formRef={formRef}
      autoFocusFirstInput
      open={visable}
      preserve
      drawerProps={{
        destroyOnClose: true
      }}
      omitNil
      onOpenChange={setVisable}
      submitTimeout={2000}
      params={{ id }}
      request={async () => {
        if (!id)
          return {
            name: '',
            description: '',
            display: 0,
            alarmType: '',
            alarmTime: '',
            color: 'ee0a24'
          }
        const res = await getCalendar(id)
        const { name, color, display, isShare, description, alarmType, alarmTime } = res as any as CALENDAR.Calendar
        const initValues = {
          name,
          color,
          display,
          isShare,
          description,
          alarmType: `${alarmType}`,
          alarmTime: ''
        }
        if (`${alarmType}` !== '0') {
          initValues['alarmTime'] = `${alarmTime}`
        }
        return initValues
      }}
      onFinish={async (values: any) => {
        try {
          await saveOrUpdate(values)
          message.success(getIntl().formatMessage({ id: !id ? 'pages.calendar.mananger.add.success' : 'pages.calendar.mananger.edit.success' }))
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
      <ProFormRadio.Group label={<FormattedMessage id={'pages.calendar.add.color.label'} />} name='color' options={getCalendarColor()} />
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
            if (alarmType === '0' || !alarmType) {
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
    </DrawerForm>
  )
}

export default CalendarEditFrom
