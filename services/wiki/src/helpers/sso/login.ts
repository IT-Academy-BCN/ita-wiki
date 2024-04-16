import { TSsoLoginRequest, TSsoLoginResponse } from '../../schemas/sso/ssoLogin'
import { DefaultError } from '../errors'
import { pathSso } from './pathSso'

export async function login(data: TSsoLoginRequest) {
  const requestData = { ...data }
  requestData.dni = data.dni.toUpperCase()
  const fetchSSO = await fetch(pathSso.v1.auth.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })

  const { status, ok } = fetchSSO
  const fetchData = await fetchSSO.json()
  if (!ok) {
    throw new DefaultError(status, fetchData.message)
  }
  return fetchData as TSsoLoginResponse
}
