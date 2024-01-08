import { Context } from 'koa'
import {
  TSsoValidateRequest,
  TSsoValidateResponse,
} from '../../schemas/sso/ssoValidate'
import { InvalidToken, ServiceUnavailable } from '../errors'
import { pathSso } from './pathSso'

export async function validate(ctx: Context, data: TSsoValidateRequest) {
  const fetchSSO = await fetch(pathSso.validate, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const { status } = fetchSSO
  const fetchData = await fetchSSO.json()

  switch (status) {
    case 200:
      return { ...(fetchData as TSsoValidateResponse) }
    case 400:
    case 401:
      ctx.cookies.set('authToken', null, {
        expires: new Date(0),
        overwrite: true,
      })
      throw new InvalidToken()
    default:
      throw new ServiceUnavailable()
  }
}
