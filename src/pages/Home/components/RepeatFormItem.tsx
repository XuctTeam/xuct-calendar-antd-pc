/*
 * @Author: Derek Xu
 * @Date: 2022-12-22 11:30:19
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-24 19:00:05
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\RepeatFormItem.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FormattedMessage, useIntl } from 'umi'
import { InputNumber, Select, SelectProps, Space } from 'antd'
import { forwardRef, useImperativeHandle, useState } from 'react'
import styles from './RepeatFormItem.less'
import dayjs from 'dayjs'
import { dayWeekInMonth, isChinese } from '@/utils/calendar'

interface IPageOption {
  selectedDate: Date
}

const RepeatFormItem = forwardRef<any, IPageOption>(({ ...props }, ref) => {
  const { selectedDate } = props
  const init = useIntl()
  const chinese = isChinese()
  const [repeatType, setRepeatType] = useState<string>('0')
  const [selectedWeek, setSelectedWeek] = useState<string[]>([])
  const [selectedMonth, setSelectedMonth] = useState<string>()
  const [repeatInterval, setRepeatInterval] = useState<number>(1)
  const [weekSelectStatus, setWeekSelectStatus] = useState<any>('')
  const [monthSelectStatus, setMonthSelectStatus] = useState<any>('')

  const repeatValues = () => {
    if (repeatType === '1') {
      if (selectedWeek.length === 0) {
        setWeekSelectStatus('error')
        return null
      }
    }
    if (repeatType === '2') {
      if (!selectedMonth) {
        setMonthSelectStatus('error')
        return null
      }
    }
    setWeekSelectStatus('')
    setMonthSelectStatus('')
    if (repeatType === '0') {
      return _daylyRepeat()
    }
    if (repeatType === '1') {
      return _weeklyRepeat()
    }
    if (repeatType === '2') {
      return _monthlyRepeat()
    }
    return _yearlyRepeat()
  }

  // 将方法暴露给父组件使用
  useImperativeHandle(ref, () => ({
    repeatValues
  }))

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

  const _daylyRepeat = () => {
    return {
      repeatType: 'DAILY',
      repeatStatus: repeatInterval === 1 ? '1' : '8',
      repeatByday: '',
      repeatBymonth: '',
      repeatInterval: repeatInterval
    }
  }

  const _weeklyRepeat = () => {
    const updateData = {
      repeatInterval: repeatInterval,
      repeatType: 'WEEKLY',
      repeatByday: '',
      repeatStatus: '8'
    }
    const joinArray: Array<string> = selectedWeek.map((i) => {
      return '0:' + i
    })
    updateData.repeatByday = joinArray.join(',')
    if (repeatInterval === 1 && (selectedWeek.length === 1 || selectedWeek.length === 2 || selectedWeek.length === 5)) {
      if (selectedWeek.length === 1 && selectedWeek[0] === '6') {
        updateData.repeatStatus = '4'
      } else if (selectedWeek.length === 2 && ((selectedWeek[0] === '6' && selectedWeek[1] === '0') || (selectedWeek[0] === '0' && selectedWeek[1] === '6'))) {
        updateData.repeatStatus = '3'
      } else if (selectedWeek.length === 5) {
        let weekDay = new Set(['1', '2', '3', '4', '5'])
        let selectedWeekDay = new Set(selectedWeek)
        let diff = new Set([...Array.from(weekDay)].filter((x) => !selectedWeekDay.has(x)))
        if (diff.size === 0) {
          updateData.repeatStatus = '2'
        }
      }
    }
    return updateData
  }

  const _monthlyRepeat = () => {
    const updateData = {
      repeatStatus: '8',
      repeatInterval: repeatInterval,
      repeatType: 'MONTHLY',
      repeatBymonthday: '',
      repeatByday: ''
    }
    if (selectedMonth) {
      if (selectedMonth === '1') {
        updateData.repeatBymonthday = dayjs(selectedDate).get('date') + ''
        if (repeatInterval === 1) {
          updateData.repeatStatus = '5'
        }
      } else {
        updateData.repeatByday = Math.ceil(selectedDate.getDate() / 7) + ':' + dayjs(selectedDate).day()
        if (repeatInterval === 1) {
          updateData.repeatStatus = '6'
        }
      }
    }
    return updateData
  }

  const _yearlyRepeat = () => {
    const updateData = {
      repeatStatus: '8',
      repeatInterval: repeatInterval,
      repeatType: 'YEARLY',
      repeatBymonth: (dayjs(selectedDate).get('month') + 1).toString(),
      repeatBymonthday: dayjs(selectedDate).get('date').toString()
    }
    if (repeatInterval === 1) {
      updateData.repeatStatus = '7'
    }
    return updateData
  }

  return (
    <Space className={styles.item}>
      <span>
        <FormattedMessage id='pages.component.add.repeat.each.label' />
      </span>
      <InputNumber min={1} max={99} value={repeatInterval} onChange={(e: any) => setRepeatInterval(e)} />
      <Select value={repeatType} style={{ width: 120 }} options={customRepeatItem} onChange={setRepeatType} />
      {repeatType === '1' ? (
        <Select
          mode='multiple'
          style={{ width: '290px' }}
          value={selectedWeek}
          placeholder='Please select'
          options={weekSelectItem}
          onChange={setSelectedWeek}
          status={weekSelectStatus}
        />
      ) : repeatType === '2' ? (
        <Select
          allowClear
          value={selectedMonth}
          status={monthSelectStatus}
          style={{ width: '290px' }}
          placeholder='Please select'
          options={monthSelectItem}
          onChange={setSelectedMonth}
        />
      ) : (
        <></>
      )}
    </Space>
  )
})

export default RepeatFormItem
