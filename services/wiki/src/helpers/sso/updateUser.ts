import { ZodIssue } from 'zod'
import { TSsoUpdateUserRequest } from '../../schemas/sso/ssoUpdateUser'
import {
  InvalidCredentials,
  ServiceFail,
  ServiceUnavailable,
  ValidationError,
} from '../errors'
import { pathSso } from './pathSso'
import { userId } from '../../schemas/users/userSchema'

export async function updateUser(data: TSsoUpdateUserRequest) {
  const { id, ...rest } = data
  const parsedId = userId.parse(id)
  const fetchSSO = await fetch(`${pathSso.v1.users.base}/${parsedId}`, {
    method: 'PATCH',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(rest),
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
    case 404:
      throw new ServiceFail()
    default:
      throw new ServiceUnavailable()
  }
}
