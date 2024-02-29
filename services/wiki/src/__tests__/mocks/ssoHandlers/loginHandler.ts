import { HttpResponse, http } from 'msw'
import { testUserData } from '../../globalSetup'
import { UserStatus } from '../../../schemas/users/userSchema'
import { prisma } from '../../../prisma/client'

type LoginResponse =
  | { message: string }
  | { authToken: string; refreshToken: string }
export const loginHandler = http.post(
  'http://localhost:8000/api/v1/auth/login',
  async ({ request }) => {
    const { dni, password } = (await request.json()) as {
      dni: string
      password: string
    }
    const user = Object.values(testUserData).find((u) => u.dni === dni)
    if (!user || user.password !== password) {
      return HttpResponse.json(
        {
          message: 'Invalid Credentials',
        } as LoginResponse,
        { status: 401 }
      )
    }
    if (user.status === UserStatus.INACTIVE) {
      return HttpResponse.json(
        { message: 'Only active users can login' },
        { status: 403 }
      )
    }
    const prismaUser = await prisma.user.findFirst({
      where: { id: user.id },
      select: { id: true },
    })
    return HttpResponse.json(
      {
        id: prismaUser?.id,
        authToken: 'string',
        refreshToken: 'string',
      } as LoginResponse,
      { status: 200 }
    )
  }
)
