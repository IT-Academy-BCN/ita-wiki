import { ZodIssue } from 'zod'
import { TSsoPatchUserRequest } from '../../schemas/sso/ssoPatchUser'
import {
  InvalidCredentials,
  ServiceUnavailable,
  ValidationError,
} from '../errors'
import { pathSso } from './pathSso'

export async function patchUser(data: TSsoPatchUserRequest) {
  const fetchSSO = await fetch(pathSso.user, {
    method: 'PATCH',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const { status } = fetchSSO

  switch (status) {
    case 204:
      return
    case 400: {
      const fetchData = await fetchSSO.json()
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw new ValidationError(fetchData.message as ZodIssue[])
    }
    case 401:
      throw new InvalidCredentials()
    default:
      throw new ServiceUnavailable()
  }
}
