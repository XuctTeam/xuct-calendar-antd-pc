/*
 * @Author: Derek Xu
 * @Date: 2022-11-18 08:58:43
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-20 22:20:28
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\ui\Center.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { useState, useEffect, useRef } from 'react'
import { Button, Calendar } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { FormattedMessage, getLocale } from 'umi'
import { PlusOutlined } from '@ant-design/icons'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

import styles from './center.less'

const Center = () => {
  const [centerHeight, setCenterHeight] = useState<number>(300)
  const calenarRef = useRef<any>()

  useEffect(() => {
    setCenterHeight(calenarRef.current.offsetHeight - 20)
  }, [])

  return (
    <Content className={styles.center}>
      <div className={styles.left}>
        <Button type='primary' danger shape='round' icon={<PlusOutlined />} size='large' style={{ width: '100%' }}>
          <FormattedMessage id='pages.component.button.add' />
        </Button>
        <Calendar fullscreen={false} />
        <>{}</>
      </div>
      <div className={styles.right} ref={calenarRef}>
        <div className={styles.calendar}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            height={centerHeight}
            headerToolbar={{
              // 上一年，上一月，下一月，下一年 今天(逗号为紧相邻，空格为有间隙，不写哪个就不展示哪个按钮)
              left: 'prevYear,prev,next,nextYear today',
              // 默认显示当前年月
              center: 'title',
              // 右侧月 周 天切换按钮
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            locale='zh-cn'
            themeSystem='bootstrap'
            buttonText={{
              today: '今天',
              month: '月',
              week: '周',
              day: '天'
            }}
          />
        </div>
      </div>
    </Content>
  )
}

export default Center
