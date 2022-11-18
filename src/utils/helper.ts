/*
 * @Author: Derek Xu
 * @Date: 2022-11-18 15:44:21
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-18 15:54:12
 * @FilePath: \xuct-calendar-antd-pc\src\utils\helper.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { DateTime } from 'luxon'
import faker from 'faker'

const colors: string[] = ['indigo', 'blue', 'orange', 'red', 'pink', 'crimson', 'dodgerblue', 'brown', 'purple', 'tomato', 'salmon', 'gray']

export const generateDemoEvents = (date: DateTime = DateTime.now(), count = 250) => {
  const events: any = []

  const start: any = date.set({ day: 1 }).minus({ month: 2 }).toFormat('yyyy-MM-dd')
  const end: any = date.set({ day: 28 }).plus({ month: 2 }).toFormat('yyyy-MM-dd')

  for (let i = 1; i < count; i += 1) {
    const dateStart: any = faker.date.between(start, end)

    const hour: number = Math.floor(Math.random() * 23) + 1
    const minute: number = Math.floor(Math.random() * 40) + 1
    const minuteDuration: number = Math.floor(Math.random() * 120) + 30

    const startDate: DateTime = DateTime.fromJSDate(dateStart).set({
      hour: hour,
      minute: minute
    })
    const endDate: DateTime = startDate.plus({ minute: minuteDuration })

    const event: any = {
      id: Math.random(),
      startAt: startDate.toUTC().toString(),
      endAt: endDate.toUTC().toString(),
      summary: faker.commerce.department(),
      color: colors[Math.floor(Math.random() * colors.length - 1) + 1],
      allDay: endDate.day !== startDate.day
      // style: {
      //   textDecoration: 'line-through',
      //   border: 'solid 1px red',
      //   background: 'white',
      //   color: 'black',
      // },
    }

    events.push(event)
  }

  return events
}
