import qs from 'qs'
import {
  type ListResourcesQueryParams,
  type ListTopicsQueryParams,
} from './openapiComponents'
import { OpenapiContext } from './openapiContext'

const baseUrl = '' // TODO add your baseUrl

export type ErrorWrapper<TError> =
  | TError
  | { status: 'unknown'; payload: string }

export type OpenapiFetcherOptions<TBody, THeaders, TQueryParams, TPathParams> =
  {
    url: string
    method: string
    body?: TBody
    headers?: THeaders
    queryParams?: TQueryParams
    pathParams?: TPathParams
    signal?: AbortSignal
  } & OpenapiContext['fetcherOptions']

export async function openapiFetch<
  TData,
  TError,
  TBody extends {} | FormData | undefined | null,
  THeaders extends {},
  TQueryParams extends {},
  TPathParams extends {}
>({
  url,
  method,
  body,
  headers,
  pathParams,
  queryParams,
  signal,
}: OpenapiFetcherOptions<
  TBody,
  THeaders,
  TQueryParams,
  TPathParams
>): Promise<TData> {
  try {
    const requestHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...headers,
    }

    /**
     * As the fetch API is being used, when multipart/form-data is specified
     * the Content-Type header must be deleted so that the browser can set
     * the correct boundary.
     * https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects#sending_files_using_a_formdata_object
     */
    if (
      requestHeaders['Content-Type']
        .toLowerCase()
        .includes('multipart/form-data')
    ) {
      delete requestHeaders['Content-Type']
    }

    const response = await window.fetch(
      `${baseUrl}${resolveUrl(url, queryParams, pathParams)}`,
      {
        signal,
        method: method.toUpperCase(),
        body: body
          ? body instanceof FormData
            ? body
            : JSON.stringify(body)
          : undefined,
        headers: requestHeaders,
      }
    )
    if (!response.ok) {
      let error: ErrorWrapper<TError>
      try {
        error = await response.json()
      } catch (e) {
        error = {
          status: 'unknown' as const,
          payload:
            e instanceof Error
              ? `Unexpected error (${e.message})`
              : 'Unexpected error',
        }
      }

      throw error
    }

    if (response.headers.get('content-type')?.includes('json')) {
      return await response.json()
    } else {
      // if it is not a json response, assume it is a blob and cast it to TData
      return (await response.blob()) as unknown as TData
    }
  } catch (e) {
    let errorObject: Error = {
      name: 'unknown' as const,
      message:
        e instanceof Error ? `Network error (${e.message})` : 'Network error',
      stack: e as string,
    }
    throw errorObject
  }
}

const buildQueryStringResources = ({
  categorySlug,
  topicSlug,
  resourceTypes,
  topic,
  status,
  search,
}: ListResourcesQueryParams) =>
  qs.stringify({
    categorySlug,
    topicSlug,
    resourceTypes,
    topic,
    status,
    search,
  })

const buildQueryStringTopics = ({ categoryId, slug }: ListTopicsQueryParams) =>
  qs.stringify({
    categoryId,
    slug,
  })

const resolveUrl = (
  url: string,
  queryParams: Record<string, string> = {},
  pathParams: Record<string, string> = {}
) => {
  let query = new URLSearchParams(queryParams).toString()

  if (queryParams as ListResourcesQueryParams) {
    query = buildQueryStringResources(queryParams)
  } else if (queryParams as ListTopicsQueryParams) {
    query = buildQueryStringTopics(queryParams)
  }

  if (query) query = `?${query}`
  return url.replace(/\{\w*\}/g, (key) => pathParams[key.slice(1, -1)]) + query
}