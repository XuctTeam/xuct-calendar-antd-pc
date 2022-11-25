/*
 * @Author: Derek Xu
 * @Date: 2022-11-25 20:00:02
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-25 20:23:15
 * @FilePath: \xuct-calendar-antd-pc\src\pages\User\Account\components\GroupManager.tsx
 * @Description:
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FunctionComponent, useState } from 'react'
import { CheckCard } from '@ant-design/pro-components'
import { Avatar } from 'antd'
import styles from './index.less'

interface Props {}

const dataSource = [
  {
    title: '图像分类',
    avatar: <Avatar size={32} shape='square' src='https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg' />,
    description: '这是一段关于该算法的说明',
    value: 'A'
  },
  {
    title: '物体检测',
    avatar: <Avatar size={32} shape='square' src='https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg' />,
    description: '这是一段关于该算法的说明',
    value: 'B'
  },
  {
    title: 'OCR自定义',
    avatar: <Avatar size={32} shape='square' src='https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg' />,
    description: '这是一段关于该算法的说明',
    value: 'C'
  },
  {
    title: 'OCR',
    avatar: <Avatar size={32} shape='square' src='https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg' />,
    description: '这是一段关于该算法的说明',
    value: 'D'
  },
  {
    title: '视频分类',
    avatar: <Avatar size={32} shape='square' src='https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg' />,
    description: '这是一段关于该算法的说明',
    value: 'E'
  },
  {
    title: '关键点检测',
    avatar: <Avatar size={32} shape='square' src='https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg' />,
    description: '这是一段关于该算法的说明',
    value: 'F'
  }
]

const GroupManager: FunctionComponent<Props> = () => {
  return (
    <div className={styles.group}>
      <div className={styles.left}>
        <CheckCard.Group options={dataSource} />
      </div>
      <div className={styles.right}>24234</div>
    </div>
  )
}

export default GroupManager
