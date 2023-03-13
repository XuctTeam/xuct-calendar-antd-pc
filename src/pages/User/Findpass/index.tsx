/*
 * @Author: Derek Xu
 * @Date: 2023-02-16 18:56:02
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-03-13 18:16:24
 * @FilePath: \xuct-calendar-antd-pc\src\pages\User\Findpass\index.tsx
 * @Description:
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { ProFormCaptcha, ProFormText } from '@ant-design/pro-components'
import { useSetState } from 'ahooks'
import { Button, Form, Layout, message, Modal, Space, Steps, theme } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import Captcha from 'rc-captcha-input'
import { FC, useMemo, useState } from 'react'
import { FormattedMessage, Link, useIntl } from 'umi'

import styled from './index.less'

interface IState {
  code: string
  validateCode: string | undefined
  visialbe: boolean
}

const Findpass: FC = () => {
  const { token } = theme.useToken()
  const [current, setCurrent] = useState(0)
  const [form] = Form.useForm()
  const intl = useIntl()
  const [state, setState] = useSetState<IState>({
    code: '',
    validateCode: undefined,
    visialbe: false
  })

  const next = async () => {
    if (current === 0) {
      const res = await form.validateFields()
      debugger
    }
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  const validateCodeChage = (validateCode: string) => {
    setState({
      validateCode
    })
  }

  const findPassView = useMemo(() => {
    return (
      <Form name='basic' form={form} autoComplete='off'>
        <ProFormText
          name='username'
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />
          }}
          placeholder={intl.formatMessage({ id: 'pages.findpass.username.placeholder' })}
          rules={[
            {
              required: true,
              message: <FormattedMessage id={'pages.findpass.username.required'} />
            }
          ]}
        />

        <ProFormCaptcha
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />
          }}
          captchaProps={{
            size: 'large'
          }}
          placeholder={intl.formatMessage({ id: 'pages.findpass.captcha.placeholder' })}
          captchaTextRender={(timing, count) => {
            if (timing) {
              return `${count} ${intl.formatMessage({ id: 'pages.findpass.get.captcha.button' })}`
            }
            return intl.formatMessage({ id: 'pages.findpass.get.captcha.button' })
          }}
          name='captcha'
          phoneName='username'
          rules={[
            {
              required: true,
              message: <FormattedMessage id={'pages.findpass.captcha.required'} />
            }
          ]}
          onGetCaptcha={async (username) => {
            if (state.code !== '' && state.code === state.validateCode) {
            }
            setState({
              visialbe: true
            })
            return Promise.reject()
          }}
        />
      </Form>
    )
  }, [])

  const steps = [
    {
      title: <FormattedMessage id='pages.findpass.find.pass' />,
      content: findPassView
    },
    {
      title: <FormattedMessage id='pages.findpass.reset.pass' />,
      content: 'Second-content'
    },
    {
      title: <FormattedMessage id='pages.findpass.find.success' />,
      content: 'Last-content'
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
                <Button type='primary' onClick={() => message.success('Processing complete!')}>
                  Done
                </Button>
              )}
              {current > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                  <FormattedMessage id='pages.findpass.previous' />
                </Button>
              )}
            </div>
          </div>
        </Content>
        <Footer className={styled.footer}>Footer</Footer>
      </Layout>
      <Modal
        title={<FormattedMessage id='pages.find.pass.validate.title' />}
        open={state.visialbe}
        destroyOnClose={true}
        onCancel={() => setState({ visialbe: false })}
      >
        <Space direction='vertical' size='small' style={{ marginTop: '20px' }}>
          <Space size='large'>
            <span>
              <FormattedMessage id='pages.find.pass.validate.code.label' /> :
            </span>
            <div>123123</div>
          </Space>
          <Space size='small'>
            <span>
              <FormattedMessage id='pages.find.pass.validate.code.confirm.label' /> :
            </span>
            <Captcha theme='box' value={state.validateCode} length={5} onChange={validateCodeChage} />
          </Space>
        </Space>
      </Modal>
    </>
  )
}

export default Findpass
