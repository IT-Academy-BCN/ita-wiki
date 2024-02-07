import { http, HttpResponse } from 'msw'
import { testUserData } from '../../globalSetup'
import { authToken } from './authToken'

type GetUserResponse =
  | { message: string }
  | { dni: string; email: string; role: string; status: string }
export const getUserHandler = http.post(
  'http://localhost:8000/api/v1/user',
  async ({ request }) => {
    const { authToken: token } = (await request.json()) as {
      authToken: string
    }
    const isValidToken = Object.values(authToken).includes(token)
    if (!isValidToken) {
      return HttpResponse.json(
        {
          message: 'Invalid Credentials',
        } as GetUserResponse,
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
        } as GetUserResponse,
        { status: 401 }
      )
    }
    const { dni, email, name, role, status } = testUserData[userType]

    return HttpResponse.json(
      {
        dni,
        email,
        name,
        role,
        status,
      } as GetUserResponse,
      { status: 200 }
    )
  }
)
