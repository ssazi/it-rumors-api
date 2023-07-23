<script setup lang="ts">
import { Form } from 'vee-validate'
import md5 from 'md5'
import * as Yup from 'yup'
import { STORAGE_KEY_TOKEN } from '~~/constants'

const user = useUserStore()
async function onSubmit(data: Record<string, any>) {
  data.password = md5(data.password)
  const res = await user.signIn(data)
  if (res) {
    globalThis.localStorage.setItem(STORAGE_KEY_TOKEN, res.data)
    await user.getCurrentUserInfo(res.data)
    closeSigninDialog()
  }
}

function onReg() {
  closeSigninDialog()
  openRegDialog()
}

const schema = Yup.object().shape({
  username: Yup.string().required('请输入用户名'),
  password: Yup.string().min(8, '密码长度必须大于8位').required('请输入密码')
})
</script>

<template>
  <div>
    <div mb-4 flex pb-4 border="b border gray-200">
      <div justify="center" border="~ black" h-10 w-full flex cursor-pointer items-center rounded-md hover:bg-gray-200 @click="onReg">
        <div i-carbon-email mr-2 h-6 w-6 inline-flex /> 通过邮箱注册
      </div>
    </div>
    <Form :validation-schema="schema" @submit="onSubmit">
      <TextInput name="username" type="text" placeholder="请输入用户名" />
      <TextInput name="password" type="password" placeholder="请输入密码" />
      <button type="submit" w-full flex items-center justify-center rounded-full btn-primary>
        登录
      </button>
    </Form>
  </div>
</template>
