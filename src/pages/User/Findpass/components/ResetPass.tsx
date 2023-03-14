/*
 * @Author: Derek Xu
 * @Date: 2023-03-14 16:08:48
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-03-14 18:17:47
 * @FilePath: \xuct-calendar-antd-pc\src\pages\User\Findpass\components\ResetPass.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */
import stringUtils from '@/utils/stringutils'
import { LockOutlined } from '@ant-design/icons'
import { ProFormText } from '@ant-design/pro-components'
import { Form, FormInstance } from 'antd'
import { useIntl } from 'umi'

interface IProps {
  form: FormInstance<any>
  username: string
  userId: string
  gotoSuccess: () => void
}

const style: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '20px'
}

export default function ResetPass({ form, userId, username }: IProps) {
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
    <Form autoComplete='off' form={form} onFinish={async (values) => {}}>
      <div style={style}>正在使用 {username} 重置密码</div>
      <ProFormText.Password
        name='password'
        placeholder={intl.formatMessage({ id: 'pages.findpass.password.placeholder' })}
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
        placeholder={intl.formatMessage({ id: 'pages.findpass.password.placeholder' })}
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
