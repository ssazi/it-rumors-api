<script setup lang="ts">
import { ErrorMessage, Field, FieldArray, Form } from 'vee-validate'
import * as yup from 'yup'

const emit = defineEmits(['open', 'onImage'])

const initialData = {
  image: [
    {
      url: ''
    }
  ]
}

const schema = yup.object().shape({
  image: yup
    .array()
    .of(
      yup.object().shape({
        url: yup.string().url().required('请输入图片地址').label('url')
      })
    )
    .strict()
})

// 判断image是否有重复的url
function isRepeat(arr: { url: string }[]) {
  const map = new Map()
  for (const item of arr) {
    if (map.has(item.url))
      return true

    map.set(item.url, true)
  }
  return false
}

function onSubmit(values: any) {
  if (isRepeat(values.image))
    Toast.warning('图片地址不能重复')
  else
    emit('onImage', values)
}
</script>

<template>
  <div w-150 bg="white" p-2 pb-4 border="~ b #eff3f4">
    <Form
      :initial-values="initialData"
      :validation-schema="schema"
      @submit="onSubmit"
    >
      <FieldArray v-slot="{ fields, push, remove }" name="image">
        <fieldset
          v-for="(field, idx) in fields"
          :key="field.key"
          mb-4 border border-gray-300 rounded-md p-4
        >
          <legend>图片 #{{ idx + 1 }}</legend>
          <div flex="~ col">
            <div mb-2 flex items-center justify-center>
              <Field
                :id="`url_${idx}`"
                :name="`image[${idx}].url`"
                type="url"
                placeholder="请输入图片地址"
                border="~ solid gray-200 rounded-md" h-10 w-full px-2
              />
              <div i-carbon-close ml-2 cursor-pointer text-lg @click="remove(idx)" />
            </div>
            <ErrorMessage :name="`image[${idx}].url`" text-red />
          </div>
        </fieldset>
        <button relative z-2 mx-4 h-8 inline-flex items-center @click="push({ url: '' })">
          添加图片
        </button>
      </FieldArray>
      <div relative flex justify-end>
        <button type="submit" class="-top-8" bg="#1d9bf0" absolute h-9 flex cursor-pointer items-center justify-center rounded-full px-4 text-sm text-white hover="bg-#1A8CD8" active="bg-#177CC0">
          提交
        </button>
      </div>
    </Form>
  </div>
</template>
