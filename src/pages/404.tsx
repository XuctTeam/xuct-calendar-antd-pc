/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 09:23:28
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-17 10:19:48
 * @FilePath: \xuct-calendar-antd-pc\src\pages\404.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { Button, Result } from 'antd'
import React from 'react'
import { history } from 'umi'

const NoFoundPage: React.FC = () => (
  <div className='antd-result'>
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Button type='primary' onClick={() => history.push('/')}>
          Back Home
        </Button>
      }
    />
  </div>
)

export default NoFoundPage
