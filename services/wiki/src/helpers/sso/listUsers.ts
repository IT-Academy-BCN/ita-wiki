import qs from 'qs'
import { DefaultError } from '../errors'
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
  const { status, ok } = fetchSSO
  const fetchData = await fetchSSO.json()
  if (!ok) {
    throw new DefaultError(status, fetchData.message)
  }
  return fetchData as TSsoListUsersResponse
}
