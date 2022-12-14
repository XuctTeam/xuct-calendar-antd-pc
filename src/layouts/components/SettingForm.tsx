/*
 * @Author: Derek Xu
 * @Date: 2022-12-14 14:26:04
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-14 15:07:07
 * @FilePath: \xuct-calendar-antd-pc\src\layouts\components\SettingForm.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { getDayJsLocal } from '@/utils/calendar'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Modal, Select, Switch } from 'antd'
import dayjs from 'dayjs'
import { FC } from 'react'
import { connect, FormattedMessage, getLocale, setLocale, useSelector } from 'umi'
import styles from './SettingForm.less'

interface IPageOption {
  open: boolean
  setOpen: (e: any) => void
  dispatch: (event: any) => void
}

const SettingForm: FC<IPageOption> = ({ open, setOpen, dispatch }) => {
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

    dispatch({
      type: 'system/onChageDataView',
      payload: { dataView: value } //传递参数
    })
  }

  const lunarChage = (checked: boolean) => {
    dispatch({
      type: 'system/onChageLunarView',
      payload: { lunarView: checked ? '1' : '0' } //传递参数
    })
  }

  return (
    <Modal open={open} title={<FormattedMessage id='pages.setting.title' />} footer={null} onCancel={setOpen}>
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
    </Modal>
  )
}

export default connect(({ system }: any) => ({ system }))(SettingForm)
