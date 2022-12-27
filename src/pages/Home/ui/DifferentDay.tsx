/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-18 18:24:40
 * @LastEditTime: 2022-12-27 14:36:04
 * @LastEditors: Derek Xu
 */
import React from 'react'
import dayjs from 'dayjs'
import { formatDifferentDayTime, formatRepeatTime } from '@/utils/calendar'
import { Space } from 'antd'

interface IPageOption {
  dtstart: Date
  dtend: Date
  fullDay: number
  repeatStatus?: string
  repeatType?: string
  repeatByday?: string
  repeatBymonth?: string
  repeatBymonthday?: string
  repeatInterval?: number
  repeatUntil?: string
}

const DifferentDay: React.FC<IPageOption> = (props) => {
  const {
    repeatStatus = '0',
    repeatType = '',
    repeatByday = '',
    repeatBymonth = '',
    repeatBymonthday = '',
    repeatInterval = 1,
    repeatUntil = dayjs().toDate()
  } = props

  return (
    <div className='date-time'>
      <Space>
        {formatDifferentDayTime(1, props.fullDay, props.dtstart)}
        {formatDifferentDayTime(2, props.fullDay, props.dtend)}
      </Space>
      {repeatStatus !== '0' && (
        <div className='cell'>
          {formatRepeatTime(repeatType, repeatStatus, repeatByday, repeatBymonth, repeatBymonthday, repeatInterval) +
            ',至 ' +
            dayjs(repeatUntil).format('YYYY-MM-DD')}
        </div>
      )}
    </div>
  )
}

export default DifferentDay
