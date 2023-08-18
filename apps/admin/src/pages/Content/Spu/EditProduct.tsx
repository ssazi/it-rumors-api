import type { ISpu } from '@itrumors/types'
import type { ActionType, ProFormInstance } from '@ant-design/pro-components'
import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-components'
import { Cascader, Form, message } from 'antd'
import type { FC } from 'react'
import { useRef } from 'react'
import { statusType } from '@itrumors/types'
import { useBrand, useCategory } from '@/utils/hooks/useUtil'
import { spuAdd, spuDetail, spuName } from '@/services'
import Upload from '@/components/Upload'
import TagList from '@/components/TagList'

const { Item } = Form

interface IEdit {
  actionRef: React.MutableRefObject<ActionType | undefined>
  visible: boolean
  setVisible: (visible: boolean) => void
  setEditData: (data: ISpu | undefined) => void
  editData: ISpu | undefined
}

const SubjectEdit: FC<IEdit> = props => {
  const formRef = useRef<ProFormInstance<ISpu>>()
  const { actionRef, visible, setVisible, setEditData, editData } = props
  const cate = useCategory()
  const brand = useBrand()

  return (
    <ModalForm<ISpu>
      autoFocusFirstInput
      formRef={formRef}
      layout='horizontal'
      modalProps={{
        onCancel: () => {
          formRef.current?.resetFields?.()
          setEditData(undefined)
        }
      }}
      onFinish={async values => {
        console.log(values)
        const res = await spuAdd({ ...values, id: editData?.id })
        if (res.status === 200) {
          if (editData?.id)
            message.success('修改成功')

          else
            message.success('添加成功')

          formRef.current?.resetFields?.()
          actionRef.current?.reload()
          return true
        }
        else {
          message.error(res.message)
          return false
        }
      }}
      onOpenChange={setVisible}
      open={visible}
      request={async () => {
        let data: ISpu = { name: '' }
        if (editData?.id) {
          const subject = await spuDetail({ id: editData?.id })
          data = subject.data
        }
        return data
      }}
      title={editData?.id ? `编辑：${editData.name}` : '新建'}
      width={1340}>
      <ProForm.Group size={5}>
        <Item label='分类' name='cid' required={false} rules={[{ required: true }]}>
          <Cascader options={cate} placeholder='分类' style={{ width: 150 }} />
        </Item>
        <ProFormSelect name='bid' placeholder='品牌' valueEnum={brand} width={150} />
        <ProFormDatePicker fieldProps={{ format: 'YYYY-MM-DD' }} name='time' placeholder='发布时间' width={150} />
        <ProFormSelect name='status' placeholder='状态' valueEnum={statusType} width={120} />
        <ProFormSwitch label='是否发布' name='is_publish' />
      </ProForm.Group>
      <ProFormText
        fieldProps={{
          onBlur: async e => {
            const name = e.target.value
            if (name) {
              const result = await spuName({ name, id: editData?.id })
              if (result.data)
                return message.warning('名称已存在')
            }
          }
        }}
        label='名称'
        name='name'
        placeholder='名称'
        required={false}
        rules={[{ required: true }]} />
      <Item label='标签' name='tag'>
        <TagList name='标签' />
      </Item>
      <Item label='图片' name='cover'>
        <Upload />
      </Item>
      <ProFormTextArea fieldProps={{ rows: 6 }} label='描述' name='desc' placeholder='描述' />
      <ProFormTextArea fieldProps={{ rows: 6 }} label='简介' name='content' placeholder='简介' />
      <ProFormSwitch label='是否显示更多' name='isShowMore' />
      <ProFormDependency name={['isShowMore']}>
        {({ isShowMore }) => {
          if (isShowMore) {
            return (
              <ProForm.Group>
                <ProFormDatePicker fieldProps={{ format: 'YYYY-MM-DD HH:mm:ss' }} label='更新' name='updated_at' placeholder='更新时间' />
                <ProFormDatePicker fieldProps={{ format: 'YYYY-MM-DD HH:mm:ss' }} label='创建' name='created_at' placeholder='更新时间' />
                <ProFormDigit label='访问' name='hits' placeholder='总' width='xs' />
                <ProFormDigit label='日' name='hits_day' placeholder='日' width='xs' />
                <ProFormDigit label='周' name='hits_week' placeholder='周' width='xs' />
                <ProFormDigit label='月' name='hits_month' placeholder='月' width='xs' />
                <ProFormDigit label='顶' name='up' placeholder='顶' width='xs' />
                <ProFormDigit label='踩' name='down' placeholder='踩' width='xs' />
                <ProFormText name='letter' placeholder='首字母' width='xs' />
                <ProFormText name='letters' placeholder='拼音' width='md' />
              </ProForm.Group>
            )
          }
          return null
        }}
      </ProFormDependency>
    </ModalForm>
  )
}

export default SubjectEdit
