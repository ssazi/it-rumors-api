import type { IAttachment, ISpu } from '@itrumors/types'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Badge, Modal, Popover } from 'antd'
import type { FC } from 'react'
import { useRef, useState } from 'react'
import Upload from '@/components/Upload'
import { attachmentEdit, attachmentList } from '@/services'

export const typeEnum: { [key: string]: string } = { posters: '海报', logos: '标志', backdrops: '剧照' }

interface IEdit {
  actionRef: React.MutableRefObject<ActionType | undefined>
  visible: boolean
  setVisible: (visible: boolean) => void
  data?: ISpu
}

function renderBadge(count: number, active = false) {
  return (
    <Badge
      count={count}
      style={{
        marginBlockStart: -2,
        marginInlineStart: 4,
        color: active ? '#1890FF' : '#999',
        backgroundColor: active ? '#E6F7FF' : '#eee'
      }} />
  )
}

const PicModal: FC<IEdit> = props => {
  const actionTable = useRef<ActionType>()
  const { actionRef, visible, setVisible, data } = props
  const [activeKey, setActiveKey] = useState<React.Key>('tab1')

  const onChange = (data: ISpu) => {
    console.log(data)
    actionTable.current?.reload()
  }

  const onTypeChange = async (type: string, data: IAttachment) => {
    await attachmentEdit({ id: data.id })
    actionTable.current?.reload()
  }

  const onClose = () => {
    setVisible(false)
    actionRef.current?.reload()
  }

  const columns: ProColumns<IAttachment>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      render: (_, entity) => (
        <Popover content={<img
          src={entity.file_path}
          style={{
            width: 200
          }} />}>
          <img
            src={entity.file_path}
            style={{
              width: 30
            }} />
        </Popover>
      )
    },
    {
      title: '用户名',
      dataIndex: 'username',
      render: (_, entity) => entity.user?.username
    },
    {
      title: '大小',
      dataIndex: 'file_size'
    },
    {
      title: '操作',
      key: 'option',
      width: 150,
      valueType: 'option',
      render: (_, record) => [
        <a key='del'>
          删除
        </a>
      ]
    }
  ]

  return (
    <Modal footer={null} onCancel={onClose} open={visible} title={`${data?.name} - 添加图片`} width={1000}>
      <ProTable<IAttachment>
        actionRef={actionTable}
        columns={columns}
        pagination={{
          showQuickJumper: true
        }}
        request={async params => {
          console.log(params, 'params')
          const { current, pageSize } = params
          const param = {
            current,
            pageSize,
            filter: JSON.stringify({
              aid: data?.id,
              sid: data?.sid
            })
          }
          const res = await attachmentList(param)
          return {
            data: res.data?.list,
            total: res.data?.total,
            success: true
          }
        }}
        rowKey='id'
        search={false}
        toolbar={{
          actions: [
            <Upload aid={data?.id} listType='text' onChange={onChange} sid={1} />
          ],
          menu: {
            type: 'tab',
            activeKey,
            items: [
              {
                key: 'tab1',
                label: <span>全部{renderBadge(99, activeKey === 'tab1')}</span>
              },
              {
                key: 'tab2',
                label: <span>海报{renderBadge(30, activeKey === 'tab2')}</span>
              },
              {
                key: 'tab3',
                label: <span>标志{renderBadge(30, activeKey === 'tab3')}</span>
              },
              {
                key: 'tab4',
                label: <span>剧照{renderBadge(30, activeKey === 'tab4')}</span>
              }
            ],
            onChange: key => {
              setActiveKey(key as string)
            }
          }
        }} />
    </Modal>
  )
}

export default PicModal
