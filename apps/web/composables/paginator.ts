import type { IDigg, IFeed, IPin } from '@itrumor/types'
import { sidName } from '@itrumor/types'

type IState = 'idle' | 'loading' | 'done' | 'error'

export function usePaginator(list: IFeed[]) {
  const state = ref<IState>('idle')
  const items = ref<(IFeed & { [key: string]: any }) []>(list)

  const endAnchor = ref<HTMLDivElement>()
  const bound = reactive(useElementBounding(endAnchor))
  const isInScreen = $computed(() => bound.top < window.innerHeight * 2)
  const error = ref<unknown | undefined>()
  const deactivated = useDeactivated()
  const current = ref(1)

  async function update(params: Pick<IPin, 'content' | 'sid'>): Promise<boolean> {
    try {
      const { data } = await addPin(params)
      if (data)
        items.value?.unshift(data)
      return true
    }
    catch (error) {
      return false
    }
  }

  async function onLike(params: IDigg) {
    console.log(params, 'params')
    const res = await addDigg(params)
    const sid = params?.sid as 1
    const s = sidName[sid]
    if (res.data) {
      items.value?.forEach((item, i) => {
        if (item[s].id === params.aid && item.sid === params.sid) {
          if (items.value && items.value[i] && items.value[i][s])
            items.value[i][s].favourite_count = items.value[i][s].favourite_count + 1
        }
      })
      console.log(items.value, 'items.value')
      return res
    }
  }

  async function loadNext() {
    console.log('loadNext', state.value)
    if (state.value !== 'idle')
      return
    state.value = 'loading'
    try {
      const { data } = await getFeedList({ current: current.value + 1 })

      if (!data.list && data.list!.length) {
        state.value = 'done'
      }
      else {
        items.value.push(...data.list!)
        state.value = 'idle'
        current.value++
      }
    }
    catch (e) {
      console.error(e)
      state.value = 'idle'
      error.value = e
      state.value = 'error'
    }

    await nextTick()
    bound.update()
  }

  if (process.client) {
    useIntervalFn(() => {
      bound.update()
    }, 1000)

    if (!isHydrated.value) {
      onHydrated(() => {
        state.value = 'idle'
        loadNext()
      })
    }

    watch(
      () => [isInScreen, state],
      () => {
        if (isInScreen && state.value === 'idle' && deactivated.value === false)
          loadNext()
      }
    )
  }

  return {
    items,
    update,
    onLike,
    state,
    error,
    endAnchor
  }
}
