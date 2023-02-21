/*
 * @Author: Derek Xu
 * @Date: 2023-02-21 17:13:06
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-02-21 18:33:59
 * @FilePath: \xuct-calendar-antd-pc\src\components\CaptchaInput\CaptchaInput.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */
import stringUtil from '@/utils/stringutils'
import { SafetyCertificateOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import React, { useState } from 'react'
import { useIntl } from 'umi'

interface CaptchaInputValue {
  captchaCode?: string
  captchaKey?: string
}

interface CaptchaInputProps {
  value?: CaptchaInputValue
  onChange?: (value: CaptchaInputValue) => void
}

const CaptchaInput: React.FC<CaptchaInputProps> = ({ value = {}, onChange }) => {
  const intl = useIntl()
  const [captchaCode, setCaptchaCode] = useState<string>('')
  const [captchaKey, setCaptchaKey] = useState<string>('')

  // 触发改变
  const triggerChange = (changedValue: { captchaCode?: string; captchaKey?: string }) => {
    if (onChange) {
      onChange({ captchaCode, captchaKey, ...value, ...changedValue })
    }
  }

  // 输入框变化
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value || ''
    if (stringUtil.isNotEmpty(code)) {
      setCaptchaCode(code)
    }
    triggerChange({ captchaCode: code })
  }

  return (
    <Input.Group compact>
      <Input
        prefix={<SafetyCertificateOutlined />}
        placeholder={intl.formatMessage({
          id: 'pages.login.captcha.placeholder',
          defaultMessage: '请输入验证码'
        })}
        onChange={onChangeInput}
        style={{ width: '75%', marginRight: 5, padding: '6.5px 11px 6.5px 11px', verticalAlign: 'middle' }}
      />
      <img style={{ width: '23%', height: '35px', verticalAlign: 'middle', padding: '0px 0px 0px 0px' }} src='/rest/code' />
    </Input.Group>
  )
}
export default CaptchaInput
