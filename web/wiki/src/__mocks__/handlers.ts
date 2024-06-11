import { HttpResponse, http } from 'msw'
import { urls } from '../constants'
import { voteErrorHandlers, voteHandlers } from './handlers/vote'

export const handlers = [
  http.post(urls.logIn, () => new HttpResponse(null, { status: 204 })),

  http.post(urls.register, () => new HttpResponse(null, { status: 204 })),

  http.post(urls.createResource, () => new HttpResponse(null, { status: 204 })),

  http.post(urls.postTopics, () =>
    HttpResponse.json({ success: true }, { status: 200 })
  ),

  http.patch(urls.patchTopics, () =>
    HttpResponse.json({ success: true }, { status: 200 })
  ),

  http.patch(urls.users, () => new HttpResponse(null, { status: 204 })),

  http.get(urls.users, () =>
    HttpResponse.json(
      [
        {
          id: 'testId',
          email: 'usertest@example.cat',
          dni: '12345678L',
          name: 'Test Name',
          avatarId: 'testAvatar.jpg',
          itineraryId: 'react',
          status: 'ACTIVE',
          role: 'REGISTERED',
          createdAt: '2023-11-15T15:36:02.234Z',
          updatedAt: '2023-11-15T15:36:02.234Z',
        },
      ],
      { status: 200 }
    )
  ),

  http.get(urls.getMe, () =>
    HttpResponse.json(
      [
        {
          name: 'string',
          dni: 'string',
          email: 'user@example.cat',
          role: 'ADMIN',
          status: 'ACTIVE',
        },
      ],
      { status: 200 }
    )
  ),

  http.get(urls.getCategories, () =>
    HttpResponse.json(
      [
        {
          id: '1',
          name: 'React',
          slug: 'react',
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
          name: 'Frontend Angular',
          slug: 'frontend-angular',
        },
      ],
      { status: 200 }
    )
  ),

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  http.get(urls.getTopics, ({ request }) => {
    const url = new URL(request.url)
    const slug = url.searchParams.get('slug')
    if (slug === 'react') {
      return HttpResponse.json(
        [
          {
            id: 'cli04v2l0000008mq5pwx7w5j',
            name: 'Listas',
            slug: 'listas',
            categoryId: 'clh78rhsk000008l0ahamgoug',
          },
          {
            id: 'cli04uxud000609k37w9phejw',
            name: 'Renderizado condicional',
            slug: 'renderizado-condicional',
            categoryId: 'clh78rhsk000008l0ahamgoug',
          },
        ],
        { status: 200 }
      )
    }
    if (slug === 'empty-topics') {
      return HttpResponse.json([], { status: 200 })
    }
    if (slug === 'invalid-slug') {
      return HttpResponse.json(
        { message: 'No category found with this slug' },
        { status: 404 }
      )
    }
    return HttpResponse.json(undefined, { status: 200 })
  }),

  http.get(urls.getResources, ({ params }) => {
    const { slug } = params
    if (slug === 'emptyResource') {
      return HttpResponse.json([], { status: 200 })
    }

    return HttpResponse.json(
      [
        {
          id: 'resourceId',
          title: 'Resource Test',
          description: 'Resource Test Description',
          url: 'http://www.google.com',
          createdAt: '2023-02-17T03:07:00',
          updatedAt: '2023-05-17T03:07:00',
          user: {
            name: 'Test User Name',
            email: 'test@mail.com',
          },
          voteCount: {
            upvote: 6,
            downvote: 2,
            total: 1,
            userVote: 1,
          },
          isFavorite: 'false',
        },
      ],
      { status: 200 }
    )
  }),
  http.post(urls.createResource, () => new HttpResponse(null, { status: 204 })),

  http.patch(
    urls.updateResource,
    () => new HttpResponse(null, { status: 204 })
  ),

  http.get(urls.getTypes, () =>
    HttpResponse.json(['Test type 1', 'Test type 2', 'Test type 3'], {
      status: 200,
    })
  ),

  http.get(urls.getFavorites, () =>
    HttpResponse.json(
      [
        {
          id: 'favoriteId',
          title: 'My favorite title',
          slug: 'my-favorite',
          description: 'Favorite description',
          url: 'https://tutorials.cat/learn/javascript',
          resourceType: 'VIDEO',
          categoryId: 'clp80tq24000008ju72hsfyf1',
          createdAt: '11/11/2011',
          updatedAt: '12/12/2012',
          user: {
            name: 'Author Name',
            avatarId: 'avatar.jpg',
          },
          isAuthor: false,
          voteCount: {
            userVote: 0,
            upvote: 3,
            downvote: 0,
            total: 3,
          },
          topics: [
            {
              topic: {
                id: 'topicId',
                name: 'topic Name',
                slug: 'topicSlug',
                categoryId: 'categoryId',
                createdAt: 'date',
                updatedAt: 'update',
              },
            },
          ],
        },
        {
          id: 'secondFavoriteId',
          title: 'My favorite title 2',
          slug: 'my-favorite-two',
          description: 'Favorite description two',
          url: 'https://tutorials.cat/learn/',
          resourceType: 'VIDEO',
          categoryId: 'clp80tq24000008ju72hsfyf1',
          createdAt: '11/11/2011',
          updatedAt: '12/12/2012',
          user: {
            name: 'Author Test Name',
            avatarId: 'avatar2.jpg',
          },
          isAuthor: false,
          voteCount: {
            userVote: 0,
            upvote: 3,
            downvote: 0,
            total: 3,
          },
          topics: [
            {
              topic: {
                id: 'topicId',
                name: 'topic Name',
                slug: 'topicSlug',
                categoryId: 'categoryId',
                createdAt: 'date',
                updatedAt: 'update',
              },
            },
          ],
        },
      ],
      { status: 200 }
    )
  ),

  // eslint-disable-next-line consistent-return,
  http.get(`${urls.getFavorites}/:slug`, ({ params }) => {
    const { slug } = params
    if (slug === 'react') {
      return HttpResponse.json(
        [
          {
            id: 'favoriteId',
            title: 'My favorite title',
            slug: 'my-favorite',
            description: 'Favorite description',
            url: 'https://tutorials.cat/learn/javascript',
            resourceType: 'VIDEO',
            userId: 'userId',
            createdAt: '11/11/2011',
            updatedAt: '12/12/2012',
            status: 'NOT_SEEN',
            voteCount: {
              userVote: 0,
              upvote: 3,
              downvote: 0,
              total: 3,
            },
            isFavorite: 'true',
          },
        ],
        { status: 200 }
      )
    }
    if (slug === 'slugWithoutFavs') {
      return HttpResponse.json([], { status: 200 })
    }
  }),

  http.put(urls.favorites, () => new HttpResponse(null, { status: 204 })),

  http.post(
    `${urls.postStatus}/test`,
    () => new HttpResponse(null, { status: 204 })
  ),

  http.get(urls.getResourcesByUser, ({ request }) => {
    const url = new URL(request.url)
    const slug = url.searchParams.get('categorySlug')
    if (slug === 'react') {
      return HttpResponse.json(
        [
          {
            id: 'resourceId',
            title: 'My React resource title',
            slug: 'react',
            description: 'My React resource description',
            url: 'https://reactjs.org/',
            user: {
              name: 'string',
              email: 'user@example.cat',
            },
            topics: [
              {
                topic: {
                  id: 'topicId1',
                  name: 'Topic 1',
                  slug: 'topic-1',
                  categoryId: 'categoryId1',
                },
              },
            ],
            voteCount: {
              userVote: 0,
              upvote: 10,
              downvote: 2,
              total: 8,
            },
            favorite: false,
          },
        ],
        { status: 200 }
      )
    }
    if (slug === 'emptySlug') {
      return HttpResponse.json([], { status: 200 })
    }
    return HttpResponse.json(
      [
        {
          id: 'resourceId',
          title: 'My resource title without slug',
          slug: 'react',
          description: 'My resource description',
          url: 'https://reactjs.org/',
          user: {
            name: 'string',
            email: 'user@example.cat',
          },
          topics: [
            {
              topic: {
                id: 'topicId1',
                name: 'Topic 1',
                slug: 'topic-1',
                categoryId: 'categoryId1',
              },
            },
          ],
          voteCount: {
            userVote: 0,
            upvote: 10,
            downvote: 2,
            total: 8,
          },
          favorite: false,
        },
      ],
      { status: 200 }
    )
  }),
  ...voteHandlers,
]

