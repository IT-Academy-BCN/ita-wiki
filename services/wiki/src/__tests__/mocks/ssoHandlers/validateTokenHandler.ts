import { HttpResponse, http } from 'msw'
import { prisma } from '../../../prisma/client'
import { testUserData } from '../../globalSetup'
import { authToken } from './authToken'

type ValidationResponse = { message: string } | { id: string }
export const validateTokenHandler = http.post(
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
    const { id } = testUserData[userType]
    const userId = await prisma.user.findFirst({
      where: { id },
      select: { id: true },
    })

    return HttpResponse.json(
      {
        id: userId!.id,
      } as ValidationResponse,
      { status: 200 }
    )
  }
)
