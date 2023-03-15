/*
 * @Author: Derek Xu
 * @Date: 2023-02-16 18:56:02
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-03-15 11:30:51
 * @FilePath: \xuct-calendar-antd-pc\src\pages\User\Findpass\index.tsx
 * @Description:
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { useSetState } from 'ahooks'
import { Button, Form, Layout, Steps, theme } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { FC, useState } from 'react'
import { FormattedMessage, history, Link } from 'umi'
import { CheckUserName, ResetPass, Success } from './components'
import styled from './index.less'

interface IUser {
  userId: string
  username: string
  code: string
}

const Findpass: FC = () => {
  const { token } = theme.useToken()
  const [current, setCurrent] = useState(0)
  const [form] = Form.useForm()
  const [resetForm] = Form.useForm()

  const [user, setUser] = useSetState<IUser>({
    username: '',
    userId: '',
    code: ''
  })

  const next = async () => {
    if (current === 0) {
      form.submit()
      return
    }
    if (current === 1) {
      resetForm.submit()
      return
    }
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  const gotoResetPass = (username: string, userId: string, code: string) => {
    setUser({
      username,
      userId,
      code
    })
    setCurrent(current + 1)
  }

  const gotoSuccess = () => {
    setCurrent(current + 1)
  }

  const steps = [
    {
      title: <FormattedMessage id='pages.findpass.find.pass' />,
      content: <CheckUserName form={form} gotoResetPass={gotoResetPass} />
    },
    {
      title: <FormattedMessage id='pages.findpass.reset.pass' />,
      content: <ResetPass form={resetForm} username={user.username} userId={user.userId} code={user.code} gotoSuccess={gotoSuccess} />
    },
    {
      title: <FormattedMessage id='pages.findpass.find.success' />,
      content: <Success username={user.username} />
    }
  ]

  const items = steps.map((item) => ({ key: item.title, title: item.title }))

  const contentStyle: React.CSSProperties = {
    height: '300px',
    lineHeight: '260px',
    textAlign: 'center',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16
  }

  return (
    <>
      <Layout className={styled.wrapper}>
        <Header className={styled.header}>
          <div>werwer</div>
          <div>
            <Link to='/user/login'>
              <FormattedMessage id='pages.findpass.toLogin' />
            </Link>
          </div>
        </Header>
        <Content className={styled.container}>
          <div className={styled.box}>
            <Steps current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
            <div className={styled.buttons}>
              {current < steps.length - 1 && (
                <Button type='primary' danger onClick={() => next()}>
                  <FormattedMessage id='pages.findpass.next' />
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button
                  type='primary'
                  onClick={() => {
                    history.push('/user/login')
                    return
                  }}
                >
                  <FormattedMessage id='pages.findpass.toLogin' />
                </Button>
              )}
              {current > 0 && current !== steps.length - 1 && (
                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                  <FormattedMessage id='pages.findpass.previous' />
                </Button>
              )}
            </div>
          </div>
        </Content>
        <Footer className={styled.footer}>Footer</Footer>
      </Layout>
    </>
  )
}

export default Findpass
