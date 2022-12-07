/*
 * @Author: Derek Xu
 * @Date: 2022-11-22 10:39:03
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-07 18:03:35
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\ColoredCheckboxes.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { EllipsisOutlined } from '@ant-design/icons'
import { Checkbox, Dropdown, MenuProps } from 'antd'
import { FC } from 'react'
import { FormattedMessage } from 'umi'
import styles from '../index.less'

interface IPageOption {
  id: string
  color: string
  name: string
  display: boolean
  onChange: (id: string, checked: boolean) => void
}

const ColoredCheckboxes: FC<IPageOption> = (props) => {
  const { id, color, name, display, onChange } = props
  const getColor = () => {
    let checkboxClassName = 'ant-checkbox-blue'
    if (color === '#ee0a24') {
      checkboxClassName = 'ant-checkbox-red'
    }
    if (color === '#2eb82e') {
      checkboxClassName = 'ant-checkbox-green'
    }
    if (color === '#ffaa00') {
      checkboxClassName = 'ant-checkbox-yellow'
    }
    if (color === '#990000') {
      checkboxClassName = 'ant-checkbox-brown'
    }
    if (color === '#bb33ff') {
      checkboxClassName = 'ant-checkbox-purple'
    }
    if (color === '#3366cc') {
      checkboxClassName = 'ant-checkbox-darkblue'
    }
    if (color === '#c68c53') {
      checkboxClassName = 'ant-checkbox-darkyellow'
    }
    if (color === '#006600') {
      checkboxClassName = 'ant-checkbox-darkgreen'
    }
    if (color === '#ff99dd') {
      checkboxClassName = 'ant-checkbox-pink'
    }
    return checkboxClassName
  }
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
          <FormattedMessage id='pages.calendar.manager.button.edit' />
        </a>
      )
    },
    {
      key: '2',
      label: (
        <a target='_blank' rel='noopener noreferrer' href='https://www.aliyun.com'>
          <FormattedMessage id='pages.calendar.manager.button.share' />
        </a>
      )
    },
    {
      key: '3',
      label: (
        <a style={{ color: 'red' }} target='_blank' rel='noopener noreferrer' href='https://www.luohanacademy.com'>
          <FormattedMessage id='pages.calendar.manager.button.del' />
        </a>
      )
    }
  ]

  const boxOnChange = (e: any) => {
    onChange(id, e.target.checked)
  }

  return (
    <div className={styles.cell}>
      <div className={styles.bg}>
        <Dropdown menu={{ items }} placement='topRight'>
          <EllipsisOutlined style={{ fontSize: '20px' }} />
        </Dropdown>
      </div>
      <div className={styles.checkbox}>
        <span className={getColor()}>
          <Checkbox onChange={boxOnChange} checked={display}>
            {name}
          </Checkbox>
        </span>
      </div>
    </div>
  )
}

export default ColoredCheckboxes
