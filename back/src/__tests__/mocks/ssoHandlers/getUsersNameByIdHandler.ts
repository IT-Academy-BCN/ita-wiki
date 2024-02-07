import { http, HttpResponse } from 'msw'
import QueryString from 'qs'
import { testUserData } from '../../globalSetup'

export const getUsersNameByIdHandler = http.get<
  never,
  { message: string } | { id: string; name: string }[]
>('http://localhost:8000/api/v1/users/name', async ({ request }) => {
  const url = new URL(request.url)
  const queryString = url.search.slice(1)
  const decodeQuery = decodeURIComponent(queryString)
  const userIds = QueryString.parse(decodeQuery, { comma: true }) as {
    id: string[]
  }
  if (typeof userIds.id === 'string') userIds.id = [userIds.id]
  if (!userIds.id) return HttpResponse.json([], { status: 200 })
  const uniqueIds = [...new Set(userIds.id)]
  const findUsers = uniqueIds
    .map((id) => Object.values(testUserData).find((user) => user.id === id))
    .filter(Boolean)
    .map((user) => {
      if (user) {
        return { id: user.id, name: user.name }
      }
      return undefined
    })
    .filter(Boolean) as { id: string; name: string }[]
  return HttpResponse.json(findUsers as { id: string; name: string }[], {
    status: 200,
  })
})
