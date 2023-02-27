/*
 * @Author: Derek Xu
 * @Date: 2023-02-21 17:13:06
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-02-27 13:42:32
 * @FilePath: \xuct-calendar-antd-pc\src\components\CaptchaInput\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */
import stringUtil from '@/utils/stringutils'
import { SafetyCertificateOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { useIntl } from 'umi'
import { v4 as uuidv4 } from 'uuid'

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

  useEffect(() => {
    setCaptchaKey(uuidv4())
  }, [])

  // 触发改变
  const triggerChange = (changedValue: { captchaCode?: string; captchaKey?: string }) => {
    if (onChange) {
      onChange({ captchaCode: captchaCode, captchaKey: captchaKey, ...value, ...changedValue })
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

  const imageClick = () => {
    const key = uuidv4()
    setCaptchaKey(key)
    triggerChange({ captchaKey: key })
  }

  const imageUrl = useCallback(() => {
    return `/rest/code?imgType=login&randomStr=${captchaKey}`
  }, [captchaKey])

  const inputStyle: React.CSSProperties = {
    width: '75%',
    marginRight: '5px',
    padding: '6.5px 11px',
    lineHeight: 1.4,
    fontSize: '16px'
  }

  const imageStyle: React.CSSProperties = {
    width: '23%',
    height: '36px',
    verticalAlign: 'middle',
    padding: '0px 0px 0px 0px',
    marginTop: '2px',
    cursor: 'pointer'
  }

  return (
    <Input.Group compact>
      <Input
        prefix={<SafetyCertificateOutlined />}
        placeholder={intl.formatMessage({ id: 'pages.login.img.captcha.placeholder' })}
        onChange={onChangeInput}
        style={inputStyle}
      />
      <img style={imageStyle} src={imageUrl()} onClick={imageClick} />
    </Input.Group>
  )
}
export default CaptchaInput
