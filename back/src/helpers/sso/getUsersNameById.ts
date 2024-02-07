import { ZodIssue } from 'zod'

import qs from 'qs'
import {
  InvalidCredentials,
  ServiceUnavailable,
  ValidationError,
} from '../errors'
import { pathSso } from './pathSso'
import {
  TSsoGetUsersNameByIdRequest,
  TSsoGetUsersNameByIdResponse,
} from '../../schemas/sso/ssoGetUsersNameById'

export async function getUsersNameById(data: TSsoGetUsersNameByIdRequest) {
  const stringData = qs.stringify(
    { id: data },
    { indices: false, arrayFormat: 'comma' }
  )
  const fetchSSO = await fetch(`${pathSso.users}/name?${stringData}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const { status } = fetchSSO
  const fetchData = await fetchSSO.json()
  switch (status) {
    case 200:
      return fetchData as TSsoGetUsersNameByIdResponse
    case 400:
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw new ValidationError(fetchData.message as ZodIssue[])
    case 401:
      throw new InvalidCredentials()
    default:
      throw new ServiceUnavailable()
  }
}
