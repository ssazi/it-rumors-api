import React, { useEffect, useRef, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import type { InputRef } from 'antd'
import { Input, Space, Tag, theme } from 'antd'

interface ITagListProps {
  value?: string[]
  onChange?: (value: string[]) => void
  name?: string
}

function App(props: ITagListProps) {
  const { value = [], onChange, name } = props
  const { token } = theme.useToken()
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [editInputIndex, setEditInputIndex] = useState(-1)
  const [editInputValue, setEditInputValue] = useState('')
  const inputRef = useRef<InputRef>(null)
  const editInputRef = useRef<InputRef>(null)

  useEffect(() => {
    if (inputVisible)
      inputRef.current?.focus()
  }, [inputVisible])

  useEffect(() => {
    editInputRef.current?.focus()
  }, [inputValue])

  const handleClose = (removedTag: string) => {
    const newTags = value?.filter(tag => tag !== removedTag)
    onChange?.(newTags)
  }

  const showInput = () => {
    setInputVisible(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputConfirm = () => {
    if (inputValue && !value?.includes(inputValue))
      onChange?.([...value!, inputValue])

    setInputVisible(false)
    setInputValue('')
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value)
  }

  const handleEditInputConfirm = () => {
    const newTags = [...value!]
    newTags[editInputIndex] = editInputValue
    onChange?.(newTags)
    setEditInputIndex(-1)
    setInputValue('')
  }

  const tagInputStyle: React.CSSProperties = {
    width: 78,
    verticalAlign: 'top',
    marginRight: 8
  }

  const tagPlusStyle: React.CSSProperties = {
    background: token.colorBgContainer,
    borderStyle: 'dashed'
  }

  return (
    <Space size={[0, 8]} wrap>
      <Space size={[0, 8]} wrap>
        {value?.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                key={tag}
                onBlur={handleEditInputConfirm}
                onChange={handleEditInputChange}
                onPressEnter={handleEditInputConfirm}
                ref={editInputRef}
                size='small'
                style={tagInputStyle}
                value={editInputValue} />
            )
          }
          const tagElem = (
            <Tag
              closable
              key={tag}
              onClose={() => handleClose(tag)}
              style={{ userSelect: 'none' }}>
              <span
                onDoubleClick={e => {
                  setEditInputIndex(index)
                  setEditInputValue(tag)
                  e.preventDefault()
                }}>
                {tag}
              </span>
            </Tag>
          )
          return tagElem
        })}
      </Space>
      {inputVisible
        ? (
          <Input
            onBlur={handleInputConfirm}
            onChange={handleInputChange}
            onPressEnter={handleInputConfirm}
            ref={inputRef}
            size='small'
            style={tagInputStyle}
            type='text'
            value={inputValue} />
          )
        : (
          <Tag onClick={showInput} style={tagPlusStyle}>
            <PlusOutlined /> 添加{name}
          </Tag>
          )}
    </Space>
  )
}

export default App
