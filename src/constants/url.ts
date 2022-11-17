/*
 * @Author: Derek Xu
 * @Date: 2022-09-30 08:52:52
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-17 08:50:04
 * @FilePath: \xuct-calendar-antd-pc\src\constants\url.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */

const SECURITY_OAUTH2_IGNORE_URL = [
  '/api/app/v1/sms/anno/login',
  '/api/app/v1/sms/anno/forget',
  '/api/app/v1/email/anno/forget',
  '/api/app/v1/member/anno/forget/modify',
  '/api/app/v1/member/anno/forget/check',
  '/api/app/v1/sms/anno/register',
]

export { SECURITY_OAUTH2_IGNORE_URL }
