import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useModel } from '@umijs/max'
import { Button, Input, Modal, Upload, message } from 'antd'
import type { RcFile } from 'antd/lib/upload'
import COS from 'cos-js-sdk-v5'
import type { ReactNode } from 'react'
import { Fragment, forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react'
import SparkMD5 from 'spark-md5'
import type { IAttachment } from '@itrumor/types'
import { attachmentAdd, attachmentList, stsInit } from '@/services'

export interface IUploadImage {
  accept?: string
  maxFileSize?: number
  minFileSize?: number
  onChange?: (file: any, name?: string) => void // 上传后事件回调
  children?: ReactNode
  btnName?: string
  listType?: 'picture-card' | 'text' | 'picture'
  path?: string
  sid?: number
  aid?: number
  value?: string | { file_path: string }
  isUrl?: boolean
  maxHeight?: number
  maxWidth?: number
  multiple?: boolean // 是否支持多选文件
}

const UploadImage = forwardRef((props: IUploadImage, ref) => {
  const { initialState } = useModel('@@initialState')
  if (!initialState || !initialState.currentUser)
    return null

  const { currentUser } = initialState
  const {
    onChange,
    maxFileSize = 200,
    minFileSize = 0,
    accept = '.jpg,.jpeg,.png,.gif,.pdf,.dmg',
    children,
    btnName,
    listType = 'picture-card',
    path = 'subject',
    sid = 1,
    aid = 0,
    value,
    isUrl,
    maxHeight, maxWidth,
    multiple = false
  } = props
  const url = typeof value === 'object' ? value?.file_path : value
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState<string>('')
  const [percent, setPercent] = useState(0)
  const [http, setHttp] = useState(url)
  const [more, setMore] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setHttp(url)
    url && multiple && setMore([...more, url!])
  }, [url])

  /**
   * 查看预览
   * @param file
   */
  const handlePreview = (e: React.MouseEvent, file: string) => {
    if (e)
      e.stopPropagation()
    if (!file)
      return
    setPreviewVisible(true)
    setPreviewImage(file)
  }

  /**
   * 关闭预览
   */
  const handleCancel = () => {
    setPreviewVisible(false)
  }

  /**
   *  处理图片
   */
  const handleChange = (data?: IAttachment) => {
    if (data) {
      setHttp(data.file_path)
      if (onChange)
        onChange(data)
    }
  }

  /**
   *  移除图片
   */
  const handleRemove = (e: React.MouseEvent, i = 0) => {
    if (e)
      e.stopPropagation()
    if (onChange)
      onChange({})
    setHttp('')
    if (multiple) {
      const arr = more.filter((_, index) => index !== i)
      setMore(arr)
    }
  }

  /**
   * 获取扩展名
   * @param fileUrl 文件路径
   * @returns 扩展名
   */
  const getFileExt = (fileUrl: string) => {
    let r = ''
    if (typeof fileUrl === 'string') {
      const index = (fileUrl && fileUrl?.lastIndexOf('.')) || 0
      const ext = fileUrl?.substring(index + 1)
      r = ext.toLowerCase()
    }
    return r
  }

  const getMd5 = (file: RcFile): Promise<string> => {
    // 获取apk的md5
    return new Promise(resolve => {
      const fileReader = new FileReader()
      const spark = new SparkMD5() // 创建md5对象（基于SparkMD5）
      fileReader.readAsBinaryString(file) // myfile 对应上传的文件

      // 文件读取完毕之后的处理
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        spark.appendBinary(e.target?.result as string)
        const md5 = spark.end()
        resolve(md5)
      }
    })
  }

  const up = async (file: RcFile) => {
    setLoading(true)
    const size = file.size / 1024 / 1024
    const isLtMax = size < maxFileSize!
    const isGtMin = size > minFileSize!
    const isValid = accept === '*' ? true : accept!.includes(getFileExt(file.name))

    if (!isValid)
      message.warning('请您选择正确的文件格式')

    if (!isGtMin)
      message.error(`文件不能小于${minFileSize}M限制`)

    if (!isLtMax)
      message.error(`文件不能大于${maxFileSize}M限制`)

    const loadImg = (url: any): Promise<{ width: number; height: number }> => {
      return new Promise(resolve => {
        const image = new Image()
        image.onload = () => {
          resolve(image)
        }
        image.src = url
      })
    }

    const readImg = (file: Blob): Promise<[boolean, number, number]> => {
      return new Promise(resolve => {
        const reader = new FileReader()
        reader.onload = async e => {
          const data = e.target?.result
          // 加载图片获取图片真实宽度和高度
          const image = await loadImg(data)
          const width = image.width
          const height = image.height
          const isAllow = width === maxWidth && height === maxHeight
          console.log(isAllow, width, height)
          if (!isAllow && maxHeight && maxWidth)
            message.error(`请上传宽${maxWidth}像素和高${maxHeight}像素的图片`)

          resolve([isAllow, width, height])
        }
        reader.readAsDataURL(file)
      })
    }

    let isAllow: unknown

    const [allow, width, height] = await readImg(file)

    if (maxHeight && maxWidth) {
      // 读取图片数据
      isAllow = allow
    }

    if ((isLtMax && !(maxHeight && maxWidth) && isGtMin && isValid) || (isAllow && maxHeight && maxWidth && isValid)) {
      const md5 = await getMd5(file)
      const name = `${md5}.${getFileExt(file.name)}`
      const param = {
        current: 1,
        pageSize: 10,
        filter: JSON.stringify({
          md5,
          up: 1,
          uid: currentUser.id,
          aid,
          sid
        })
      }
      const usedList = await attachmentList(param)
      if (usedList.data?.list?.length) {
        setLoading(false)
        const data = usedList.data.list[0]
        handleChange(data)
      }
      else {
        // 异步获取临时密钥
        const res = await stsInit({ prefix: `${path}/*` })
        const { bucket, region, credentials, startTime, expiredTime } = res.data
        // 初始化实例
        const cos = new COS({
          getAuthorization: async (options, callback) => {
            // console.log(options, 2222)
            if (!res.data || !credentials)
              return console.error('credentials invalid')
            callback({
              TmpSecretId: credentials.tmpSecretId,
              TmpSecretKey: credentials.tmpSecretKey,
              SecurityToken: credentials.sessionToken,
              // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
              StartTime: startTime, // 时间戳，单位秒，如：1580000000
              ExpiredTime: expiredTime // 时间戳，单位秒，如：1580000900
            })
          }
        })
        // 分片上传文件
        cos.putObject(
          {
            Bucket: bucket /* 必须 */,
            Region: region /* 存储桶所在地域，必须字段 */,
            Key: `${path}/${name}`,
            StorageClass: 'STANDARD',
            Body: file,
            onProgress(progressData) {
              setPercent(progressData.percent)
              console.log('上传中', JSON.stringify(progressData))
            }
          },
          async (err, data) => {
            console.log(err, data)
            setLoading(false)
            if (err) {
              setPercent(0)
              return message.error('服务器错误，请重新上传')
            }

            if (data) {
              message.success('上传成功')
              const r = await attachmentAdd({
                sid,
                md5,
                aid,
                file_path: `${path}/${name}`,
                file_name: file.name,
                file_type: file.type,
                file_size: file.size,
                file_height: height,
                file_width: width,
                is_remote: false
              })
              handleChange(r.data)
            }
          }
        )
      }
      return false
    }
  }

  /**
   *  上传前验证
   */
  const beforeUpload = async (file: RcFile): Promise<any> => {
    return new Promise(() => {
      return up(file)
    })
  }

  const uploadImage = (
    <div>{loading ? <LoadingOutlined /> : <PlusOutlined />}<div style={{ marginTop: 8 }}>上传图片</div></div>
  )

  const uploadBtn = {
    'text': <Button><PlusOutlined />上传图片</Button>,
    'picture': uploadImage,
    'picture-card': uploadImage
  }

  useImperativeHandle(ref, () => ({
    handlePreview,
    handleRemove,
    getData: () => more
  }))

  const preview = (url: string, i: number) => {
    return (
      <Fragment key={url}>
        <img onClick={e => handlePreview(e, url)} src={url} width='100' />
        <span onClick={e => handleRemove(e, i)}>x</span>
        {isUrl
          ? <Input
              onChange={e => {
                setHttp(e.target.value)
                onChange && onChange(e.target.value)
              }}
              style={{ marginTop: 10 }}
              value={url} />
          : null}
      </Fragment>
    )
  }

  const btn = btnName ? <Button type='primary'>{btnName} {(percent > 0 && percent < 1) ? `${percent * 100}%` : ''}</Button> : (children || uploadBtn[listType])
  const component = <Upload accept={accept} beforeUpload={beforeUpload} listType={listType} multiple={multiple}>{btn}</Upload>
  const upload = (multiple && more.length) ? more.map((item, i) => preview(item, i)) : (http && listType !== 'text') ? preview(http, 0) : component

  return (
    <>
      {upload}
      <Modal footer={null} onCancel={handleCancel} open={previewVisible} title='图片预览'>
        <img alt='图片预览' src={previewImage} style={{ maxWidth: '100%' }} />
      </Modal>
    </>
  )
})

export default memo(UploadImage)
