import type { IBrand } from '@itrumors/types'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { EditableProTable, PageContainer } from '@ant-design/pro-components'
import { useModel } from '@umijs/max'
import { message } from 'antd'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { brandAdd } from '@/services'

function BrandList() {
  const actionRef = useRef<ActionType>()
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<IBrand[]>([])
  const { brandList, getBrandList } = useModel('useBrand')
  const { categoryList, getCategoryList } = useModel('useCategory')

  const getData = useCallback(async () => {
    await getBrandList()
  }, [getBrandList])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    getCategoryList()
  }, [getCategoryList])

  useEffect(() => {
    actionRef.current?.reload?.()
  }, [brandList])

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

  const columns: ProColumns<IBrand>[] = [
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: '分类',
      dataIndex: 'cid',
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

  const id = { id: (Math.random() * 1000000).toFixed(0), cid: '1' } as unknown as IBrand

  return (
    <PageContainer>
      <EditableProTable<IBrand>
        actionRef={actionRef}
        columns={columns}
        dateFormatter='string'
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            if (typeof data.id === 'string')
              delete data.id

            brandAdd({ ...data }).then(res => {
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
        request={async () => {
          return {
            data: brandList,
            success: true
          }
        }}
        rowKey='id'
        search={false}
        value={brandList} />
    </PageContainer>
  )
}

export default BrandList
