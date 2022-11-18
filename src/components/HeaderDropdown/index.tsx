/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 17:48:57
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-18 17:56:51
 * @FilePath: \xuct-calendar-antd-pc\src\components\HeaderDropdown\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { Dropdown } from 'antd'
import type { DropDownProps } from 'antd/es/dropdown'
import classNames from 'classnames'
import React from 'react'
import styles from './index.less'

export type HeaderDropdownProps = {
  overlayClassName?: string
  menu: React.ReactNode | (() => React.ReactNode) | any
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter'
} & Omit<DropDownProps, 'menu'>

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ overlayClassName: cls, ...restProps }) => {
  console.log(444444444)
  console.log(restProps)
  return <Dropdown overlayClassName={classNames(styles.container, cls)} getPopupContainer={(target) => target.parentElement || document.body} {...restProps} />
}

export default HeaderDropdown
