/*
 * @Author: Derek Xu
 * @Date: 2022-11-15 14:55:59
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-22 21:56:49
 * @FilePath: \xuct-calendar-antd-pc\config\config.dev.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { defineConfig } from 'umi'

/**
 * 导出的多环境变量命名约定：一律大写且采用下划线分割单词
 * 注意：在添加变量后，需要在src/typing.d.ts内添加该变量的声明，否则在使用变量时IDE会报错。
 */
export default defineConfig({
  define: {
    APP_CLIENT: 'YXBwOmFwcA==',
    API_URL: '/rest' // API地址
  }
})
