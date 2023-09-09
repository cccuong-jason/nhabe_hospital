import { defineStore } from 'pinia'
import { AuthState } from './types'
import { AUTH_TOKEN } from 'core/constants'
import { AuthorizationToken } from './types'
import { ReportListResponse } from '../../../services/reports/getReports'


export const useState = defineStore({
  id: 'auth.state',
  state: (): AuthState => {
    return {
      isAuthenticated: !!localStorage.getItem(AUTH_TOKEN),
    }
  },
})

// @ts-ignore
export const useAuthorizationTokenStore = defineStore('authorizationToken', {
  state: (): AuthorizationToken => ({
    access_token: '',
    refresh_token: '',
    token_type: '',
  }),
  getters: {
    getToken(property: keyof AuthorizationToken): string {
      return this[property]
    },
  },
  actions: {
    setToken({ property, value }: { property: keyof AuthorizationToken; value: string }): void {
      this[property] = value
    },
    setDefaul(): void {
      this.$state.access_token = ''
      this.$state.refresh_token = ''
      this.$state.token_type = ''
    },
  },
  persist: true,
})

export const useReportResponse = defineStore('reportResponse', {
  state: (): ReportListResponse => {
    return {
      total_objects: 0,
      per_page: 0,
      current_page: 0,
      next_page: null,
      prev_page: null,
      reports: [],
    }
  },
  actions: {
    setReportResponse(reportResponse: ReportListResponse): void {
      this.$state.total_objects = reportResponse.total_objects
      this.$state.per_page = reportResponse.per_page
      this.$state.current_page = reportResponse.current_page
      this.$state.next_page = reportResponse.next_page
      this.$state.prev_page = reportResponse.prev_page
      this.$state.reports = reportResponse.reports
    },

  },
})
