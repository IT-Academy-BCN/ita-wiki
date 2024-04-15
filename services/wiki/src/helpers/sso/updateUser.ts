import { TSsoUpdateUserRequest } from '../../schemas/sso/ssoUpdateUser'
import { DefaultError } from '../errors'
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
  const { status, ok } = fetchSSO
  if (!ok) {
    const fetchData = await fetchSSO.json()
    throw new DefaultError(status, fetchData.message)
  }
}
