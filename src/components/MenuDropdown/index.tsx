/*
 * @Author: Derek Xu
 * @Date: 2023-01-29 16:33:09
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-03-03 15:39:29
 * @FilePath: \xuct-calendar-antd-pc\src\components\MenuDropdown\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */
import { AppstoreAddOutlined, createFromIconfontCN } from '@ant-design/icons'
import { useSetState } from 'ahooks'
import { Popover } from 'antd'
import { FC } from 'react'
import { FormattedMessage, Link } from 'umi'
import styles from './index.less'
import SettingForm from './SettingForm'

interface IPageOption {}

interface State {
  visable: boolean
  menuVisable: boolean
}

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_2980920_rdoc7lrrkn.js'
})

const MenuDropdown: FC<IPageOption> = () => {
  const [state, setSetate] = useSetState<State>({
    visable: false,
    menuVisable: false
  })

  const itemClick = (key: string) => {
    //message.info(`Click on item ${key}`)
    switch (key) {
      case '1':
        setSetate({
          visable: true,
          menuVisable: false
        })
        break
    }
  }

  const menu = () => {
    return (
      <div className={styles.menu_content}>
        <ul>
          <li className={styles.item} onClick={() => itemClick('1')}>
            <IconFont type='page-icon-shezhi' />
            <div className={styles.action}>
              <span>
                <FormattedMessage id='component.globalHeader.menu.setting' />
              </span>
              <span>
                <FormattedMessage id='component.globalHeader.menu.setting.desc' />
              </span>
            </div>
          </li>
          <li className={styles.item}>
            <Link target='_blank' to={'/group'} rel='opener'>
              <IconFont type='page-icon-zu5889' />
              <div className={styles.action}>
                <span>
                  <FormattedMessage id='component.globalHeader.menu.address' />
                </span>
                <span>
                  <FormattedMessage id='component.globalHeader.menu.address.desc' />
                </span>
              </div>
            </Link>
          </li>
          <li className={styles.item}>123123</li>
        </ul>
      </div>
    )
  }

  return (
    <>
      <Popover
        placement='bottomRight'
        trigger='click'
        content={menu}
        open={state.menuVisable}
        arrow={false}
        onOpenChange={(e) => {
          setSetate({ menuVisable: e })
        }}
      >
        <div className={styles.menu}>
          <AppstoreAddOutlined
            onClick={() =>
              setSetate({
                menuVisable: !state.menuVisable
              })
            }
          />
        </div>
      </Popover>
      <SettingForm
        open={state.visable}
        setOpen={() => {
          setSetate({
            visable: false
          })
        }}
      ></SettingForm>
    </>
  )
}

export default MenuDropdown
