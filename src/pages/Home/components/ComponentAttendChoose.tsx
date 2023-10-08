/*
 * @Author: Derek Xu
 * @Date: 2023-01-06 17:26:57
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-10-08 19:02:11
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\ComponentAttendChoose.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */
import { FormattedMessage } from '@/.umi/plugin-locale'
import { useSetState } from 'ahooks'
import { Button, Col, Empty, Modal, Row, Tag, Tree } from 'antd'
import type { DataNode } from 'antd/es/tree'
import React, { useEffect } from 'react'
import styles from './ComponentAttendChoose.less'

interface IPageOption {
  visible: boolean
  setVisible: (visible: boolean) => void
  groups?: GROUP.TreeMember[]
  attends?: CALENDAR.Attend[]
  attendChooseSet: (attends: CALENDAR.Attend[]) => void
}

interface State {
  treeData: DataNode[]
  checkedKeys: React.Key[]
  allMembers: Map<string, GROUP.GroupMember>
}

const ComponentAttendChoose = ({ visible: visible, setVisible: setVisible, groups, attends, attendChooseSet }: IPageOption) => {
  const [state, setState] = useSetState<State>({
    treeData: [],
    checkedKeys: [],
    allMembers: new Map<string, GROUP.GroupMember>()
  })

  useEffect(() => {
    if (!visible) {
      setState({
        checkedKeys: [],
        allMembers: new Map<string, GROUP.GroupMember>()
      })
      return
    }
    _init()
  }, [visible, attends])

  const _init = () => {
    if (!groups || groups?.length === 0) return
    const _treeData: DataNode[] = []
    const _attendsSet = new Set(attends?.map((item) => item.memberId))
    const _selectedKey: string[] = []
    const allMembers: Map<string, GROUP.GroupMember> = new Map()

    groups.forEach((item) => {
      const node: DataNode = {
        title: item.groupName,
        key: 'G'.concat(item.groupId),
        children: []
      }
      item.members.forEach((m) => {
        node.children?.push({
          title: m.name,
          key: item.groupId + 'M' + m.memberId
        })
        const _m = { ...m }
        if (_attendsSet.has(m.memberId)) {
          _selectedKey.push(item.groupId + 'M' + m.memberId)
          _m.checked = true
        }
        allMembers.set(_m.memberId, _m)
      })
      _treeData.push(node)
    })
    setState({
      treeData: _treeData,
      checkedKeys: _selectedKey,
      allMembers
    })
  }

  const onCheck = (checkedKeysValue: any) => {
    const _all = new Set((checkedKeysValue as string[]).filter((i) => i.includes('M')).map((item) => item.split('M')[1]))
    const _newMemberMaps = new Map<string, GROUP.GroupMember>()
    Array.from(state.allMembers.values()).forEach((item) => {
      const _m = { ...item, checked: false }
      if (_all.has(_m.memberId)) {
        _m.checked = true
      }
      _newMemberMaps.set(_m.memberId, _m)
    })
    setState({
      checkedKeys: checkedKeysValue,
      allMembers: _newMemberMaps
    })
  }

  const cleanAll = () => {
    const _newMemberMaps = new Map<string, GROUP.GroupMember>()
    Array.from(state.allMembers.values()).forEach((item) => {
      const _m = { ...item, checked: false }
      _newMemberMaps.set(_m.memberId, _m)
    })
    setState({
      checkedKeys: [],
      allMembers: _newMemberMaps
    })
  }

  const okSelected = () => {
    const memberIds = (state.checkedKeys as string[]).filter((i) => i.valueOf).map((item) => item.split('M')[1])
    if (memberIds.length === 0) {
      setVisible(false)
      return
    }
    const attends: CALENDAR.Attend[] = []
    memberIds.forEach((i) => {
      const m = state.allMembers.get(i)
      if (!m) {
        return
      }
      const { name, memberId, avatar } = m
      attends.push({
        name,
        memberId,
        avatar,
        status: 0
      })
    })
    attendChooseSet(attends)
    setVisible(false)
  }

  return (
    <Modal
      title={<FormattedMessage id='pages.component.add.attend.add.form.title' />}
      open={visible}
      onCancel={() => setVisible(false)}
      width={1000}
      style={{ zIndex: 9999 }}
      destroyOnClose
      onOk={okSelected}
      transitionName=''
    >
      <Row className={styles.container} gutter={10}>
        <Col span={14}>
          {state.treeData.length === 0 ? (
            <div className={styles.empty}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          ) : (
            <Tree checkable defaultExpandAll onCheck={onCheck} checkedKeys={state.checkedKeys} treeData={state.treeData} blockNode height={500} />
          )}
        </Col>
        <Col span={10}>
          <div className={styles.right}>
            <div className={styles.action}>
              <span></span>
              <Button
                size='small'
                type='link'
                onClick={() => {
                  cleanAll()
                }}
              >
                <FormattedMessage id='pages.component.add.attend.add.form.clean' />
              </Button>
            </div>
            <div className={styles.selected}>
              {Array.from(state.allMembers.values())
                .filter((i) => i.checked)
                .map((item) => {
                  return (
                    <Tag
                      color='#87d068'
                      key={item.memberId}
                      closable
                      onClose={(e) => {
                        e.preventDefault()
                        //handleClose(tag)
                      }}
                    >
                      {item.name}
                    </Tag>
                  )
                })}
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  )
}

export default ComponentAttendChoose
