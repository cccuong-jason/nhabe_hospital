import { request } from '../index'
import { ReportState } from 'modules/reports/store/types'
import { AuthorizationToken } from 'modules/auth/store/types'
import { useAuthorizationTokenStore, useReportResponse } from 'modules/auth/store/state'


export function getProducts(offset = 0, categoryId: number = 0): Promise<ReportState> {

  const host: string = ''
  //@ts-ignore
  const params = <Params>{
    currentItem: offset,
    pageSize: 20,
  }

  if (categoryId != 0) {
    params['categoryId'] = categoryId
  }

  let token: AuthorizationToken = JSON.parse(localStorage.getItem('tokens') as string)

  request.setOptions({
    prefix: '/report/list',
    headers: {
      'Authorization': 'Bearer ' + token.access_token,
    },
  })

  // @ts-ignore
  return request.get<ReportState>(host, { params })
}

export interface ReportListResponse {
  total_objects: number
  per_page: number
  current_page: number
  next_page: number | null
  prev_page: number | null
  reports: ReportState[]
}

export function getListReport(page: number = 1, limit: number = 20): Promise<ReportListResponse> {
  const host: string = ''
  let prefix_url: string = ''
  if (page && limit) {
    prefix_url += `/report/list/?page=${page}&limit=${limit}`
  } else if (page) {
    prefix_url += `/report/list/?page=${page}`
  } else if (limit) {
    prefix_url += `/report/list/?limit=${limit}`
  }

  const store = useAuthorizationTokenStore()
  // @ts-ignore
  const accessToken = store.access_token

  request.setOptions({
    prefix: prefix_url,
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
  })
  return request.get<ReportListResponse>(host)
}

export function createReport(data: unknown): Promise<unknown> {

  const host: string = ''
  request.setOptions({
    prefix: '/report/create/',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return request.post(host, data)
}

export function getDetailReport(report_reference: string, id: number): Promise<unknown> {
  const store = useAuthorizationTokenStore()
  // @ts-ignore
  const accessToken = store.access_token

  const host: string = ''
  console.log(report_reference)
  request.setOptions({
    prefix: `/report/get/${report_reference}/?report_reference=${id}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
    },
  })
  return request.get(host)
}

export function updateReportStatus(data: unknown, id: number): Promise<unknown> {
  const store = useAuthorizationTokenStore()
  // @ts-ignore
  const accessToken = store.access_token

  const host: string = ''
  request.setOptions({
    prefix: `/report/get/undefined/?report_reference=${id}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
    },
  })
  return request.put(host, data)
}

export function getNewAccessToken(refreshToken: string): Promise<AuthorizationToken> {
  const host: string = ''
  request.setOptions({
    prefix: '/token/refresh',
    params: {
      refresh_token: refreshToken,
    },
  })
  return request.post(host)
}
