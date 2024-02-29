import { http, HttpResponse } from 'msw'
import QueryString from 'qs'
import { testUserData } from '../../globalSetup'

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
  if (!queryParse.id) return HttpResponse.json([], { status: 200 })
  const uniqueIds = [...new Set(queryParse.id)]
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
