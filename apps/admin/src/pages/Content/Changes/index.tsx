import type { IChanges } from '@itrumors/types'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import {
  FooterToolbar,
  PageContainer,
  ProTable
} from '@ant-design/pro-components'
import { useModel } from '@umijs/max'
import { Button, Popconfirm } from 'antd'
import type { FC } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { changesList } from '@/services'

const Changes: FC = () => {
  const actionRef = useRef<ActionType>()
  const [selectedRowsState, setSelectedRows] = useState<IChanges[]>([])
  const { categoryList, getCategoryList } = useModel('useList')

  useEffect(() => {
    getCategoryList({ sid: 18, pid: 4 })
  }, [getCategoryList])

  const del = (id?: number | string) => {
    console.log(id)
  }

  const cidList = useMemo(() => {
    return categoryList.reduce((obj, item) => {
      obj[item.id!] = item.name
      return obj
    }, {} as Record<string, number | string | undefined>)
  }, [categoryList])

  const columns: ProColumns<IChanges>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      copyable: true
    },
    {
      title: '分类',
      dataIndex: 'cid',
      valueEnum: cidList
    },
    {
      title: '颜色',
      search: false,
      dataIndex: 'color'
    },
    {
      title: '文字',
      search: false,
      dataIndex: 'text'
    },
    {
      title: 'url',
      dataIndex: 'url',
      search: false
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, entity) => [
        <Popconfirm key='delete' onConfirm={() => del(entity.id)} title='确定要删除吗？'>
          <a>删除</a>
        </Popconfirm>
      ]
    }
  ]

  return (
    <PageContainer>
      <ProTable<IChanges>
        actionRef={actionRef}
        columns={columns}
        request={async params => {
          console.log(params, 'params')
          const res = await changesList(params)
          console.log(res, 'res')
          return {
            data: res.data?.list,
            total: res.data?.total,
            success: true
          }
        }}
        rowKey='id'
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows)
          }
        }} />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600
                }}>
                {selectedRowsState.length}
              </a>{' '}
              项
            </div>
          }>
          <Button type='primary'>批量审批</Button>
        </FooterToolbar>
      )}
    </PageContainer>
  )
}

export default Changes
