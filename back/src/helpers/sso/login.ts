import { ZodIssue } from 'zod'
import { TSsoLoginRequest, TSsoLoginResponse } from '../../schemas/sso/ssoLogin'
import {
  ValidationError,
  InvalidCredentials,
  ServiceUnavailable,
  ForbiddenError,
} from '../errors'
import { pathSso } from './pathSso'

export async function login(data: TSsoLoginRequest) {
  const requestData = { ...data }
  requestData.dni = data.dni.toUpperCase()
  const fetchSSO = await fetch(pathSso.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })

  const { status } = fetchSSO
  const fetchData = await fetchSSO.json()

  switch (status) {
    case 200:
      return { ...(fetchData as TSsoLoginResponse) }
    case 400:
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw new ValidationError(fetchData.message as ZodIssue[])
    case 401:
      throw new InvalidCredentials()
    case 403:
      throw new ForbiddenError(fetchData.message)
    default:
      throw new ServiceUnavailable()
  }
}
