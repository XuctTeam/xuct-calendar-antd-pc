/*
 * @Author: Derek Xu
 * @Date: 2022-12-22 11:30:19
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-10-08 19:05:06
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\ui\RepeatFormItem.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { dayWeekInMonth, isChinese } from '@/utils/calendar'
import { useSetState } from 'ahooks'
import { InputNumber, Select, SelectProps, Space } from 'antd'
import dayjs from 'dayjs'
import { forwardRef, useEffect, useImperativeHandle } from 'react'
import { FormattedMessage, useIntl } from 'umi'
import styles from './RepeatFormItem.less'

interface IPageOption {
  selectedDate: Date
  initialValues: any
}

interface State {
  repeatType: string
  selectedWeek: string[]
  selectedMonth: string
  repeatInterval: number
  weekSelectStatus: 'warning' | 'error' | ''
  monthSelectStatus: 'warning' | 'error' | ''
}

const RepeatFormItem = forwardRef<any, IPageOption>(({ ...props }, ref) => {
  const { selectedDate, initialValues } = props
  const init = useIntl()
  const chinese = isChinese()
  const [state, setState] = useSetState<State>({
    repeatType: 'DAILY',
    selectedWeek: [],
    selectedMonth: '',
    repeatInterval: 1,
    weekSelectStatus: '',
    monthSelectStatus: ''
  })

  useEffect(() => {
    if (!initialValues) return
    initData(initialValues)
  }, [initialValues])

  const repeatValues = () => {
    if (state.repeatType === 'WEEKLY') {
      if (state.selectedWeek.length === 0) {
        setState({
          weekSelectStatus: 'error'
        })
        return null
      }
    }
    if (state.repeatType === 'MONTHLY') {
      if (!state.selectedMonth) {
        setState({
          monthSelectStatus: 'error'
        })
        return null
      }
    }
    setState({
      weekSelectStatus: '',
      monthSelectStatus: ''
    })
    if (state.repeatType === 'DAYLY') {
      return _daylyRepeat()
    }
    if (state.repeatType === 'WEEKLY') {
      return _weeklyRepeat()
    }
    if (state.repeatType === 'MONTHLY') {
      return _monthlyRepeat()
    }
    return _yearlyRepeat()
  }

  // 将方法暴露给父组件使用
  useImperativeHandle(ref, () => ({
    repeatValues
  }))

  const initData = (values: any) => {
    const { repeatType, repeatInterval, repeatByday } = values
    const initValues: any = {
      repeatType,
      repeatInterval,
      selectedMonth: '1',
      selectedWeek: []
    }

    if (repeatType == 'WEEKLY') {
      repeatByday.split(',').forEach((day: string) => {
        const week = day.split(':')[1]
        if (!week) return
        initValues.selectedWeek.push(week)
      })
    }
    if (repeatType == 'MONTHLY') {
      if (repeatByday) {
        initValues.selectedMonth = '2'
      }
    }
    setState(initValues)
  }

  const customRepeatItem = [
    {
      label: init.formatMessage({ id: 'pages.component.repeat.frequency.day' }),
      value: 'DAILY'
    },
    {
      label: init.formatMessage({ id: 'pages.component.repeat.frequency.week' }),
      value: 'WEEKLY'
    },
    {
      label: init.formatMessage({ id: 'pages.component.repeat.frequency.month' }),
      value: 'MONTHLY'
    },
    {
      label: init.formatMessage({ id: 'pages.component.repeat.frequency.year' }),
      value: 'YEARLY'
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
      repeatStatus: state.repeatInterval === 1 ? '1' : '8',
      repeatByday: '',
      repeatBymonth: '',
      repeatInterval: state.repeatInterval
    }
  }

  const _weeklyRepeat = () => {
    const updateData = {
      repeatInterval: state.repeatInterval,
      repeatType: 'WEEKLY',
      repeatByday: '',
      repeatStatus: '8'
    }
    const joinArray: Array<string> = state.selectedWeek.map((i) => {
      return '0:' + i
    })
    updateData.repeatByday = joinArray.join(',')
    if (state.repeatInterval === 1 && (state.selectedWeek.length === 1 || state.selectedWeek.length === 2 || state.selectedWeek.length === 5)) {
      if (state.selectedWeek.length === 1 && state.selectedWeek[0] === '6') {
        updateData.repeatStatus = '4'
      } else if (
        state.selectedWeek.length === 2 &&
        ((state.selectedWeek[0] === '6' && state.selectedWeek[1] === '0') || (state.selectedWeek[0] === '0' && state.selectedWeek[1] === '6'))
      ) {
        updateData.repeatStatus = '3'
      } else if (state.selectedWeek.length === 5) {
        let weekDay = new Set(['1', '2', '3', '4', '5'])
        let selectedWeekDay = new Set(state.selectedWeek)
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
      repeatInterval: state.repeatInterval,
      repeatType: 'MONTHLY',
      repeatBymonthday: '',
      repeatBymonth: '',
      repeatByday: ''
    }
    if (state.selectedMonth) {
      if (state.selectedMonth === '1') {
        updateData.repeatBymonthday = dayjs(selectedDate).get('date') + ''
        if (state.repeatInterval === 1) {
          updateData.repeatStatus = '5'
        }
      } else {
        updateData.repeatByday = Math.ceil(selectedDate.getDate() / 7) + ':' + dayjs(selectedDate).day()
        if (state.repeatInterval === 1) {
          updateData.repeatStatus = '6'
        }
      }
    }
    return updateData
  }

  const _yearlyRepeat = () => {
    const updateData = {
      repeatStatus: '8',
      repeatInterval: state.repeatInterval,
      repeatType: 'YEARLY',
      repeatBymonth: (dayjs(selectedDate).get('month') + 1).toString(),
      repeatBymonthday: dayjs(selectedDate).get('date').toString()
    }
    if (state.repeatInterval === 1) {
      updateData.repeatStatus = '7'
    }
    return updateData
  }

  return (
    <Space className={styles.item}>
      <span>
        <FormattedMessage id='pages.component.repeat.each' />
      </span>
      <InputNumber
        min={1}
        max={99}
        value={state.repeatInterval}
        onChange={(e: any) =>
          setState({
            repeatInterval: e
          })
        }
      />
      <Select
        value={state.repeatType}
        style={{ width: 120 }}
        options={customRepeatItem}
        onChange={(e) =>
          setState({
            repeatType: e
          })
        }
      />
      {state.repeatType === 'WEEKLY' ? (
        <Select
          mode='multiple'
          style={{ width: '290px' }}
          value={state.selectedWeek}
          placeholder='Please select'
          options={weekSelectItem}
          onChange={(e) => {
            setState({
              selectedWeek: e
            })
          }}
          status={state.weekSelectStatus}
        />
      ) : state.repeatType === 'MONTHLY' ? (
        <Select
          allowClear
          value={state.selectedMonth}
          status={state.monthSelectStatus}
          style={{ width: '290px' }}
          placeholder='Please select'
          options={monthSelectItem}
          onChange={(e) =>
            setState({
              selectedMonth: e
            })
          }
        />
      ) : (
        <></>
      )}
    </Space>
  )
})

export default RepeatFormItem
