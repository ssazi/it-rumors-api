import type { ICategory } from '@itrumors/types'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { EditableProTable, PageContainer } from '@ant-design/pro-components'
import { useModel } from '@umijs/max'
import { message } from 'antd'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { categoryAdd } from '@/services'

function Category() {
  const actionRef = useRef<ActionType>()
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<ICategory[]>([])
  const { categoryList, getCategoryList } = useModel('useCategory')

  const getData = useCallback(async () => {
    await getCategoryList()
  }, [getCategoryList])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    actionRef.current?.reload?.()
  }, [categoryList])

  const cateEnum = useMemo(() => {
    return categoryList
      .filter(item => item.pid === '0')
      .reduce(
        (pre, cur) => {
          pre[cur.id!] = cur.name!
          return pre
        },
        { 0: '无' } as { [key: number]: string }
      )
  }, [categoryList])

  const columns: ProColumns<ICategory>[] = [
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: '父类',
      dataIndex: 'pid',
      valueType: 'select',
      valueEnum: cateEnum
    },
    {
      title: '目录',
      dataIndex: 'dir'
    },
    {
      title: '排序',
      dataIndex: 'rank'
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0: { text: '正常', status: 'Success' },
        1: { text: '禁用', status: 'Error' }
      }
    },
    {
      title: '操作',
      width: 164,
      key: 'option',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key='editable'
          onClick={() => {
            action?.startEditable?.(record.id!)
          }}>
          编辑
        </a>,
        <a
          key='delete'
          onClick={() => {
            setDataSource(dataSource.filter(item => item.id !== record.id))
          }}>
          删除
        </a>
      ]
    }
  ]

  const id = { id: (Math.random() * 1000000).toFixed(0), cid: '1' } as unknown as ICategory

  const expandedRowRender = (record: { sub?: ICategory[] } & ICategory) => {
    return (
      <EditableProTable<ICategory>
        bordered={false}
        columns={columns}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            if (typeof data.id === 'string')
              delete data.id

            categoryAdd({ ...data }).then(res => {
              if (res.status === 200) {
                if (data.id)
                  message.success('修改成功')

                else
                  message.success('添加成功')

                getData()
              }
              else {
                message.error(res.message)
              }
            })
            console.log(rowKey, data, row)
          },
          onChange: setEditableRowKeys
        }}
        options={false}
        pagination={false}
        recordCreatorProps={{
          record: () => id
        }}
        request={async () => ({
          data: record.sub,
          success: true
        })}
        rowKey='id'
        search={false}
        showHeader={false}
        value={record.sub} />
    )
  }
  return (
    <PageContainer>
      <EditableProTable<ICategory>
        actionRef={actionRef}
        columns={columns}
        dateFormatter='string'
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            if (typeof data.id === 'string')
              delete data.id

            categoryAdd({ ...data }).then(res => {
              if (res.status === 200) {
                if (data.id)
                  message.success('修改成功')

                else
                  message.success('添加成功')

                getData()
              }
              else {
                message.error(res.message)
              }
            })
            console.log(rowKey, data, row)
          },
          onChange: setEditableRowKeys
        }}
        expandable={{
          expandedRowRender: record => expandedRowRender(record)
        }}
        options={false}
        pagination={false}
        recordCreatorProps={{
          record: () => id
        }}
        request={async () => {
          return {
            data: categoryList,
            success: true
          }
        }}
        rowKey='id'
        search={false}
        value={categoryList} />
    </PageContainer>
  )
}

export default Category
