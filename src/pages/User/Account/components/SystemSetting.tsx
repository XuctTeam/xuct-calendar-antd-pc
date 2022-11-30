/*
 * @Author: Derek Xu
 * @Date: 2022-11-24 19:49:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-30 11:00:55
 * @FilePath: \xuct-calendar-antd-pc\src\pages\User\Account\components\SystemSetting.tsx
 * @Description:
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Card, Col, Row, Select, Switch } from 'antd'
import { connect, FormattedMessage, getLocale, setLocale, useSelector } from 'umi'
import { getDayJsLocal } from '@/utils/calendar'
import styles from './index.less'
import dayjs from 'dayjs'

const CalendarSetting = (props: any) => {
  const local = getLocale()

  const { dataView, lunarView } = useSelector(function (state: any) {
    return state.system
  })

  const localSelectChage = (value: string) => {
    setLocale(value, false)
    /** 这里要兼容语言切换时重置dayjs的参数 */
    dayjs.updateLocale(getDayJsLocal(), { weekStart: Number.parseInt(dataView) })
  }

  const weekSelectChage = (value: string) => {
    dayjs.updateLocale(getDayJsLocal(), { weekStart: Number.parseInt(value) })

    props.dispatch({
      type: 'system/onChageDataView',
      payload: { dataView: value } //传递参数
    })
  }

  const lunarChage = (checked: boolean) => {
    props.dispatch({
      type: 'system/onChageLunarView',
      payload: { lunarView: checked ? '1' : '0' } //传递参数
    })
  }

  return (
    <div className={styles.container}>
      <Card>
        <Row>
          <Col span={12}>
            <div className={styles.cell}>
              <span>
                <FormattedMessage id='pages.person.center.lanuage.title' />
              </span>
              <Select
                defaultValue={local}
                style={{ width: 240 }}
                onChange={localSelectChage}
                options={[
                  {
                    value: 'zh-CN',
                    label: '简体中文'
                  },
                  {
                    value: 'en-US',
                    label: '英语'
                  }
                ]}
              />
            </div>
            <div className={styles.cell}>
              <span>
                <FormattedMessage id='pages.person.center.week.start' />
              </span>
              <Select
                value={dataView}
                style={{ width: 240 }}
                onChange={weekSelectChage}
                options={[
                  {
                    value: '1',
                    label: <FormattedMessage id='pages.person.center.week.monday' />
                  },
                  {
                    value: '0',
                    label: <FormattedMessage id='pages.person.center.week.sunday' />
                  }
                ]}
              />
            </div>
            <div className={styles.cell}>
              <span>显示农历</span>
              <Switch
                style={{ width: 50 }}
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                checked={lunarView === '1'}
                onChange={lunarChage}
              />
            </div>
          </Col>
          <Col span={12}></Col>
        </Row>
      </Card>
    </div>
  )
}

export default connect(({ system }: any) => ({ system }))(CalendarSetting)