export const errorHandlers = [
  http.get(urls.getCategories, () =>
    HttpResponse.json({ message: 'Internal server error' }, { status: 500 })
  ),

  http.post(urls.getTopics, () =>
    HttpResponse.json(
      { message: 'Unauthorized: Missing token' },
      { status: 401 }
    )
  ),

  http.get(urls.getTopics, () =>
    HttpResponse.json({ message: 'Internal server error' }, { status: 500 })
  ),

  http.post(urls.getTopics, () =>
    HttpResponse.json({ message: 'Database error' }, { status: 500 })
  ),

  http.get(urls.getResources, () =>
    HttpResponse.json({ message: 'Internal server error' }, { status: 500 })
  ),

  http.put(urls.getResources, () =>
    HttpResponse.json({ message: 'Internal server error' }, { status: 500 })
  ),

  http.get(urls.getTypes, () =>
    HttpResponse.json({ message: 'Internal server error' }, { status: 500 })
  ),

  http.get(`${urls.getFavorites}/:slug`, () =>
    HttpResponse.json({ message: 'Internal server error' }, { status: 500 })
  ),

  http.get(urls.getFavorites, () =>
    HttpResponse.json({ message: 'Internal server error' }, { status: 500 })
  ),

  http.put(urls.vote, () =>
    HttpResponse.json({ message: 'User not found' }, { status: 401 })
  ),
  http.put(urls.vote, () =>
    HttpResponse.json(
      { message: 'User or resource not found' },
      { status: 404 }
    )
  ),
  http.post(urls.postStatus, () =>
    HttpResponse.json({ message: 'Error updating status' }, { status: 401 })
  ),

  http.get(urls.getResourcesByUser, () =>
    HttpResponse.json({ message: 'Internal server error' }, { status: 500 })
  ),

  http.get(urls.getResourcesByUser, ({ params }) => {
    const { categorySlug } = params

    if (categorySlug === 'errorCase') {
      return HttpResponse.json(
        { message: 'Internal server error' },
        { status: 500 }
      )
    }

    return HttpResponse.json({ message: 'User not found' }, { status: 401 })
  }),

  http.get(urls.users, () =>
    HttpResponse.json({ message: 'Internal server error' }, { status: 500 })
  ),

  http.patch(urls.users, () =>
    HttpResponse.json({ message: 'Internal server error' }, { status: 500 })
  ),

  http.post(urls.createResource, () =>
    HttpResponse.json({ message: 'Conflict' }, { status: 409 })
  ),

  http.patch(urls.createResource, () =>
    HttpResponse.json({ message: 'Internal server error' }, { status: 500 })
  ),
  ...voteErrorHandlers,
]
