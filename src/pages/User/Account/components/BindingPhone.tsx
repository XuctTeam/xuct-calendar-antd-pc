/*
 * @Author: Derek Xu
 * @Date: 2022-12-01 21:38:19
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-01 22:36:54
 * @FilePath: \xuct-calendar-antd-pc\src\pages\User\Account\components\BindingPhone.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FC, useRef } from 'react'
import { CaptFieldRef, ModalForm, ProFormCaptcha } from '@ant-design/pro-components'
import { Button, Form, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface IPageOption {
  open: boolean
  setPhoneOpen: (open: boolean) => void
}

const BindingPhone: FC<IPageOption> = (props) => {
  const { open } = props
  const [form] = Form.useForm<{ name: string; company: string }>()
  const captchaRef = useRef<CaptFieldRef | null | undefined>()
  const inputRef = useRef()

  return (
    <ModalForm<{
      name: string
      company: string
    }>
      title='新建表单'
      open={open}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run')
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        //await waitTime(2000)
        console.log(values.name)
        message.success('提交成功')
        return true
      }}
    >
      <ProFormCaptcha
        onGetCaptcha={() => {
          // dosomething()
          return new Promise((resolve, reject) => {
            reject()
          })
        }}
        fieldRef={captchaRef}
        fieldProps={{ ref: inputRef }}
        name='code'
      />
    </ModalForm>
  )
}

export default BindingPhone
