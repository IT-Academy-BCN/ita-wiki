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
  TSsoListUsersResponse,
} from '../../schemas/sso/ssoListUsers'

export async function listUsers(data: TSsoGetUsersNameByIdRequest) {
  const stringData = qs.stringify(
    { id: data, fields: ['id', 'name'] },
    { indices: false, arrayFormat: 'comma' }
  )
  const fetchSSO = await fetch(`${pathSso.v1.users.base}?${stringData}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const { status } = fetchSSO
  const fetchData = await fetchSSO.json()
  switch (status) {
    case 200:
      return fetchData as TSsoListUsersResponse
    case 400:
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw new ValidationError(fetchData.message as ZodIssue[])
    case 401:
      throw new InvalidCredentials()
    default:
      throw new ServiceUnavailable()
  }
}
