/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-11-17 08:40:11
 * @LastEditTime: 2022-12-13 13:55:18
 * @LastEditors: Derek Xu
 */
import { message, Tabs } from 'antd'
import React, { useState } from 'react'
import { flushSync } from 'react-dom'
import Footer from '@/components/Footer'
import { usernameLogin, sendLoginSmsCode } from '@/services/login'
import { AlipayCircleOutlined, LockOutlined, MobileOutlined, TaobaoCircleOutlined, UserOutlined, WeiboCircleOutlined } from '@ant-design/icons'
import { LoginForm, ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-components'
import { FormattedMessage, history, SelectLang, useIntl, useModel } from 'umi'
import sessionStore from '@/cache'
import { AUTHORIZATION } from '@/constants'
import styles from './index.less'
import { useEmotionCss } from '@ant-design/use-emotion-css'

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
      // ??????
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
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <Lang />
      <div className={styles.content}>
        <LoginForm
          logo={<img alt='logo' src='/logo.png' />}
          title='?????????'
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          initialValues={{
            autoLogin: true
          }}
          actions={[<FormattedMessage key='loginWith' id='pages.login.loginWith' defaultMessage='??????????????????' />, <ActionIcons key='icons' />]}
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
                  defaultMessage: '??????????????????'
                })
              },
              {
                key: 'mobile',
                label: intl.formatMessage({
                  id: 'pages.login.phoneLogin.tab',
                  defaultMessage: '???????????????'
                })
              }
            ]}
          />
          {/* 
          {status === 'error' && loginType === 'account' && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: '?????????????????????(admin/ant.design)'
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
                  defaultMessage: '?????????: admin or user'
                })}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id='pages.login.username.required' defaultMessage='??????????????????!' />
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
                  defaultMessage: '??????: ant.design'
                })}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id='pages.login.password.required' defaultMessage='??????????????????' />
                  }
                ]}
              />
            </>
          )}

          {/* {status === 'error' && loginType === 'mobile' && <LoginMessage content='???????????????' />} */}
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
                  defaultMessage: '?????????'
                })}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id='pages.login.phoneNumber.required' defaultMessage='?????????????????????' />
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: <FormattedMessage id='pages.login.phoneNumber.invalid' defaultMessage='????????????????????????' />
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
                  defaultMessage: '??????????????????'
                })}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${intl.formatMessage({
                      id: 'pages.getCaptchaSecondText',
                      defaultMessage: '???????????????'
                    })}`
                  }
                  return intl.formatMessage({
                    id: 'pages.login.phoneLogin.getVerificationCode',
                    defaultMessage: '???????????????'
                  })
                }}
                name='captcha'
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id='pages.login.captcha.required' defaultMessage='?????????????????????' />
                  }
                ]}
                onGetCaptcha={async (phone) => {
                  const result = await sendLoginSmsCode(phone)
                  if (result.code === 200) message.success('???????????????????????????????????????1234')
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
              <FormattedMessage id='pages.login.rememberMe' defaultMessage='????????????' />
            </ProFormCheckbox>
            <a
              style={{
                float: 'right'
              }}
            >
              <FormattedMessage id='pages.login.forgotPassword' defaultMessage='????????????' />
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  )
}

export default Login
