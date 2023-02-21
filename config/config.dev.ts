/*
 * @Author: Derek Xu
 * @Date: 2022-11-15 14:55:59
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-02-21 17:53:49
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
    'process.env': {
      NODE_ENV: 'dev',
      UMI_ENV: 'dev',
      // 客户端认证
      APP_CLIENT: 'YXBwOmFwcA==',
      /* SERVICE服务地址 */
      API_URL: '/rest',
      /* 图片服务器地址 */
      IMAGE_URL: 'https://images.xuct.net.cn/'
    }
  }
})
