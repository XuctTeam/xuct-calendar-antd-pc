/*
 * @Author: Derek Xu
 * @Date: 2023-02-22 09:10:44
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-02-27 13:43:40
 * @FilePath: \xuct-calendar-antd-pc\src\pages\User\Login\index.tsx
 * @Description:
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-11-17 08:40:11
 * @LastEditTime: 2023-02-24 14:34:46
 * @LastEditors: Derek Xu
 */
import sessionStore from '@/cache'
import CaptchaInput from '@/components/CaptchaInput'
import Footer from '@/components/Footer'
import { AUTHORIZATION } from '@/constants'
import { sendLoginSmsCode, usernameLogin } from '@/services/login'
import stringUtil from '@/utils/stringutils'
import { AlipayCircleOutlined, LockOutlined, MobileOutlined, TaobaoCircleOutlined, UserOutlined, WeiboCircleOutlined } from '@ant-design/icons'
import { LoginForm, ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-components'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { useSetState } from 'ahooks'
import { Alert, Form, message, Tabs } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import ReactSliderVerify from 'react-slider-verify'
import { FormattedMessage, history, Link, SelectLang, useIntl, useModel } from 'umi'
import styles from './index.less'

interface ILoginType {
  status: number
  error: string
}

const ActionIcons = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive
      }
    }
  })

  return (
    <>
      <AlipayCircleOutlined key='AlipayCircleOutlined' className={langClassName} />
      <TaobaoCircleOutlined key='TaobaoCircleOutlined' className={langClassName} />
      <WeiboCircleOutlined key='WeiboCircleOutlined' className={langClassName} />
    </>
  )
}

const Lang = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover
      }
    }
  })

  return (
    <div className={langClassName} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  )
}

const LoginMessage: React.FC<{
  content: string
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24
      }}
      message={content}
      type='error'
      showIcon
    />
  )
}

const Login: React.FC = () => {
  const [type, setType] = useState<string>('account')
  const { initialState, setInitialState } = useModel('@@initialState')
  const timerRef = useRef<number>(0)
  const [loginType, setLoginType] = useSetState<ILoginType>({
    status: 0,
    error: ''
  })

  const intl = useIntl()

  useEffect(() => {
    return () => {
      if (timerRef.current > 0) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

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
      window.setTimeout(() => {
        const urlParams = new URL(window.location.href).searchParams
        history.push(urlParams.get('redirect') || '/')
      }, 1500)
    } catch (error: any) {
      console.log(error)
      const { response } = error
      _setErrorMessage(response)
    }
  }

  const _resetErrorMessage = () => {
    if (timerRef.current > 0) {
      window.clearTimeout(timerRef.current)
    }
    setLoginType({
      status: 0
    })
  }

  const _setErrorMessage = (response: any) => {
    const { data } = response
    const { message } = data

    setLoginType({
      status: 1,
      error: message
    })

    timerRef.current = window.setTimeout(() => {
      setLoginType({
        status: 0
      })
    }, 5000)
  }

  return (
    <div className={styles.container}>
      <Lang />
      <div className={styles.content}>
        <LoginForm
          logo={<img alt='logo' src='/logo.png' />}
          title={<FormattedMessage id='pages.layouts.userLayout.logo' />}
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          initialValues={{
            autoLogin: true
          }}
          actions={[<FormattedMessage key='loginWith' id='pages.login.loginWith' defaultMessage='其他登录方式' />, <ActionIcons key='icons' />]}
          onFinish={async (values) => {
            _resetErrorMessage()
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
          {loginType.status === 1 && type === 'account' && <LoginMessage content={loginType.error} />}
          {type === 'account' && (
            <>
              <ProFormText
                name='username'
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />
                }}
                placeholder={intl.formatMessage({ id: 'pages.login.username.placeholder' })}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id='pages.login.username.required' defaultMessage='请输入用户名!' />
                  }
                ]}
              />
              <ProFormText.Password
                name='password'
                fieldProps={{ size: 'large', prefix: <LockOutlined className={styles.prefixIcon} /> }}
                placeholder={intl.formatMessage({ id: 'pages.login.password.placeholder' })}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id='pages.login.password.required' defaultMessage='请输入密码！' />
                  }
                ]}
              />
              <Form.Item
                name='captcha'
                rules={[
                  {
                    validateTrigger: 'onBlur',
                    validator: async (rule, value) => {
                      console.log(rule)
                      if (!value || stringUtil.isEmpty(value.captchaCode)) {
                        throw new Error(intl.formatMessage({ id: 'pages.login.img.captcha.required' }))
                      }
                    }
                  }
                ]}
              >
                <CaptchaInput />
              </Form.Item>
            </>
          )}

          {loginType.status === 1 && type === 'mobile' && <LoginMessage content='验证码错误' />}
          {type === 'mobile' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={styles.prefixIcon} />
                }}
                name='phone'
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
              <Form.Item
                name='sliderVerify'
                rules={[
                  {
                    required: true,
                    message: 'Please complete the slide verification!'
                  }
                ]}
              >
                <ReactSliderVerify
                  width={326}
                  height={34}
                  barWidth={50}
                  bgColor='-webkit-gradient(linear,left top,right top,color-stop(0,#4d4d4d),color-stop(.4,#4d4d4d),color-stop(.5,#fff),color-stop(.6,#4d4d4d),color-stop(1,#4d4d4d))'
                />
              </Form.Item>

              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />
                }}
                captchaProps={{
                  size: 'large'
                }}
                placeholder={intl.formatMessage({ id: 'pages.login.captcha.placeholder' })}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${intl.formatMessage({ id: 'pages.getCaptchaSecondText' })}`
                  }
                  return intl.formatMessage({ id: 'pages.login.phoneLogin.getVerificationCode' })
                }}
                phoneName='phone'
                name='captcha'
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id='pages.login.captcha.required' defaultMessage='请输入验证码！' />
                  }
                ]}
                onGetCaptcha={async (phone) => {
                  const result = await sendLoginSmsCode(phone)
                  debugger
                  if (result.code === 200) {
                    message.success('获取验证码成功！验证码为：1234')
                  }
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
            <Link
              to={{ pathname: '/user/findpass' }}
              style={{
                float: 'right'
              }}
            >
              <FormattedMessage id='pages.login.forgotPassword' defaultMessage='忘记密码' />
            </Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  )
}

export default Login
