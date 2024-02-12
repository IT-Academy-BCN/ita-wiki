/* eslint-disable @typescript-eslint/no-throw-literal */
import { ZodIssue } from 'zod'
import { ValidationError, ServiceUnavailable } from '../errors'
import {
  TSsoRegisterRequest,
  TSsoRegisterResponse,
} from '../../schemas/sso/ssoRegister'
import { pathSso } from './pathSso'

export async function register(data: TSsoRegisterRequest) {
  const fetchSSO = await fetch(pathSso.v1.auth.register, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const { status } = fetchSSO
  const fetchData = await fetchSSO.json()

  switch (status) {
    case 200:
      return { ...(fetchData as TSsoRegisterResponse) }
    case 400:
      throw new ValidationError(fetchData.message as ZodIssue[])
    case 409:
      throw new ValidationError(fetchData.message as string)
    case 422:
      throw new ValidationError(fetchData.message as string)
    default:
      throw new ServiceUnavailable()
  }
}
