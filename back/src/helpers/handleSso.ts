import { appConfig } from '../config/config'
import { TSsoLoginRequest } from '../schemas/sso/ssoLogin'

export async function handleSSO(
  action: 'login' | 'register' | 'validate',
  data:
    | TSsoLoginRequest
    | { authToken: string }
    | {
        dni: string
        password: string
        confirmPassword: string
        email: string
        itineraryId: string
      }
) {
  let url = ''
  const method = 'POST'
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  const requestData = { ...data }
  switch (action) {
    case 'login':
      url = `${appConfig.ssoUrl}/api/v1/auth/login`
      if ('dni' in requestData) {
        requestData.dni = requestData.dni.toUpperCase()
      }
      break
    case 'register':
      url = `${appConfig.ssoUrl}/api/v1/auth/register`
      break
    case 'validate':
      url = `${appConfig.ssoUrl}/api/v1/tokens/validate`
      headers.Accept = 'application/json'
      break
    default:
      throw new Error('Invalid action')
  }
  const fetchSSO = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(requestData),
  })
  const fetchData = await fetchSSO.json()
  return { status: fetchSSO.status, data: fetchData }
}
