import { Context } from 'koa'
import {
  TSsoValidateRequest,
  TSsoValidateResponse,
} from '../../schemas/sso/ssoValidate'
import { DefaultError } from '../errors'
import { pathSso } from './pathSso'

export async function validate(ctx: Context, data: TSsoValidateRequest) {
  const fetchSSO = await fetch(pathSso.v1.tokens.validate, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const { status, ok } = fetchSSO
  const fetchData = await fetchSSO.json()
  if (!ok) {
    ctx.cookies.set('authToken', null, {
      expires: new Date(0),
      overwrite: true,
    })
    throw new DefaultError(status, fetchData.message)
  }
  return fetchData as TSsoValidateResponse
}
