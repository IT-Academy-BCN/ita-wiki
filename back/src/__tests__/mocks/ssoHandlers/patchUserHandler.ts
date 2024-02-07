import { http, HttpResponse } from 'msw'
import { TSsoPatchUserRequest } from '../../../schemas/sso'
import { authToken } from './authToken'

type PatchUserResponse = { message: string }
export const patchUserHandler = http.patch(
  'http://localhost:8000/api/v1/user',
  async ({ request }) => {
    const { authToken: token } = (await request.json()) as TSsoPatchUserRequest
    const isValidToken = Object.values(authToken).includes(token)
    if (!isValidToken) {
      return HttpResponse.json(
        {
          message: 'Invalid Credentials',
        } as PatchUserResponse,
        { status: 401 }
      )
    }
    const userType = Object.keys(authToken).find(
      (key) => authToken[key] === token
    )
    if (!userType) {
      return HttpResponse.json(
        {
          message: 'Invalid Credentials',
        } as PatchUserResponse,
        { status: 401 }
      )
    }

    return new HttpResponse(null, { status: 204 })
  }
)
