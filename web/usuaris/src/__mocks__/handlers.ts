import { HttpResponse, http } from 'msw'
import { urls } from '../constants'

export const handlers = [
  http.get(urls.getUsers, () =>
    HttpResponse.json(
      [
        {
          id: 'TestId',
          name: 'Test Name',
          status: 'INACTIVE',
          createdAt: '2023-11-15T15:36:02.234Z',
          itineraryName: 'backend-node',
        },
      ],
      { status: 200 }
    )
  ),
  http.get(urls.getItineraries, () =>
    HttpResponse.json(
      [
        {
          id: '1',
          name: 'Frontend React',
          slug: 'react',
        },
      ],
      { status: 200 }
    )
  ),
]

export const errorHandlers = [
  http.get(urls.getUsers, () =>
    HttpResponse.json({ message: 'Invalid Credentials' }, { status: 401 })
  ),
  http.get(urls.getUsers, () =>
    HttpResponse.json({ message: 'Database error' }, { status: 500 })
  ),
  http.get(urls.getItineraries, () =>
    HttpResponse.json({ message: 'Database error' }, { status: 500 })
  ),
]
