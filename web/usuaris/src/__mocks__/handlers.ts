import { HttpResponse, http } from 'msw'
import { urls } from '../constants'

export const handlers = [
  http.get(urls.getUsers, () =>
    HttpResponse.json(
      [
        {
          id: '1',
          name: 'Ona Sitgar',
          status: 'PENDING',
          createdAt: '2023/11/05 00:00:00.000',
          itineraryName: 'Backend Node',
        },
        {
          id: '2',
          name: 'Marc Bofill',
          status: 'ACTIVE',
          createdAt: '2023/11/05 00:00:00.000',
          itineraryName: 'Frontend React',
        },
        {
          id: '3',
          name: 'Montserrat Capdevila',
          status: 'BLOCKED',
          createdAt: '2023/11/05 00:00:00.000',
          itineraryName: 'Fullstack Php',
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

  http.post(urls.logIn, () => new HttpResponse(null, { status: 204 })),

  http.get(urls.getMe, () =>
    HttpResponse.json(
      [
        {
          dni: '12345678A',
          email: 'test@example.cat',
          role: 'ADMIN',
        },
      ],
      { status: 200 }
    )
  ),

  http.patch(
    `${urls.patchUser}1`,
    () => new HttpResponse(null, { status: 204 })
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
