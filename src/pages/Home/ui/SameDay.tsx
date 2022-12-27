/*
 * @Author: Derek Xu
 * @Date: 2022-04-20 16:06:06
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-27 18:31:46
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\ui\SameDay.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-18 18:02:45
 * @LastEditTime: 2022-03-01 14:35:47
 * @LastEditors: Derek Xu
 */
import React from 'react'
import { formateSameDayDuration, formatRepeatTime, formatSameDayTime } from '@/utils/calendar'
import { Space } from 'antd'

interface IPageOption {
  dtstart: Date
  dtend: Date
  fullDay: number
  repeatStatus: string
  repeatType: string
  repeatByday: string
  repeatBymonth: string
  repeatBymonthday: string
  repeatInterval: number
  repeatUntil?: string
}

const RepeatTime: React.FC<IPageOption> = (props) => {
  const { dtstart, dtend, fullDay, repeatStatus, repeatType, repeatByday, repeatBymonth, repeatBymonthday, repeatInterval } = props
  return (
    <>
      <Space>
        {formatSameDayTime(fullDay, dtstart, dtend)}
        {formateSameDayDuration(fullDay, dtstart, dtend)}
      </Space>
      {repeatStatus !== '0' && (
        <div className='repeat'>{formatRepeatTime(repeatType, repeatStatus, repeatByday, repeatBymonth, repeatBymonthday, repeatInterval)}</div>
      )}
    </>
  )
}

export default RepeatTime
