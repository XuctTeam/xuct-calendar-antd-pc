/*
 * @Author: Derek Xu
 * @Date: 2023-02-16 18:56:02
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-02-20 21:11:54
 * @FilePath: \xuct-calendar-antd-pc\src\pages\User\findpass\index.tsx
 * @Description:
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { Button, message, Steps, theme } from 'antd'
import { FC, useState } from 'react'
import { Link } from 'umi'
import styled from './index.less'

const steps = [
  {
    title: 'First',
    content: 'First-content'
  },
  {
    title: 'Second',
    content: 'Second-content'
  },
  {
    title: 'Last',
    content: 'Last-content'
  }
]

const Findpass: FC = () => {
  const { token } = theme.useToken()
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  const items = steps.map((item) => ({ key: item.title, title: item.title }))

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    width: '100%',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16
  }

  return (
    <div className={styled.wrapper}>
      <div className={styled.header}>
        <Link to='/user/login'>登录</Link>
      </div>
      <div className={styled.container}>
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div className={styled.buttons}>
          {current < steps.length - 1 && (
            <Button type='primary' danger onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type='primary' onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
      <div className={styled.footer}>123123</div>
    </div>
  )
}

export default Findpass
