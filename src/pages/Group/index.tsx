/*
 * @Author: Derek Xu
 * @Date: 2023-02-21 13:00:27
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-03-15 15:02:20
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Group\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */
import { Dropdown, Layout, MenuProps, Space, Table, Tag } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import Tree, { DataNode, TreeProps } from 'antd/es/tree'
import styled from './index.less'

const treeData: DataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true
          },
          {
            title: 'leaf',
            key: '0-0-0-1'
          }
        ]
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }]
      }
    ]
  }
]

interface DataType {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'loser') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </>
    )
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    )
  }
]

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

export default function index() {
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
  }

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info)
  }

  const DeleteNode = (key, d, sw) => {
    let nodeArray = []
    for (let i = 0; i < d.length; i++) {
      if (d[i]?.key === key) {
        switch (sw) {
          case 'delete':
            // 删除指定元素
            d.splice(i, 1)
            break

          case 'add':
            // 增加节点
            let isBool = d[i]?.children === undefined
            const newObject = {
              title: '新增一条',
              key: `${d[i]?.key}-${isBool ? 0 : d[i]?.children.length}`,
              desc: '新增的'
            }
            if (isBool) {
              // 不存在子节点
              d[i] = { ...d[i], children: [newObject] }
            } else {
              d[i]?.children?.push(newObject)
            }
            break

          case 'edit':
            // 编辑
            alert('无')
            break
        }

        nodeArray = [...d] // 修改后的children数组
        flag = true
        break
      } else if (d[i]?.children) {
        // 递归删除返回剩余元素
        const chilSubSet = DeleteNode(key, d[i]?.children)
        // console.log(d[i]?.key, chilSubSet);
        if (chilSubSet.length || flag) {
          d[i].children = chilSubSet
          nodeArray = [...d]
          setData(nodeArray)
          flag = false
          break
        }
      }
    }
    return nodeArray
  }

  const titleRender = (node: any) => {
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
            1st menu item
          </a>
        )
      },
      {
        key: '2',
        label: (
          <a target='_blank' rel='noopener noreferrer' href='https://www.aliyun.com'>
            2nd menu item
          </a>
        )
      },
      {
        key: '3',
        label: (
          <a target='_blank' rel='noopener noreferrer' href='https://www.luohanacademy.com'>
            3rd menu item
          </a>
        )
      }
    ]

    return (
      <Dropdown menu={{ items }} trigger={['contextMenu']}>
        <div>{node.title}</div>
      </Dropdown>
    )
  }

  return (
    <Layout className={styled.layout}>
      <Header className={styled.header}>Header</Header>
      <Content className={styled.content}>
        <div className={styled.menu}>
          <Tree
            className={styled.tree}
            checkable
            defaultExpandedKeys={['0-0-0', '0-0-1']}
            defaultSelectedKeys={['0-0-0', '0-0-1']}
            defaultCheckedKeys={['0-0-0', '0-0-1']}
            onSelect={onSelect}
            onCheck={onCheck}
            treeData={treeData}
            titleRender={titleRender}
          />
        </div>
        <div className={styled.right}>
          <Table className={styled.table} columns={columns} dataSource={data} />
        </div>
      </Content>
      <Footer className={styled.footer}>Footer</Footer>
    </Layout>
  )
}
