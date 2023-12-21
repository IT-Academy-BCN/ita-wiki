import { appConfig } from '../config/config'
import { TSsoLoginRequest } from '../schemas/sso/ssoLogin'

type SsoAction =
  | 'login'
  | 'register'
  | 'validate'
  | 'getUser'
  | 'getItineraries'

export async function handleSSO(
  action: SsoAction,
  data?:
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
  let method = 'POST'
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  const requestData = data ? { ...data } : undefined
  switch (action) {
    case 'login':
      url = `${appConfig.ssoUrl}/api/v1/auth/login`
      if (requestData && 'dni' in requestData) {
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
    case 'getUser':
      url = `${appConfig.ssoUrl}/api/v1/user`
      headers.Accept = 'application/json'
      break
    case 'getItineraries':
      url = `${appConfig.ssoUrl}/api/v1/itinerary`
      method = 'GET'
      break
    default:
      throw new Error('Invalid action')
  }
  const fetchOptions: RequestInit =
    method === 'GET'
      ? { method }
      : { method, headers, body: JSON.stringify(requestData) }
  const fetchSSO = await fetch(url, fetchOptions)
  const fetchData = await fetchSSO.json()
  return { status: fetchSSO.status, data: fetchData }
}
