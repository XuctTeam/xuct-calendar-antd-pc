/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-11-17 08:40:11
 * @LastEditTime: 2022-11-17 15:18:49
 * @LastEditors: Derek Xu
 */
import { message, Tabs } from 'antd'
import React, { useState } from 'react'
import { flushSync } from 'react-dom'
import Footer from '@/components/Footer'
import { usernameLogin, sendLoginSmsCode } from '@/services/login'
import { AlipayCircleOutlined, LockOutlined, MobileOutlined, TaobaoCircleOutlined, UserOutlined, WeiboCircleOutlined } from '@ant-design/icons'
import { LoginForm, ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-components'
import { FormattedMessage, history, SelectLang, useDispatch, useIntl, useModel } from 'umi'
import sessionStore from '@/cache'
import { AUTHORIZATION } from '@/constants'
import styles from './index.less'

const Login: React.FC = () => {
  const [type, setType] = useState<string>('account')
  const { initialState, setInitialState } = useModel('@@initialState')

  const intl = useIntl()

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.()
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo
        }))
      })
    }
    return userInfo
  }

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await usernameLogin({ ...values, type })
      sessionStore.setItem('access_token', AUTHORIZATION.concat(msg.access_token))
      sessionStore.setItem('refresh_token', AUTHORIZATION.concat(msg.refresh_token))
      const userInfo = await fetchUserInfo()
      if (!userInfo) return
      const defaultLoginSuccessMessage = intl.formatMessage({ id: 'pages.login.success' })
      message.success(defaultLoginSuccessMessage)
      const urlParams = new URL(window.location.href).searchParams
      history.push(urlParams.get('redirect') || '/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt='logo' src='/logo.png' />}
          title='楚日历'
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          initialValues={{
            autoLogin: true
          }}
          actions={[
            <FormattedMessage key='loginWith' id='pages.login.loginWith' defaultMessage='其他登录方式' />,
            <AlipayCircleOutlined key='AlipayCircleOutlined' className={styles.icon} />,
            <TaobaoCircleOutlined key='TaobaoCircleOutlined' className={styles.icon} />,
            <WeiboCircleOutlined key='WeiboCircleOutlined' className={styles.icon} />
          ]}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams)
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  defaultMessage: '账户密码登录'
                })
              },
              {
                key: 'mobile',
                label: intl.formatMessage({
                  id: 'pages.login.phoneLogin.tab',
                  defaultMessage: '手机号登录'
                })
              }
            ]}
          />
          {/* 
          {status === 'error' && loginType === 'account' && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: '账户或密码错误(admin/ant.design)'
              })}
            />
          )} */}
          {type === 'account' && (
            <>
              <ProFormText
                name='username'
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder',
                  defaultMessage: '用户名: admin or user'
                })}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id='pages.login.username.required' defaultMessage='请输入用户名!' />
                  }
                ]}
              />
              <ProFormText.Password
                name='password'
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  defaultMessage: '密码: ant.design'
                })}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id='pages.login.password.required' defaultMessage='请输入密码！' />
                  }
                ]}
              />
            </>
          )}

          {/* {status === 'error' && loginType === 'mobile' && <LoginMessage content='验证码错误' />} */}
          {type === 'mobile' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={styles.prefixIcon} />
                }}
                name='mobile'
                placeholder={intl.formatMessage({
                  id: 'pages.login.phoneNumber.placeholder',
                  defaultMessage: '手机号'
                })}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id='pages.login.phoneNumber.required' defaultMessage='请输入手机号！' />
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: <FormattedMessage id='pages.login.phoneNumber.invalid' defaultMessage='手机号格式错误！' />
                  }
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />
                }}
                captchaProps={{
                  size: 'large'
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.captcha.placeholder',
                  defaultMessage: '请输入验证码'
                })}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${intl.formatMessage({
                      id: 'pages.getCaptchaSecondText',
                      defaultMessage: '获取验证码'
                    })}`
                  }
                  return intl.formatMessage({
                    id: 'pages.login.phoneLogin.getVerificationCode',
                    defaultMessage: '获取验证码'
                  })
                }}
                name='captcha'
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id='pages.login.captcha.required' defaultMessage='请输入验证码！' />
                  }
                ]}
                onGetCaptcha={async (phone) => {
                  const result = await sendLoginSmsCode(phone)
                  if (result.code === 200) message.success('获取验证码成功！验证码为：1234')
                }}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24
            }}
          >
            <ProFormCheckbox noStyle name='autoLogin'>
              <FormattedMessage id='pages.login.rememberMe' defaultMessage='自动登录' />
            </ProFormCheckbox>
            <a
              style={{
                float: 'right'
              }}
            >
              <FormattedMessage id='pages.login.forgotPassword' defaultMessage='忘记密码' />
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  )
}

export default Login
