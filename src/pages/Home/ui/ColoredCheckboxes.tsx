/*
 * @Author: Derek Xu
 * @Date: 2022-11-22 10:39:03
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-01-05 14:39:09
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\ColoredCheckboxes.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { EllipsisOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Checkbox, ConfigProvider, Dropdown, MenuProps } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox'
import { FC } from 'react'
import { FormattedMessage } from 'umi'
import styles from '../index.less'

interface IPageOption {
  id: string
  calendarId: string
  color: string
  name: string
  display: boolean
  onChange: (id: string, checked: boolean) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

interface IStyleOption {
  color: string
  name: string
  display: boolean
  boxOnChange: (checked: CheckboxChangeEvent) => void
}

const StylesCheckbox: FC<IStyleOption> = ({ color, name, display, boxOnChange }) => {
  const _color = `${color}`
  return (
    <ConfigProvider
      theme={{
        components: {
          Checkbox: {
            colorPrimary: _color,
            colorPrimaryBorder: _color,
            colorPrimaryHover: _color
          }
        }
      }}
    >
      <Checkbox checked={display} onChange={boxOnChange}>
        {name}
      </Checkbox>
    </ConfigProvider>
  )
}

const ColoredCheckboxes: FC<IPageOption> = ({ id, color, name, display, calendarId, onChange, onEdit, onDelete }) => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a
          href='#!'
          onClick={(e) => {
            e.preventDefault()
            onEdit(id)
          }}
        >
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
        <a
          style={{ color: 'red' }}
          href='#!'
          onClick={(e) => {
            e.preventDefault()
            onDelete(calendarId)
          }}
        >
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
        <ShareAltOutlined style={{ fontSize: '16px' }} />
        <div className={styles.space}></div>
        <Dropdown menu={{ items }} placement='topRight' trigger={['contextMenu']} arrow={{ pointAtCenter: true }}>
          <EllipsisOutlined style={{ fontSize: '20px' }} />
        </Dropdown>
      </div>
      <div className={styles.checkbox}>
        {/* <span className={getColor()}>
          <Checkbox onChange={boxOnChange} checked={display}>
            {name}
          </Checkbox>
        </span> */}
        <StylesCheckbox color={color} name={name} display={display} boxOnChange={boxOnChange} />
      </div>
    </div>
  )
}

export default ColoredCheckboxes
