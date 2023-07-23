<script lang="ts" setup>
defineProps<{
  text?: string
  content?: string
  description?: string
  icon?: string
  to?: string | Record<string, string>
  command?: boolean
  disabled?: boolean
  external?: true
  large?: true
  match?: boolean
}>()
</script>

<template>
  <NuxtLink
    :disabled="disabled"
    :to="to"
    :external="external"
    exact-active-class="text-primary"
    :class="disabled ? 'op25 pointer-events-none ' : match ? 'text-primary' : ''"
    class="group"
    block w-full focus:outline-none
    :tabindex="disabled ? -1 : null"
    @click="to ? $scrollToTop() : undefined"
  >
    <div

      w-fit w-full flex items-center gap4 px5 py3 transition-250 md:gap2 group-hover="bg-active text-primary"
      group-focus-visible:ring="2 current"
    >
      <div flex flex-1 items-center gap4 md:gap2>
        <div
          v-if="$slots.icon || icon"
          flex flex-shrink-0 items-center justify-center
          :class="$slots.description ? 'w-12 h-12' : ''"
        >
          <slot name="icon">
            <div
              v-if="icon"
              :class="[icon, large ? 'text-xl mr-1' : 'text-xl md:text-size-inherit']"
            />
          </slot>
        </div>
        <div flex="~ col gap-0.5">
          <p>
            <slot>
              <span>{{ text }}</span>
            </slot>
          </p>
          <p v-if="$slots.description || description" text-sm text-secondary>
            <slot name="description">
              {{ description }}
            </slot>
          </p>
        </div>
      </div>
      <p v-if="$slots.content || content" text-sm text-secondary>
        <slot name="content">
          {{ content }}
        </slot>
      </p>
      <div v-if="to" :class="!external ? 'i-ri:arrow-right-s-line' : 'i-ri:external-link-line'" text-xl />
    </div>
  </NuxtLink>
</template>
