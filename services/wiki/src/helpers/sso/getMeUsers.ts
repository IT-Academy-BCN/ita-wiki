import {
  TSsoGetUserRequest,
  TSsoGetUserResponse,
} from '../../schemas/sso/ssoGetUser'
import { DefaultError } from '../errors'
import { pathSso } from './pathSso'

export async function getMeUsers(data: TSsoGetUserRequest) {
  const fetchSSO = await fetch(pathSso.v1.users.me, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const { status, ok } = fetchSSO
  const fetchData = await fetchSSO.json()

  if (!ok) {
    throw new DefaultError(status, fetchData.message)
  }
  return fetchData as TSsoGetUserResponse
}
