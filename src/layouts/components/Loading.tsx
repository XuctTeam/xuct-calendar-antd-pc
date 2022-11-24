/*
 * @Author: Derek Xu
 * @Date: 2022-11-23 18:48:19
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-23 22:54:13
 * @FilePath: \xuct-calendar-antd-pc\src\layouts\components\Loading.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { Spin } from 'antd'
import React from 'react'
import { getIntl } from 'umi'
import styles from './loading.less'

interface IPageOption {
  loading: boolean
}

const Loading: React.FC<IPageOption> = (props) => {
  const { loading } = props
  return loading ? (
    <div className={styles.loading}>
      <Spin
        tip={getIntl().formatMessage({ id: 'pages.loading.title' })}
        style={{
          marginLeft: 8,
          marginRight: 8
        }}
      />
    </div>
  ) : (
    <></>
  )
}

export default Loading
