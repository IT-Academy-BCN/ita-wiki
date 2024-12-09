import { http, HttpResponse } from 'msw'
import { testUserData } from '../../globalSetup'
import { authToken } from './authToken'

type GetMeUsersResponse =
  | { message: string }
  | { dni: string; email: string; name: string; role: string; status: string }

export const getMeUsersHandler = http.post(
  'http://localhost:8000/api/v1/users/me',
  async ({ request }) => {
    const { authToken: token } = (await request.json()) as {
      authToken: string
    }
    const isValidToken = Object.values(authToken).includes(token)

    if (!isValidToken) {
      return HttpResponse.json(
        { message: 'Invalid Credentials' } as GetMeUsersResponse,
        { status: 401 }
      )
    }

    const userType = Object.keys(authToken).find(
      (key) => authToken[key as keyof typeof authToken] === token
    ) as keyof typeof authToken | undefined

    if (!userType) {
      return HttpResponse.json(
        { message: 'Invalid Credentials' } as GetMeUsersResponse,
        { status: 401 }
      )
    }

    const { dni, email, name, role, status } = testUserData[userType]

    return HttpResponse.json(
      { dni, email, name, role, status } as GetMeUsersResponse,
      { status: 200 }
    )
  }
)
