import type { IAttachment, ICompany } from '@itrumors/types'
import { PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProForm,
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
  ProTable
} from '@ant-design/pro-components'
import type { FormInstance } from 'antd'
import { Button, Popconfirm, Popover, message } from 'antd'
import type { FC } from 'react'
import { useRef, useState } from 'react'
import { modelName } from '@itrumors/types'
import UploadImage from '@/components/Upload'
import { companyAdd, companyDelete, companyList } from '@/services'

const { Item } = ProForm

const Company: FC = () => {
  const actionRef = useRef<ActionType>()
  const formRef = useRef<FormInstance>()
  const imgRef = useRef<{ handleRemove: any }>()
  const [selectedRowsState, setSelectedRows] = useState<ICompany[]>([])
  const [modalVisit, setModalVisit] = useState(false)
  const [editData, setEditData] = useState<ICompany>()

  const del = async (id: number) => {
    console.log(id)
    const res = await companyDelete({ id })
    console.log(res)
    actionRef.current?.reload()
  }

  const columns: ProColumns<ICompany>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      copyable: true,
      render: (name, entity) =>
        entity.poster?.file_path
          ? (
            <Popover
              content={
                <img
                  src={entity.poster?.file_path}
                  style={{
                    width: 100
                  }} />
            }>
              {name}
            </Popover>
            )
          : (
              name || '-'
            )
    },
    {
      title: '地址',
      search: false,
      dataIndex: 'address'
    },
    {
      title: '官网',
      search: false,
      dataIndex: 'website'
    },
    {
      title: '国家',
      dataIndex: 'country'
    },
    {
      title: '简介',
      search: false,
      dataIndex: 'content'
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
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
        <Popconfirm key='delete' onConfirm={() => del(entity.id!)} title='确定要删除吗？'>
          <a>删除</a>
        </Popconfirm>
      ]
    }
  ]

  const onImage = (data: IAttachment) => {
    console.log(data)
    formRef.current?.setFieldValue('logo', data.id)
  }

  return (
    <PageContainer
      extra={
        <Button key='primary' onClick={() => setModalVisit(true)} type='primary'>
          <PlusOutlined /> 新建
        </Button>
      }>
      <ProTable<ICompany>
        actionRef={actionRef}
        columns={columns}
        request={async params => {
          console.log(params, 'params')
          const res = await companyList(params)
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
      <ModalForm<ICompany>
        autoFocusFirstInput
        formRef={formRef}
        modalProps={{
          onCancel: () => {
            formRef.current?.resetFields()
            setEditData(undefined)
          }
        }}
        onFinish={async values => {
          const res = await companyAdd({ ...values, id: editData?.id })
          if (res.status === 200) {
            if (editData?.id) {
              message.success('修改成功')
              imgRef.current?.handleRemove?.(null, 0)
            }

            else { message.success('添加成功') }

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
        title={editData?.id ? '新建' : '编辑'}>
        <ProFormText label='名称' name='name' placeholder='请输入名称' rules={[{ required: true }]} />
        <ProFormText label='地址' name='address' placeholder='请输入地址' />
        <ProFormText label='官网' name='website' placeholder='请输入官网' />
        <ProFormText label='国家' name='country' placeholder='请输入国家' />
        <ProFormDigit label='logoId' name='logo' placeholder='请输入logoId' rules={[{ required: true }]} />
        <ProFormTextArea label='简介' name='content' />
        <Item label='logo'>
          <UploadImage aid={editData?.id} isUrl onChange={onImage} ref={imgRef} sid={modelName.COMPANY} value={editData?.poster} />
        </Item>
      </ModalForm>
    </PageContainer>
  )
}

export default Company
