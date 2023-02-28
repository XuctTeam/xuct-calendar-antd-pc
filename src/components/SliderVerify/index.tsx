import { useSetState } from 'ahooks'
import { FC, useEffect, useRef } from 'react'
import ReactSliderVerify from 'react-slider-verify'
import { FormattedMessage } from 'umi'

interface SliderVerifyValue {
  status: boolean
  key: string
}

interface SliderVerifyProps {
  value?: SliderVerifyValue
  onChange?: (value: SliderVerifyValue) => void
}

const SliderVerify: FC<SliderVerifyProps> = ({ value, onChange }) => {
  const [state, setState] = useSetState<SliderVerifyValue>({
    status: false,
    key: ''
  })
  const sliderRef = useRef<any>()

  const onSuccess = () => {
    const _state = {
      status: true,
      key: '123123'
    }
    setState(_state)
    if (onChange) {
      onChange(_state)
    }
  }

  useEffect(() => {
    if (value && !value.status) {
      debugger
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
