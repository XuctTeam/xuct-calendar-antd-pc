/*
 * @Author: Derek Xu
 * @Date: 2023-02-28 13:25:33
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-03-03 13:55:06
 * @FilePath: \xuct-calendar-antd-pc\src\components\SliderVerify\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */
import { smsPublicKey } from '@/services/login'
import { useSetState } from 'ahooks'
import { FC, useEffect, useRef } from 'react'
import ReactSliderVerify from 'react-slider-verify'
import { FormattedMessage } from 'umi'
import { v4 as uuidv4 } from 'uuid'

interface SliderVerifyValue {
  status: boolean
  key: string
  randomStr: string
}

interface SliderVerifyProps {
  value?: SliderVerifyValue
  onChange?: (value: SliderVerifyValue) => void
}

const SliderVerify: FC<SliderVerifyProps> = ({ value, onChange }) => {
  const [state, setState] = useSetState<SliderVerifyValue>({
    status: false,
    key: '',
    randomStr: uuidv4()
  })
  const sliderRef = useRef<any>()

  const onSuccess = async () => {
    let data
    try {
      data = await smsPublicKey(state.randomStr)
    } catch (e) {
      console.log(e)
      sliderRef.current.reset()
      return
    }
    const { key, randomStr } = data
    const changeValue = {
      status: true,
      key: key,
      randomStr: randomStr
    }
    if (onChange) {
      onChange(changeValue)
    }
    setState(changeValue)
  }

  useEffect(() => {
    /** form重置 */
    if (value && !value.status) {
      setState({
        key: '',
        randomStr: uuidv4()
      })
      sliderRef.current.reset()
    }
  }, [value])

  return (
    <ReactSliderVerify
      ref={sliderRef}
      width={326}
      height={40}
      barWidth={50}
      tips={<FormattedMessage id='pages.login.slider.tips' />}
      onSuccess={onSuccess}
      bgColor='-webkit-gradient(linear,left top,right top,color-stop(0,#4d4d4d),color-stop(.4,#4d4d4d),color-stop(.5,#fff),color-stop(.6,#4d4d4d),color-stop(1,#4d4d4d))'
    />
  )
}

export default SliderVerify
