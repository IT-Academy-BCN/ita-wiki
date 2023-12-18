import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { ZodIssue } from 'zod'
import { testUserData } from '../globalSetup'
import { prisma } from '../../prisma/client'
import {
  UserRegister,
  userRegSchema,
} from '../../schemas/users/userRegisterSchema'

export const authToken: {
  admin: string
  mentor: string
  user: string
} = {
  admin:
    'ebJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  mentor:
    'ecJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  user: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
}

type LoginResponse =
  | { message: string }
  | { authToken: string; refreshToken: string }
type ValidationResponse = { message: string } | { id: string }
type RegisterResponse = { message: ZodIssue[] | string } | { id: string }

const handlers = [
  http.post('http://localhost:8000/api/v1/auth/login', async ({ request }) => {
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
    const prismaUser = await prisma.user.findFirst({
      where: { name: user.name },
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
  }),
  http.post(
    'http://localhost:8000/api/v1/auth/register',
    async ({ request }) => {
      const req = (await request.json()) as Omit<
        UserRegister,
        'name' | 'specialization' | 'accept'
      >
      const parse = userRegSchema
        .pick({
          dni: true,
          email: true,
          itineraryId: true,
          password: true,
          confirmPassword: true,
        })
        .safeParse(req)
      if (!parse.success) {
        return HttpResponse.json(
          {
            message: parse.error.issues,
          } as RegisterResponse,
          { status: 400 }
        )
      }
      const emails = Object.values(testUserData).map((user) => user.email)
      const dnis = Object.values(testUserData).map((user) => user.dni)

      if (emails.includes(req.email) || dnis.includes(req.dni)) {
        return HttpResponse.json(
          { message: 'email or dni already exists' },
          { status: 409 }
        )
      }
      const id = 'clq2chxpi000008l8bvlr24z0'

      return HttpResponse.json(
        {
          id,
        },
        { status: 200 }
      )
    }
  ),
  http.post(
    'http://localhost:8000/api/v1/tokens/validate',
    async ({ request }) => {
      const { authToken: token } = (await request.json()) as {
        authToken: string
      }
      const isValidToken = Object.values(authToken).includes(token)
      if (!isValidToken) {
        return HttpResponse.json(
          {
            message: 'Invalid Credentials',
          } as ValidationResponse,
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
          } as ValidationResponse,
          { status: 401 }
        )
      }
      const { name } = testUserData[userType]
      const userId = await prisma.user.findFirst({
        where: { name },
        select: { id: true },
      })

      return HttpResponse.json(
        {
          id: userId!.id,
        } as ValidationResponse,
        { status: 200 }
      )
    }
  ),
]

export const ssoServer = setupServer(...handlers)