/*
 * @Author: Derek Xu
 * @Date: 2022-12-22 11:30:19
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-22 15:33:38
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\RepeatFormItem.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FormattedMessage, useIntl } from 'umi'
import { Checkbox, InputNumber, Select, SelectProps, Space } from 'antd'
import React, { FC, useCallback, useState } from 'react'
import styles from './RepeatFormItem.less'
import dayjs from 'dayjs'
import { dayWeekInMonth, isChinese } from '@/utils/calendar'

interface IPageOption {
  selectedDate: Date
}

const RepeatFormItem: FC<IPageOption> = ({ selectedDate }) => {
  const init = useIntl()
  const chinese = isChinese()
  const [repeatType, setRepeatType] = useState<string>('0')
  const [selectedWeek, setSelectedWeek] = useState<string[]>([])
  const [selectedMonth, setSelectedMonth] = useState<string>()

  const customRepeatItem = [
    {
      label: init.formatMessage({ id: 'pages.component.add.repeat.frequency.day' }),
      value: '0'
    },
    {
      label: init.formatMessage({ id: 'pages.component.add.repeat.frequency.week' }),
      value: '1'
    },
    {
      label: init.formatMessage({ id: 'pages.component.add.repeat.frequency.month' }),
      value: '2'
    },
    {
      label: init.formatMessage({ id: 'pages.component.add.repeat.frequency.year' }),
      value: '3'
    }
  ]

  const weekSelectItem: SelectProps['options'] = [
    { label: init.formatMessage({ id: 'pages.component.add.repeat.each.mon' }), value: '1' },
    { label: init.formatMessage({ id: 'pages.component.add.repeat.each.tue' }), value: '2' },
    { label: init.formatMessage({ id: 'pages.component.add.repeat.each.wed' }), value: '3' },
    { label: init.formatMessage({ id: 'pages.component.add.repeat.each.thu' }), value: '4' },
    { label: init.formatMessage({ id: 'pages.component.add.repeat.each.fri' }), value: '5' },
    { label: init.formatMessage({ id: 'pages.component.add.repeat.each.sat' }), value: '6' },
    { label: init.formatMessage({ id: 'pages.component.add.repeat.each.sun' }), value: '0' }
  ]

  const monthSelectItem: SelectProps['options'] = [
    {
      label: `${
        init.formatMessage({ id: 'pages.component.add.repeat.every.month' }) +
        (chinese ? dayjs(selectedDate).format('（DD日）') : dayjs(selectedDate).format('（DD）'))
      }`,
      value: '1'
    },
    {
      label: `${init.formatMessage({ id: 'pages.component.add.repeat.every.month' }) + '（' + dayWeekInMonth(selectedDate) + '）'}`,
      value: '2'
    }
  ]

  const repeatChage = (value: string) => {
    setRepeatType(value)
  }

  return (
    <Space className={styles.item}>
      <span>
        <FormattedMessage id='pages.component.add.repeat.each.label' />
      </span>
      <InputNumber min={1} max={99} defaultValue={1} />
      <Select value={repeatType} style={{ width: 120 }} options={customRepeatItem} onChange={repeatChage} />
      {repeatType === '1' ? (
        <Select
          mode='multiple'
          style={{ width: '290px' }}
          value={selectedWeek}
          placeholder='Please select'
          options={weekSelectItem}
          onChange={setSelectedWeek}
        />
      ) : repeatType === '2' ? (
        <Select allowClear value={selectedMonth} style={{ width: '290px' }} placeholder='Please select' options={monthSelectItem} onChange={setSelectedMonth} />
      ) : (
        <></>
      )}
    </Space>
  )
}

export default RepeatFormItem
