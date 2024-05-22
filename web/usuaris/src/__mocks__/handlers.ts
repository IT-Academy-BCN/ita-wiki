import { HttpResponse, http } from 'msw'
import { urls } from '../constants'
import { UserStatus } from '../types'
import { UserRole } from '../types/types'

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
          role: UserRole.ADMIN,
          createdAt: '2023/11/05 00:00:00.000',
          itineraryName: 'Backend Node',
          deletedAt: null,
        },
        {
          id: '2',
          name: 'Marc Bofill',
          dni: '87654321B',
          status: 'ACTIVE',
          role: UserRole.REGISTERED,
          createdAt: '2023/11/06 00:00:00.000',
          itineraryName: 'Frontend React',
          deletedAt: null,
        },
        {
          id: '3',
          name: 'Montserrat Capdevila',
          dni: '45678912C',
          status: 'BLOCKED',
          role: UserRole.REGISTERED,
          createdAt: '2023/11/07 00:00:00.000',
          itineraryName: 'Fullstack Php',
          deletedAt: null,
        },
        {
          id: '4',
          name: 'Anna Brull',
          dni: '45678912D',
          status: 'BLOCKED',
          role: UserRole.ADMIN,
          createdAt: '2023/11/08 00:00:00.000',
          itineraryName: 'Frontend React',
          deletedAt: null,
        },
        {
          id: '5',
          name: 'Marc Serra',
          dni: '12378912D',
          status: 'BLOCKED',
          role: UserRole.ADMIN,
          createdAt: '2023/11/09 00:00:00.000',
          itineraryName: 'Frontend Angular',
          deletedAt: null,
        },
        {
          id: '6',
          name: 'Paula Font',
          dni: '12131415F',
          status: 'BLOCKED',
          role: UserRole.REGISTERED,
          createdAt: '2023/10/10 00:00:00.000',
          itineraryName: 'Data Science',
          deletedAt: '2023/10/11 00:00:00.000',
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
          role: UserRole.ADMIN,
        },
      ],
      { status: 200 }
    )
  ),

  http.patch(
    `${urls.patchUser}1`,
    () => new HttpResponse(null, { status: 204 })
  ),

  http.delete(
    `${urls.deleteUser}1`,
    () => new HttpResponse(null, { status: 204 })
  ),

  http.delete(
    urls.deleteMultipleUsers,
    () => new HttpResponse(null, { status: 204 })
  ),

  http.post(
    urls.changeUsersStatus,
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
  http.delete(`${urls.deleteUser}1`, () =>
    HttpResponse.json({ message: 'Database error' }, { status: 500 })
  ),
  http.delete(urls.deleteMultipleUsers, () =>
    HttpResponse.json({ message: 'Database error' }, { status: 500 })
  ),
]
