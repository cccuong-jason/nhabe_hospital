import { request } from '../index'
import { useAuthorizationTokenStore } from 'modules/auth/store/state'

interface AuthorizationToken {
  access_token: string
  refresh_token: string
  token_type: string
}

export function login(username: string, password: string): Promise<AuthorizationToken> {
  const host: string = ''
  const store = useAuthorizationTokenStore()

  //@ts-ignore
  request.setOptions({
    prefix: '/token',
    params: {
      username: username,
      password: password,
    },
  })

  return request.post(host)
}
