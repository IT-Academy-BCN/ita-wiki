import { http, HttpResponse } from 'msw'
import { TSsoPatchUserRequest } from '../../../schemas/sso'
import { authToken } from './authToken'
import { testUserData } from '../../globalSetup'
import { UserRole, UserStatus } from '../../../schemas/users/userSchema'

type UpdateUserResponse = { message: string }
export const updateUserHandler = http.patch(
  'http://localhost:8000/api/v1/users/:id',
  async ({ request, params }) => {
    const sampleUser = {
      id: 'jvrbkpeq9v6l4l23rt0u00w9',
      email: 'sampleUser@user.cat',
      name: 'sampleUser',
      dni: '00000000R',
      password: 'testingPswd1',
      role: UserRole.REGISTERED,
      status: UserStatus.ACTIVE,
      avatarId: null,
    }
    const updatedUserData = { ...testUserData, sampleUser }
    const { id } = params
    const { authToken: token } = (await request.json()) as TSsoPatchUserRequest
    const isValidToken = Object.values(authToken).includes(token)
    if (!isValidToken) {
      return HttpResponse.json(
        {
          message: 'Invalid Credentials',
        } as UpdateUserResponse,
        { status: 401 }
      )
    }
    const user = Object.values(updatedUserData).find((u) => u.id === id)
    if (!user) {
      return HttpResponse.json(
        {
          message: 'User not found',
        },
        { status: 404 }
      )
    }
    const userType = Object.keys(authToken).find(
      (key) => authToken[key] === token
    )
    if (!userType) {
      return HttpResponse.json(
        {
          message: 'Invalid Credentials',
        } as UpdateUserResponse,
        { status: 401 }
      )
    }

    return new HttpResponse(null, { status: 204 })
  }
)
