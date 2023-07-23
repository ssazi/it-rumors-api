import type { IAttachment } from '@itrumor/types'
import { PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { FooterToolbar, ModalForm, PageContainer, ProFormTextArea, ProTable } from '@ant-design/pro-components'
import type { FormInstance } from 'antd'
import { Button, Popconfirm, Popover, message } from 'antd'
import type { FC } from 'react'
import { useRef, useState } from 'react'
import { modelType } from '@itrumor/types'
import { attachmentAdd, attachmentList } from '@/services'

const Attachment: FC = () => {
  const actionRef = useRef<ActionType>()
  const formRef = useRef<FormInstance>()
  const [selectedRowsState, setSelectedRows] = useState<IAttachment[]>([])
  const [modalVisit, setModalVisit] = useState(false)
  const [editData, setEditData] = useState<IAttachment>()

  const del = (id?: number | string) => {
    console.log(id)
  }

  const columns: ProColumns<IAttachment>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      copyable: true,
      ellipsis: true,
      width: 120,
      render: (_, entity) => (
        <Popover
          content={
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <img
                src={entity.file_path}
                style={{
                  width: 200
                }} />
              {entity.file_name}
            </div>
          }>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <img alt={entity?.file_name} src={entity?.file_path} style={{ width: 100, marginRight: 10 }} />
          </div>
        </Popover>
      )
    },
    {
      title: '关联',
      search: false,
      dataIndex: 'associate',
      render: (_, entity) => {
        const name = entity.product?.name || entity.topic?.name || entity.company?.name
        const type = modelType[entity.sid!]
        return name ? `${name}${type ? `(${type})` : ''}` : '-'
      }
    },
    {
      title: '用户名',
      search: false,
      dataIndex: 'username',
      width: 120,
      render: (_, entity) => entity.user?.username
    },
    {
      title: '是否远程',
      search: false,
      dataIndex: 'is_remote',
      render: (_, entity) => (entity.is_remote ? '远程' : '本地'),
      width: 80
    },
    {
      title: '文件类型',
      search: false,
      dataIndex: 'file_type',
      width: 80
    },
    {
      title: '图片类型',
      search: false,
      dataIndex: 'type',
      width: 80
    },
    {
      title: '文件大小',
      search: false,
      dataIndex: 'file_size',
      width: 80
    },
    // {
    //   title: '路径',
    //   search: false,
    //   ellipsis: true,
    //   tooltip: true,
    //   dataIndex: 'file_path'
    // },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updated_at',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '上传时间',
      sorter: true,
      dataIndex: 'created_at',
      search: false,
      width: 180
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 100,
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
        <Button key='primary' onClick={() => setModalVisit(true)} type='primary'>
          <PlusOutlined /> 新建
        </Button>
      }>
      <ProTable<IAttachment>
        actionRef={actionRef}
        columns={columns}
        request={async params => {
          console.log(params, 'params')
          const { current, pageSize } = params
          const param = {
            current,
            pageSize
          }
          const res = await attachmentList(param)
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
      <ModalForm<IAttachment>
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
          const res = await attachmentAdd({ ...values, id: editData?.id })
          if (res.status === 200) {
            if (editData?.id)
              message.success('修改成功')

            else
              message.success('添加成功')

            formRef.current?.resetFields()
            actionRef.current?.reload()
            return true
          }
          else {
            message.error(res.message)
            return false
          }
        }}
        onOpenChange={setModalVisit}
        open={modalVisit}
        title='新建'>
        <ProFormTextArea label='内容' name='content' rules={[{ required: true }]} />
      </ModalForm>
    </PageContainer>
  )
}

export default Attachment
