/*
 * @Author: Derek Xu
 * @Date: 2023-01-29 16:33:09
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-10-09 13:29:21
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
import SettingForm from './SettingForm'
import styles from './index.less'

interface IPageOption {}

interface State {
  visible: boolean
  menuVisible: boolean
}

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_2980920_rdoc7lrrkn.js'
})

const MenuDropdown: FC<IPageOption> = () => {
  const [state, setState] = useSetState<State>({
    visible: false,
    menuVisible: false
  })

  const itemClick = (key: string) => {
    //message.info(`Click on item ${key}`)
    switch (key) {
      case '1':
        setState({
          visible: true,
          menuVisible: false
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
                <FormattedMessage id='component.globalHeader.menu.setting' />{' '}
              </span>
              <span>
                <FormattedMessage id='component.globalHeader.menu.setting.desc' />
              </span>
            </div>
          </li>
          <li className={styles.item}>
            <Link
              target='_blank'
              to={'/group'}
              rel='opener'
              onClick={() => {
                setState({ menuVisible: true })
              }}
            >
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
        open={state.menuVisible}
        arrow={false}
        onOpenChange={(e) => {
          setState({ menuVisible: e })
        }}
      >
        <div className={styles.menu}>
          <AppstoreAddOutlined
            onClick={() =>
              setState({
                menuVisible: !state.menuVisible
              })
            }
          />
        </div>
      </Popover>
      <SettingForm
        open={state.visible}
        setOpen={() => {
          setState({
            visible: false
          })
        }}
      ></SettingForm>
    </>
  )
}

export default MenuDropdown
