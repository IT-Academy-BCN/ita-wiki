/* eslint-disable @typescript-eslint/no-throw-literal */
import { DefaultError } from '../errors'
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

  const { status, ok } = fetchSSO
  const fetchData = await fetchSSO.json()
  if (!ok) {
    throw new DefaultError(status, fetchData.message)
  }

  return fetchData as TSsoRegisterResponse
}
