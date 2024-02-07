import { http, HttpResponse } from 'msw'
import { ZodIssue } from 'zod'
import {
  UserRegister,
  userRegSchema,
} from '../../../schemas/users/userRegisterSchema'
import { testUserData } from '../../globalSetup'

type RegisterResponse = { message: ZodIssue[] | string } | { id: string }
export const mockRegisterId = 'rdrxs04zv1mw3m4tnwf7m9bu'

export const registerHandler = http.post(
  'http://localhost:8000/api/v1/auth/register',
  async ({ request }) => {
    const req = (await request.json()) as Omit<
      UserRegister,
      'specialization' | 'accept'
    >
    const parse = userRegSchema
      .pick({
        dni: true,
        email: true,
        name: true,
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
    return HttpResponse.json(
      {
        id: mockRegisterId,
      },
      { status: 200 }
    )
  }
)
