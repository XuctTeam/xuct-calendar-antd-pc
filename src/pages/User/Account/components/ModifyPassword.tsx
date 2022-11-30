/*
 * @Author: Derek Xu
 * @Date: 2022-11-23 16:52:13
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-30 20:58:49
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
  modalVisit: boolean
  setModalVisit: (visit: boolean) => void
}

const ModifyPasswordModal: React.FC<IPageOption> = (props) => {
  const { modalVisit, setModalVisit } = props
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
        open={modalVisit}
        onFinish={async (data: any) => {
          const { password } = data
          await updatePassword(password)
          message.warning(getIntl().formatMessage({ id: 'pages.modify.passowrd.success' }))
          formRef?.current?.resetFields()
          setModalVisit(false)
          return true
        }}
        onOpenChange={setModalVisit}
      >
        <ProFormText
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
        <ProFormText
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
