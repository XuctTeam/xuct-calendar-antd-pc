/*
 * @Author: Derek Xu
 * @Date: 2023-01-06 17:26:57
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-01-06 17:36:36
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\components\ComponentAttendChoose.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */
import React, { FC, useState } from 'react'
import { Transfer, Tree, theme, Modal } from 'antd'
import type { TransferDirection, TransferItem } from 'antd/es/transfer'
import type { DataNode } from 'antd/es/tree'

interface IPageOption {
  visable: boolean
  setVisable: () => void
}

interface TreeTransferProps {
  dataSource: DataNode[]
  targetKeys: string[]
  onChange: (targetKeys: string[], direction: TransferDirection, moveKeys: string[]) => void
}

// Customize Table Transfer
const isChecked = (selectedKeys: (string | number)[], eventKey: string | number) => selectedKeys.includes(eventKey)

const generateTree = (treeNodes: DataNode[] = [], checkedKeys: string[] = []): DataNode[] =>
  treeNodes.map(({ children, ...props }) => ({
    ...props,
    disabled: checkedKeys.includes(props.key as string),
    children: generateTree(children, checkedKeys)
  }))

const TreeTransfer = ({ dataSource, targetKeys, ...restProps }: TreeTransferProps) => {
  const { token } = theme.useToken()

  const transferDataSource: TransferItem[] = []
  function flatten(list: DataNode[] = []) {
    list.forEach((item) => {
      transferDataSource.push(item as TransferItem)
      flatten(item.children)
    })
  }
  flatten(dataSource)

  return (
    <Transfer
      {...restProps}
      targetKeys={targetKeys}
      dataSource={transferDataSource}
      className='tree-transfer'
      render={(item) => item.title!}
      showSelectAll={false}
    >
      {({ direction, onItemSelect, selectedKeys }) => {
        if (direction === 'left') {
          const checkedKeys = [...selectedKeys, ...targetKeys]
          return (
            <div style={{ padding: token.paddingXS }}>
              <Tree
                blockNode
                checkable
                checkStrictly
                defaultExpandAll
                checkedKeys={checkedKeys}
                treeData={generateTree(dataSource, targetKeys)}
                onCheck={(_, { node: { key } }) => {
                  onItemSelect(key as string, !isChecked(checkedKeys, key))
                }}
                onSelect={(_, { node: { key } }) => {
                  onItemSelect(key as string, !isChecked(checkedKeys, key))
                }}
              />
            </div>
          )
        }
      }}
    </Transfer>
  )
}

const treeData: DataNode[] = [
  { key: '0-0', title: '0-0' },
  {
    key: '0-1',
    title: '0-1',
    children: [
      { key: '0-1-0', title: '0-1-0' },
      { key: '0-1-1', title: '0-1-1' }
    ]
  },
  { key: '0-2', title: '0-2' },
  { key: '0-3', title: '0-3' },
  { key: '0-4', title: '0-4' }
]

const ComponentAttendChoose: FC<IPageOption> = ({ visable, setVisable }) => {
  const [targetKeys, setTargetKeys] = useState<string[]>([])
  const onChange = (keys: string[]) => {
    setTargetKeys(keys)
  }

  return (
    <Modal title='Basic Modal' open={visable} onCancel={setVisable}>
      <TreeTransfer dataSource={treeData} targetKeys={targetKeys} onChange={onChange} />;
    </Modal>
  )
}

export default ComponentAttendChoose
