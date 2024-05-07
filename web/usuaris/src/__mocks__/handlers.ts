import { HttpResponse, http } from 'msw'
import { urls } from '../constants'
import { UserStatus } from '../types'

export const handlers = [
  http.get(urls.getUsers, ({ request }) => {
    const url = new URL(request.url)
    const itinerarySlug = url.searchParams.get('itinerarySlug')
    const status = url.searchParams.get('status')
    const startDate = url.searchParams.get('startDate')
    const endDate = url.searchParams.get('endDate')
    const name = url.searchParams.get('name')
    const dni = url.searchParams.get('dni')

    if (
      itinerarySlug === 'frontend-react' &&
      status === UserStatus.ACTIVE &&
      ((startDate &&
        startDate <= '2023/11/06 00:00:00.000' &&
        endDate &&
        endDate >= '2023/11/06 00:00:00.000') ||
        (startDate && startDate <= '2023/11/06 00:00:00.000') ||
        (endDate && endDate >= '2023/11/06 00:00:00.000')) &&
      (name?.includes('marc') || dni?.includes('marc'))
    ) {
      return HttpResponse.json(
        [
          {
            id: '2',
            name: 'Marc Bofill',
            dni: '87654321B',
            status: 'ACTIVE',
            createdAt: '2023/11/06 00:00:00.000',
            itineraryName: 'Frontend React',
          },
        ],
        { status: 200 }
      )
    }

    return HttpResponse.json(
      [
        {
          id: '1',
          name: 'Ona Sitgar',
          dni: '12345678A',
          status: 'PENDING',
          createdAt: '2023/11/05 00:00:00.000',
          itineraryName: 'Backend Node',
        },
        {
          id: '2',
          name: 'Marc Bofill',
          dni: '87654321B',
          status: 'ACTIVE',
          createdAt: '2023/11/06 00:00:00.000',
          itineraryName: 'Frontend React',
        },
        {
          id: '3',
          name: 'Montserrat Capdevila',
          dni: '45678912C',
          status: 'BLOCKED',
          createdAt: '2023/11/07 00:00:00.000',
          itineraryName: 'Fullstack Php',
        },
        {
          id: '4',
          name: 'Anna Brull',
          dni: '45678912D',
          status: 'BLOCKED',
          createdAt: '2023/11/08 00:00:00.000',
          itineraryName: 'Frontend React',
        },
        {
          id: '5',
          name: 'Marc Serra',
          dni: '12378912D',
          status: 'BLOCKED',
          createdAt: '2023/11/09 00:00:00.000',
          itineraryName: 'Frontend Angular',
        },
      ],
      { status: 200 }
    )
  }),

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
