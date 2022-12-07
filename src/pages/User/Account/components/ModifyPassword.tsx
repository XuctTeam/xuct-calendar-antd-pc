/*
 * @Author: Derek Xu
 * @Date: 2022-11-23 16:52:13
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-07 18:24:48
 * @FilePath: \xuct-calendar-antd-pc\src\pages\User\Account\components\ModifyPassword.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { ModalForm, ProFormInstance, ProFormText } from '@ant-design/pro-components'
import { message } from 'antd'
import { getIntl } from 'umi'
import { checkPassowrd } from '@/utils'
import { useRef } from 'react'
import { updatePassword } from '@/services/user'

interface IPageOption {
  trigger: JSX.Element
}

const ModifyPasswordModal: React.FC<IPageOption> = (props) => {
  const { trigger } = props
  const formRef = useRef<ProFormInstance>()

  const isPasswordValidate = (value: any, callback: any, ty: number) => {
    if (!value) {
      return callback(getIntl().formatMessage({ id: 'pages.modify.password.require' }))
    }
    const result = checkPassowrd(value)
    if (!result) {
      return callback(getIntl().formatMessage({ id: 'pages.modify.password.format' }))
    }
    if (ty === 1) {
      const password = formRef?.current?.getFieldValue('password')
      if (value !== password) {
        return callback(getIntl().formatMessage({ id: 'pages.modify.confirm.password.notequal' }))
      }
    }
    return callback()
  }

  return (
    <>
      <ModalForm
        formRef={formRef}
        title={getIntl().formatMessage({ id: 'pages.modify.passowrd.title' })}
        trigger={trigger}
        onFinish={async (data: any) => {
          const { password } = data
          await updatePassword(password)
          message.warning(getIntl().formatMessage({ id: 'pages.modify.passowrd.success' }))
          formRef?.current?.resetFields()
          return true
        }}
        modalProps={{
          destroyOnClose: true
        }}
      >
        <ProFormText.Password
          width='sm'
          name='password'
          label='密码'
          rules={[
            {
              required: true,
              validator(rule, value, callback) {
                isPasswordValidate(value, callback, 0)
              }
            }
          ]}
        />
        <ProFormText.Password
          width='sm'
          name='confirm_password'
          label='确认密码'
          rules={[
            {
              required: true,
              validator(rule, value, callback) {
                isPasswordValidate(value, callback, 1)
              }
            }
          ]}
        />
      </ModalForm>
    </>
  )
}

export default ModifyPasswordModal
