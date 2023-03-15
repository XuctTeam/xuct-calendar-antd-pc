/*
 * @Author: Derek Xu
 * @Date: 2023-03-15 10:30:55
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-03-15 11:35:23
 * @FilePath: \xuct-calendar-antd-pc\src\pages\User\Findpass\components\Success.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */

import { FormattedMessage } from '@/.umi/plugin-locale'
import { CheckCircleTwoTone } from '@ant-design/icons'
import { Space } from 'antd'

interface IState {
  username: string
}

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '40px',
  lineHeight: '40px',
  color: '#000'
}

const spaceStyle: React.CSSProperties = {
  fontSize: '26px'
}

const descStyle: React.CSSProperties = {
  fontSize: '14px'
}

export default function Success({ username }: IState) {
  return (
    <Space style={style} size='large'>
      <Space style={spaceStyle}>
        <CheckCircleTwoTone twoToneColor='#52c41a' />
        <span>
          <FormattedMessage id={'pages.findpass.reset.succes'} />
        </span>
      </Space>
      <div style={descStyle}>
        <FormattedMessage id={'pages.findpass.username'} />: {username}
      </div>
    </Space>
  )
}
