import { http, HttpResponse } from 'msw'
import QueryString from 'qs'
import { z } from 'zod'
import { testUserData } from '../../globalSetup'
import { ssoGetUsersNameByIdRequestSchema } from '../../../schemas/sso/ssoListUsers'

const fieldsSchema = z.enum(['id', 'name'])
const querySchema = z.object({
  query: z
    .object({
      id: ssoGetUsersNameByIdRequestSchema,
      fields: fieldsSchema.array().optional(),
    })
    .strict(),
})

export const listUsersHandler = http.get<
  never,
  { message: string } | { id: string; name: string }[]
>('http://localhost:8000/api/v1/users', async ({ request }) => {
  const url = new URL(request.url)
  const queryString = url.search.slice(1)
  const decodeQuery = decodeURIComponent(queryString)
  const queryParse = QueryString.parse(decodeQuery, { comma: true }) as {
    id: string[]
    fields: string[]
  }
  if (typeof queryParse.id === 'string') queryParse.id = [queryParse.id]

  const zodParse = querySchema.safeParse({ query: queryParse })
  if (!zodParse.success) {
    return HttpResponse.json(
      { message: zodParse.error.issues },
      { status: 400 }
    )
  }
  if (!queryParse.id) return HttpResponse.json([], { status: 200 })
  const uniqueIds = [...new Set(queryParse.id)]
  const findUsers = uniqueIds
    .map((id) => Object.values(testUserData).find((user) => user.id === id))
    .filter((user) => user && user.name)
    .map((user) => ({ id: user!.id, name: user!.name })) as {
    id: string
    name: string
  }[]
  return HttpResponse.json(findUsers as { id: string; name: string }[], {
    status: 200,
  })
})
