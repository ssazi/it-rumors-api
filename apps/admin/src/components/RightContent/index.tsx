import { QuestionCircleOutlined } from '@ant-design/icons'
import { SelectLang as UmiSelectLang } from '@umijs/max'
import React from 'react'

export type SiderTheme = 'light' | 'dark'

export function SelectLang() {
  return (
    <UmiSelectLang
      style={{
        padding: 4
      }} />
  )
}

export function Question() {
  return (
    <div
      onClick={() => {
        window.open('https://pro.ant.design/docs/getting-started')
      }}
      style={{
        display: 'flex',
        height: 26
      }}>
      <QuestionCircleOutlined />
    </div>
  )
}
