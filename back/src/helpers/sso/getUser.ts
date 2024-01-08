import { ZodIssue } from 'zod'
import {
  TSsoGetUserRequest,
  TSsoGetUserResponse,
} from '../../schemas/sso/ssoGetUser'
import {
  InvalidCredentials,
  ServiceUnavailable,
  ValidationError,
} from '../errors'
import { pathSso } from './pathSso'

export async function getUser(data: TSsoGetUserRequest) {
  const fetchSSO = await fetch(pathSso.getUser, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const { status } = fetchSSO
  const fetchData = await fetchSSO.json()

  switch (status) {
    case 200:
      return { ...(fetchData as TSsoGetUserResponse) }
    case 400:
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw new ValidationError(fetchData.message as ZodIssue[])
    case 401:
      throw new InvalidCredentials()
    default:
      throw new ServiceUnavailable()
  }
}
