import { NetworkError } from './error'
import { Either, fail, success } from './either'
import params2query from './params-to-query'

export interface FetchRequestOptions {
  prefix: string
  headers: Record<string, string>
  // @ts-ignore
  params: Record<string, string | number | boolean | Params>
}

export default class FetchRequest {
  private readonly defaultOptions: FetchRequestOptions = {
    prefix: '',
    headers: {},
    params: {},
  }

  private options: FetchRequestOptions

  constructor(options: Partial<FetchRequestOptions> = {}) {
    this.options = Object.assign({}, this.defaultOptions, options)
  }

  public setOptions(options: Partial<FetchRequestOptions> = {}) {
    this.options = Object.assign({}, this.defaultOptions, options)
  }

  get<T = unknown>(url: string, options?: Partial<FetchRequestOptions>): Promise<T> {
    return this.runSafeFetch('GET', url, options).then(r => this.handleCorrectResponse<T>(r))
  }

  checkableGet<T = unknown>(url: string, options?: Partial<FetchRequestOptions>): Promise<Either<NetworkError, T>> {
    return this.runSafeFetch('GET', url, options).then(r => this.handleResponse<T>(r))
  }

  post<T = unknown>(url: string, data?: unknown, options?: Partial<FetchRequestOptions>): Promise<T> {
    return this.runUnsafeFetch('POST', url, data, options).then(r => this.handleCorrectResponse<T>(r))
  }

  checkablePost<T = unknown>(url: string, data?: unknown, options?: Partial<FetchRequestOptions>): Promise<Either<NetworkError, T>> {
    return this.runUnsafeFetch('POST', url, data, options).then(r => this.handleResponse<T>(r))
  }

  delete<T = unknown>(url: string, options?: Partial<FetchRequestOptions>): Promise<T> {
    return this.runSafeFetch('DELETE', url, options).then(r => this.handleCorrectResponse<T>(r))
  }

  checkableDelete<T = unknown>(url: string, options?: Partial<FetchRequestOptions>): Promise<Either<NetworkError, T>> {
    return this.runSafeFetch('DELETE', url, options).then(r => this.handleResponse<T>(r))
  }

  put<T = unknown>(url: string, data?: unknown, options?: Partial<FetchRequestOptions>): Promise<T> {
    return this.runUnsafeFetch('PUT', url, data, options).then(r => this.handleCorrectResponse<T>(r))
  }

  checkablePut<T>(url: string, data?: unknown, options?: Partial<FetchRequestOptions>): Promise<Either<NetworkError, T>> {
    return this.runUnsafeFetch('PUT', url, data, options).then(r => this.handleResponse<T>(r))
  }

  patch<T = unknown>(url: string, data?: unknown, options?: Partial<FetchRequestOptions>): Promise<T> {
    return this.runUnsafeFetch('PATCH', url, data, options).then(r => this.handleCorrectResponse<T>(r))
  }

  checkablePatch<T>(url: string, data?: unknown, options?: Partial<FetchRequestOptions>): Promise<Either<NetworkError, T>> {
    return this.runUnsafeFetch('PATCH', url, data, options).then(r => this.handleResponse<T>(r))
  }

  public setAuthorizationHeader(token: string): void {
    if (token !== '') this.options.headers.Authorization = `Token ${token}`
  }

  public deleteAuthorizationHeader(): void {
    delete this.options?.headers?.Authorization
  }

  private readonly generateFinalUrl = (url: string, options: Partial<FetchRequestOptions> = {}): string => {
    const prefix = options.prefix ?? this.options.prefix
    const params = Object.assign({}, this.options.params, options.params ?? {})


    let finalUrl = `${prefix}${url}`
    if (Object.keys(params).length > 0) finalUrl += `?${params2query(params)}`


    return finalUrl
  }

  private readonly generateFinalHeaders = (options: Partial<FetchRequestOptions> = {}): FetchRequestOptions['headers'] => {
    return Object.assign({}, this.options.headers, options.headers ?? {})
  }

  private readonly handleResponse = <T>(response: Response): Promise<Either<NetworkError, T>> => {
    if (response.ok) {
      return response.json().then(json => success(json as T))
    }

    return Promise.resolve(fail(new NetworkError(response)))
  }

  private readonly handleCorrectResponse = <T>(response: Response): Promise<T> => {
    if (response.ok) {
      return response.json()
    }

    throw new NetworkError(response)
  }

  private runFetch({ method, url, data, options }: {
    method: 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH'
    url: string
    data?: unknown
    options?: Partial<FetchRequestOptions>
  }): Promise<Response> {
    const finalUrl = this.generateFinalUrl(url, options)
    const headers = this.generateFinalHeaders(options)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fetchOptions: any = { method, headers }

    switch (headers['Content-Type']) {
      case 'application/x-www-form-urlencoded':
        if (data !== undefined) {
          // @ts-ignore
          fetchOptions.body = new URLSearchParams(data)
        }
        break
      default:
        if (data !== undefined) fetchOptions.body = JSON.stringify(data)
        break
    }


    return fetch(finalUrl, fetchOptions)
  }

  private runSafeFetch(
    method: 'GET' | 'DELETE',
    url: string,
    options?: Partial<FetchRequestOptions>,
  ): Promise<Response> {

    return this.runFetch({ method, url, options })
  }

  private runUnsafeFetch(
    method: 'POST' | 'PUT' | 'PATCH',
    url: string,
    data?: unknown,
    options?: Partial<FetchRequestOptions>,
  ): Promise<Response> {

    return this.runFetch({ method, url, options, data })
  }
}
