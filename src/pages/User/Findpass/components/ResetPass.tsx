/*
 * @Author: Derek Xu
 * @Date: 2023-03-14 16:08:48
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-03-15 10:28:21
 * @FilePath: \xuct-calendar-antd-pc\src\pages\User\Findpass\components\ResetPass.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */
import { FormattedMessage } from '@/.umi/plugin-locale'
import { findPassUpdate } from '@/services/login'
import stringUtils from '@/utils/strUtils'
import { LockOutlined } from '@ant-design/icons'
import { ProFormText } from '@ant-design/pro-components'
import { Form, FormInstance } from 'antd'
import { useIntl } from 'umi'

interface IProps {
  form: FormInstance<any>
  username: string
  userId: string
  code: string
  gotoSuccess: () => void
}

const style: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '20px'
}

const formStyle: React.CSSProperties = {
  width: '300px'
}

const spanStyle: React.CSSProperties = {
  color: 'red'
}

export default function ResetPass({ form, userId, username, code, gotoSuccess }: IProps) {
  const intl = useIntl()

  const validateToNextPassword = (value: any, callback: any, ty: number) => {
    if (!value) {
      return callback(intl.formatMessage({ id: 'pages.modify.password.require' }))
    }
    const result = stringUtils.checkPassowrd(value)
    if (!result) {
      return callback(intl.formatMessage({ id: 'pages.modify.password.format' }))
    }
    if (ty === 1) {
      const password = form.getFieldValue('password')
      if (value !== password) {
        return callback(intl.formatMessage({ id: 'pages.modify.confirm.password.notequal' }))
      }
    }
    return callback()
  }

  return (
    <Form
      autoComplete='off'
      form={form}
      onFinish={async (values) => {
        const { password } = values
        await findPassUpdate(userId, password, code)
        gotoSuccess()
      }}
      style={formStyle}
    >
      <div style={style}>
        <span>
          <FormattedMessage id='pages.findPass.use.username' />
        </span>
        <span style={spanStyle}>{username}</span>
        <span>
          <FormattedMessage id='pages.findPass.use.reset.pass' />
        </span>
      </div>
      <ProFormText.Password
        name='password'
        placeholder={intl.formatMessage({ id: 'pages.findPass.password.placeholder' })}
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className={'prefixIcon'} />
        }}
        rules={[
          {
            required: true,
            validator(rule, value, callback) {
              validateToNextPassword(value, callback, 0)
            }
          }
        ]}
      />
      <ProFormText.Password
        name='confirm_password'
        placeholder={intl.formatMessage({ id: 'pages.findPass.confirm.password.placeholder' })}
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className={'prefixIcon'} />
        }}
        rules={[
          {
            required: true,
            validator(rule, value, callback) {
              validateToNextPassword(value, callback, 1)
            }
          }
        ]}
      />
    </Form>
  )
}
