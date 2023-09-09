export interface AuthState {
  isAuthenticated: boolean
  user?: any
}

export type ILogin = {
  email: string
  password: string
}

export interface AuthorizationToken {
  access_token: string
  refresh_token: string
  token_type: string
}
