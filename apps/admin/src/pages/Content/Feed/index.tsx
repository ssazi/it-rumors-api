import type { IFeed } from '@itrumor/types'
import { PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { FooterToolbar, ModalForm, PageContainer, ProFormSelect, ProFormText, ProFormTextArea, ProTable } from '@ant-design/pro-components'
import type { FormInstance } from 'antd'
import { Button, Popconfirm, message } from 'antd'
import type { FC } from 'react'
import { useRef, useState } from 'react'
import { modelType, statusType } from '@itrumor/types'
import { feedAdd, feedList } from '@/services'

const Feed: FC = () => {
  const actionRef = useRef<ActionType>()
  const formRef = useRef<FormInstance>()
  const [selectedRowsState, setSelectedRows] = useState<IFeed[]>([])
  const [modalVisit, setModalVisit] = useState(false)
  const [editData, setEditData] = useState<IFeed>()

  const del = (id?: number | string) => {
    console.log(id)
  }

  const columns: ProColumns<IFeed>[] = [
    {
      title: '关联',
      search: false,
      dataIndex: 'associate',
      render: (_, entity) => {
        const name = entity.product?.name || entity.topic?.name
        const type = modelType[entity.sid!]
        return name ? `${name}${type ? `(${type})` : ''}` : '-'
      }
    },
    {
      title: '模型',
      dataIndex: 'sid',
      width: 80,
      valueEnum: modelType
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 80,
      valueEnum: {
        1: '关注',
        2: '评分',
        3: '评价',
        4: '添加',
        update: '更新'
      }
    },
    {
      title: '用户名',
      search: false,
      dataIndex: 'username',
      width: 100,
      render: (_, entity) => entity.user?.username
    },
    {
      title: '更新时间',
      search: false,
      dataIndex: 'updated_at',
      width: 180
    },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updated_at',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'created_at',
      search: false,
      width: 180
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: statusType,
      width: 80
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 80,
      render: (_, entity) => [
        <a
          key='edit'
          onClick={() => {
            setModalVisit(true)
            setEditData(entity)
            setTimeout(() => formRef.current?.setFieldsValue(entity), 100)
          }}>
          编辑
        </a>,
        <Popconfirm key='delete' onConfirm={() => del(entity.id)} title='确定要删除吗？'>
          <a>删除</a>
        </Popconfirm>
      ]
    }
  ]

  return (
    <PageContainer
      extra={
        <Button
          key='primary'
          onClick={() => {
            setModalVisit(true)
          }}
          type='primary'>
          <PlusOutlined /> 新建
        </Button>
      }>
      <ProTable<IFeed>
        actionRef={actionRef}
        columns={columns}
        request={async params => {
          console.log(params, 'params')
          const { current, pageSize } = params
          const param = {
            current,
            pageSize
          }
          const res = await feedList(param)
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
      <ModalForm<IFeed>
        autoFocusFirstInput
        formRef={formRef}
        modalProps={{
          onCancel: () => {
            formRef.current?.resetFields()
            setEditData(undefined)
          }
        }}
        onFinish={async values => {
          console.log(values)
          const res = await feedAdd({ ...values, id: editData?.id })
          if (res.status === 200) {
            if (editData?.id)
              message.success('修改成功')

            else
              message.success('添加成功')

            actionRef.current?.reload()
            return true
          }
          else {
            return message.error(res.message)
          }
        }}
        onOpenChange={setModalVisit}
        open={modalVisit}
        title='新建'>
        <ProFormText label='名称' name='name' placeholder='请输入名称' rules={[{ required: true }]} />
        <ProFormSelect label='模型' name='sid' options={Object.keys(modelType).map(Number).map(item => ({ label: modelType[item], value: item }))} />
        <ProFormSelect label='状态' name='status' placeholder='请选择状态' valueEnum={statusType} />
        <ProFormText label='目录' name='dir' placeholder='请输入目录' />
        <ProFormTextArea label='简介' name='summary' />
      </ModalForm>
    </PageContainer>
  )
}

export default Feed
