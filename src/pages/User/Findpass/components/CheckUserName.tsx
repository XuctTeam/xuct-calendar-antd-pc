/*
 * @Author: Derek Xu
 * @Date: 2023-03-14 09:57:49
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-03-14 16:47:11
 * @FilePath: \xuct-calendar-antd-pc\src\pages\User\Findpass\components\CheckUserName.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */
/*
 * @Author: Derek Xu
 * @Date: 2023-03-14 09:57:49
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-03-14 14:24:27
 * @FilePath: \xuct-calendar-antd-pc\src\pages\User\Findpass\component\First.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */
import { findPassCheck, publicKey, sendFindPassEmailCode, sendFindPassSmsCode } from '@/services/login'
import stringUtils from '@/utils/stringutils'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { ProFormCaptcha, ProFormText } from '@ant-design/pro-components'
import { useSetState } from 'ahooks'
import { Alert, Form, FormInstance, message, Modal, Space } from 'antd'
import Captcha from 'rc-captcha-input'
import { useEffect } from 'react'
import { FormattedMessage, useIntl } from 'umi'
import { v4 as uuidv4 } from 'uuid'

interface IProps {
  form: FormInstance<any>
  gotoResetPass: (username: string, userId: string) => void
}

interface IState {
  state: number
  message: string
  visable: boolean
  code: string
  validateCode: string
  randomStr: string
  validate: boolean
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

const codeStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 'bold'
}

export default function CheckUserName({ form, gotoResetPass }: IProps) {
  const intl = useIntl()
  const [state, setState] = useSetState<IState>({
    state: 0,
    message: '',
    visable: false,
    code: '',
    validateCode: '',
    randomStr: '',
    validate: false
  })

  useEffect(() => {
    if (state.visable) {
      _initCode(uuidv4())
    }
  }, [state.visable])

  const onOk = () => {
    if (state.code !== state.validateCode) {
      setState({
        visable: false,
        state: 1,
        message: intl.formatMessage({ id: 'pages.find.pass.validate.error' })
      })
      return
    }
    setState({
      visable: false,
      state: 0,
      message: '',
      validate: true
    })
  }

  const _initCode = async (uuid: string) => {
    let data
    try {
      data = await publicKey(uuid)
    } catch (e) {
      console.log(e)
      return
    }
    if (data) {
      setState({
        code: data.key,
        randomStr: data.randomStr
      })
    }
  }

  return (
    <>
      <Form
        form={form}
        autoComplete='off'
        onFinish={async (value) => {
          const { username, captcha } = value
          let res
          try {
            res = await findPassCheck(username, captcha)
          } catch (err: any) {
            if (err.name === 'BizError') {
              const { message } = err.info
              setState({
                state: 1,
                message
              })
            }
            return
          }
          debugger
          gotoResetPass('123', '123')
        }}
      >
        {state.state === 1 && <LoginMessage content={state.message} />}
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
            if (!state.validate) {
              setState({ visable: true })
              return Promise.reject()
            }
            if (stringUtils.checkEmail(username)) {
              await sendFindPassEmailCode(username, state.code, state.randomStr).catch((err: any) => {
                if (err.name === 'BizError') {
                  const { message } = err.info
                  setState({
                    state: 1,
                    message
                  })
                }
                return Promise.reject(err)
              })
              message.success(intl.formatMessage({ id: 'pages.login.phone.sms.success' }))
              return
            }
            await sendFindPassSmsCode(username, state.code, state.randomStr).catch((err) => {
              if (err.name === 'BizError') {
                const { message } = err.info
                setState({
                  state: 1,
                  message
                })
              }
              return Promise.reject(err)
            })
            message.success(intl.formatMessage({ id: 'pages.login.phone.sms.success' }))
          }}
        />
      </Form>
      <Modal
        title={<FormattedMessage id='pages.find.pass.validate.title' />}
        open={state.visable}
        onOk={onOk}
        destroyOnClose={true}
        onCancel={() => {
          setState({
            visable: false
          })
        }}
      >
        <Space direction='vertical' size='small' style={{ marginTop: '20px' }}>
          <Space size='large'>
            <span>
              <FormattedMessage id='pages.find.pass.validate.code.label' /> :
            </span>
            <div style={codeStyle}>{state.code}</div>
          </Space>
          <Space size='small'>
            <span>
              <FormattedMessage id='pages.find.pass.validate.code.confirm.label' /> :
            </span>
            <Captcha
              theme='box'
              length={5}
              onChange={(val) =>
                setState({
                  validateCode: val
                })
              }
            />
          </Space>
        </Space>
      </Modal>
    </>
  )
}
