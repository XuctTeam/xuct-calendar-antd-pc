/*
 * @Author: Derek Xu
 * @Date: 2022-11-23 16:52:13
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-03-14 16:18:45
 * @FilePath: \xuct-calendar-antd-pc\src\components\AvatarDropdown\PasswordForm.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { updatePassword } from '@/services/user'
import stringUtils from '@/utils/stringutils'
import { ModalForm, ProFormText } from '@ant-design/pro-components'
import { Form, message } from 'antd'
import {} from 'antd/es/form/Form'
import { FormattedMessage, getIntl, useIntl } from 'umi'

interface IPageOption {
  open: boolean
  setOpen: (open: boolean) => void
}

const ModifyPasswordModal: React.FC<IPageOption> = (props) => {
  const { open, setOpen } = props
  const [form] = Form.useForm()
  const intl = useIntl()

  const isPasswordValidate = (value: any, callback: any, ty: number) => {
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
    <ModalForm
      form={form}
      title={<FormattedMessage id='pages.modify.passowrd.title' />}
      open={open}
      onOpenChange={setOpen}
      onFinish={async (data: any) => {
        const { password } = data
        await updatePassword(password)
        message.warning(getIntl().formatMessage({ id: 'pages.modify.passowrd.success' }))
        form.resetFields()
        return true
      }}
      modalProps={{
        destroyOnClose: true,
        centered: true
      }}
    >
      <ProFormText.Password
        width='sm'
        name='password'
        label={<FormattedMessage id='page.modify.password.label' />}
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
        label={<FormattedMessage id='page.modify.confirm.password.label' />}
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
  )
}

export default ModifyPasswordModal
