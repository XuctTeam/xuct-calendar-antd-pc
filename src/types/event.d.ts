/*
 * @Author: Derek Xu
 * @Date: 2022-12-29 15:04:10
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-01-04 13:22:36
 * @FilePath: \xuct-calendar-antd-pc\src\types\event.d.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */

declare namespace Event {
  type Action = {
    action: 'event_view' | 'event_edit' | 'event_create'
    data: any
  }
}
