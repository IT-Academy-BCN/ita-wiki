import { http, HttpResponse } from 'msw'
import { urls } from '../../constants'

export const voteHandlers = [
  http.put(urls.vote, () => new HttpResponse(null, { status: 204 })),
]

export const voteErrorHandlers = [
  http.put(urls.vote, () =>
    HttpResponse.json({ message: 'User not found' }, { status: 401 })
  ),
  http.put(urls.vote, () =>
    HttpResponse.json(
      { message: 'User or resource not found' },
      { status: 404 }
    )
  ),
]
