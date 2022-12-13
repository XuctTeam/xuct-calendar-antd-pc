/*
 * @Author: Derek Xu
 * @Date: 2022-12-13 11:01:54
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-13 11:33:56
 * @FilePath: \xuct-calendar-antd-pc\src\components\HeaderDropdown\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { Dropdown } from 'antd'
import type { DropDownProps } from 'antd/es/dropdown'
import React from 'react'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import classNames from 'classnames'

export type HeaderDropdownProps = {
  overlayClassName?: string
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter'
} & Omit<DropDownProps, 'overlay'>

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ overlayClassName: cls, ...restProps }) => {
  const className = useEmotionCss(({ token }) => {
    return {
      [`@media screen and (max-width: ${token.screenXS})`]: {
        width: '100%'
      }
    }
  })
  return <Dropdown overlayClassName={classNames(className, cls)} getPopupContainer={(target) => target.parentElement || document.body} {...restProps} />
}

export default HeaderDropdown
