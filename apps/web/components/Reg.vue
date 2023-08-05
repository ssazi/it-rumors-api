<script setup lang="ts">
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import type { ICaptcha } from '@itrumors/types'

const code = ref<ICaptcha>()
const user = useUserStore()
async function onSubmit(values: any) {
  const data = await user.signUp({ ...values, token: code.value?.token })
  if (data)
    closeRegDialog()
}

// Using yup to generate a validation schema
// https://vee-validate.logaretm.com/v4/guide/validation#validation-schemas-with-yup
const schema = Yup.object().shape({
  username: Yup.string().min(6, '用户名必须大于6位').required('请输入用户名'),
  email: Yup.string().email('邮箱地址不正确').required('请输入邮箱'),
  password: Yup.string().min(8, '密码长度必须大于8位').required('请输入密码'),
  confirm_password: Yup.string()
    .required('请再次输入密码')
    .oneOf([Yup.ref('password')], '两次输入的密码不一致'),
  captcha: Yup.string().required('请输入验证码')
})

async function getCode() {
  const { data } = await captcha()
  code.value = data
}

watchEffect(() => {
  getCode()
})
</script>

<template>
  <div>
    <Form :validation-schema="schema" class="pt-0 pt-4" @submit="onSubmit">
      <TextInput name="username" type="text" placeholder="请输入用户名" />
      <TextInput name="email" type="email" placeholder="请输入邮箱" />
      <TextInput name="password" type="password" placeholder="请输入密码" />
      <TextInput name="confirm_password" type="password" placeholder="请再次输入密码" />
      <div class="mt-4 flex items-start">
        <TextInput name="captcha" type="text" placeholder="请输入验证码" />
        <div pb="1" pl="4" @click="getCode" v-html="code?.image" />
      </div>
      <button type="submit" mt-2 w-full flex items-center justify-center rounded-full btn-primary>
        注册
      </button>
    </Form>
  </div>
</template>
