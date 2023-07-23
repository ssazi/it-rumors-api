<script lang="ts" setup>
import { reactive } from 'vue'
import type { PropType } from 'vue'
import type { InsertContentGenerator } from 'md-editor-v3'
import { DropdownToolbar } from 'md-editor-v3'
import { emojis } from './data'

const props = defineProps({
  onInsert: {
    type: Function as PropType<(generator: InsertContentGenerator) => void>,
    default: () => () => null
  }
})

const state = reactive({
  visible: false
})

function emojiHandler(emoji: string) {
  const generator: InsertContentGenerator = () => {
    return {
      targetValue: emoji,
      select: false,
      deviationStart: 0,
      deviationEnd: 0
    }
  }

  props.onInsert(generator)
}

function onChange(visible: boolean) {
  state.visible = visible
}
</script>

<script lang="ts">
export default {
  name: 'EmojiExtension'
}
</script>

<template>
  <DropdownToolbar title="emoji" :visible="state.visible" @onChange="onChange">
    <template #overlay>
      <div class="emoji-container">
        <ol class="emojis">
          <li
            v-for="(emoji, index) of emojis"
            :key="`emoji-${index}`"
            @click="emojiHandler(emoji)"
            v-text="emoji"
          />
        </ol>
      </div>
    </template>
    <template #trigger>
      <div i-ri-emotion-line mt-1 />
    </template>
  </DropdownToolbar>
</template>

<style lang="scss">
.emoji-container {
  border-radius: 3px;
  border: 1px solid #e6e6e6;
}

.emojis {
  position: relative;
  width: 380px;
  margin: 10px;
  padding: 0;
  background-color: #fff;

  li {
    cursor: pointer;
    float: left;
    border: 1px solid #e8e8e8;
    height: 24px;
    width: 28px;
    overflow: hidden;
    margin: -1px 0 0 -1px;
    text-align: center;
    list-style: none;
    z-index: 11;

    &:hover {
      position: relative;
      border: 1px solid #63a35c;
      z-index: 12;
    }
  }

  &::after {
    content: '';
    clear: left;
    display: block;
  }

  * {
    user-select: none;
  }
}
</style>
