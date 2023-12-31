import type { ISpu } from '@itrumors/types'
import { PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components'
import { Button, Popconfirm, Popover } from 'antd'
import type { FC } from 'react'
import { useRef, useState } from 'react'
import EditProduct from './EditProduct'
import PicModal from './PicModal'
import { spuList } from '@/services'

const Spu: FC = () => {
  const actionRef = useRef<ActionType>()
  const [selectedRowsState, setSelectedRows] = useState<ISpu[]>([])
  const [modalVisit, setModalVisit] = useState(false)
  const [modalPic, setModalPic] = useState(false)
  const [editData, setEditData] = useState<ISpu>()

  const del = (id?: number | string) => {
    console.log(id)
  }

  const columns: ProColumns<ISpu>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      copyable: true,
      render: (_, entity) => (
        <Popover
          content={
            <img
              src={entity.cover}
              style={{
                width: 200
              }} />
          }>
          {entity.name}
        </Popover>
      )
    },
    {
      title: '发布',
      dataIndex: 'is_publish',
      render: val => val ? '是' : '否',
      valueEnum: {
        true: '是',
        false: '否'
      }
    },
    {
      title: '人气',
      sorter: true,
      search: false,
      dataIndex: 'hits'
    },
    {
      title: '更新时间',
      search: false,
      dataIndex: 'updated_at'
    },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updated_at',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 390,
      render: (_, entity) => [
        <span
          key='edit'
          onClick={() => {
            setModalVisit(true)
            setEditData(entity)
          }}>
          <a>基本</a>
        </span>,
        <a
          key='pic'
          onClick={() => {
            setModalPic(true)
            setEditData(entity)
          }}>
          图片
        </a>,
        <Popconfirm key='delete' onConfirm={() => del(entity.id)} title='确定要删除吗？'>
          <a>删除</a>
        </Popconfirm>
      ]
    }
  ]
  return (
    <PageContainer header={{ title: false }}>
      <ProTable<ISpu>
        actionRef={actionRef}
        columns={columns}
        dateFormatter='string'
        request={async params => {
          const { current, pageSize, name: wd, is_publish, updated_at } = params
          const param = {
            current,
            pageSize,
            filter: JSON.stringify({
              wd,
              is_publish,
              created_at: updated_at?.join(',')
            })
          }
          const res = await spuList(param)
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
        }}
        toolBarRender={() => [
          <Button key='primary' onClick={() => setModalVisit(true)} type='primary'>
            <PlusOutlined /> 新建
          </Button>
        ]} />
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
      {modalVisit ? <EditProduct actionRef={actionRef} editData={editData} setEditData={setEditData} setVisible={setModalVisit} visible={modalVisit} /> : null}
      {modalPic ? <PicModal actionRef={actionRef} data={editData} setVisible={setModalPic} visible={modalPic} /> : null}
    </PageContainer>
  )
}

export default Spu
