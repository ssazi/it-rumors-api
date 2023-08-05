import type { IUser } from '@itrumors/types'

export function getAccountRoute(account: IUser) {
  return useRouter().resolve({
    name: 'user',
    params: {
      id: account.id
    }
  })
}
