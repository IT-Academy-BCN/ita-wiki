import { renderHook } from '@testing-library/react'
import { useSortByDate } from '../../hooks/useSortByDate'

const mockedResources = [
  {
    id: 'cljptdk7z0001s6rmffzlj5vy',
    title: 'Resource Test',
    slug: 'resource-test',
    description: 'recurso ',
    url: 'https://es.react.dev/',
    resourceType: 'VIDEO',
    createdAt: '2023-07-05T14:28:26.399Z',
    updatedAt: '2023-07-10T14:20:02.243Z',
    status: 'NOT_SEEN',
    user: {
      name: 'user2',
      email: 'user2@user.com',
    },
    topics: [
      {
        topic: {
          id: 'cli04ut8j000509k389fv899t',
          name: 'Eventos',
          slug: 'eventos',
          categoryId: 'clh78rhsk000008l0ahamgoug',
          createdAt: '2023-05-03T05:14:21.262Z',
          updatedAt: '2023-05-03T05:14:21.262Z',
        },
      },
    ],
    voteCount: {
      upvote: 2,
      downvote: 2,
      total: 0,
      userVote: 1
    },
  },
  {
    id: 'cljt0cx6a0007s6ca3aobeqlo',
    title: 'Resource',
    slug: 'resource',
    description: 'editando todos los campos',
    url: 'https://www.react-hook-form.com/get-started/',
    resourceType: 'TUTORIAL',
    createdAt: '2023-07-07T20:07:12.370Z',
    updatedAt: '2023-07-10T18:45:17.672Z',
    status: 'NOT_SEEN',
    user: {
      name: 'user2',
      email: 'user2@user.com',
    },
    topics: [
      {
        topic: {
          id: 'cli04ukio000309k3eqr02v4s',
          name: 'Components',
          slug: 'components',
          categoryId: 'clh78rhsk000008l0ahamgoug',
          createdAt: '2023-05-03T05:14:21.262Z',
          updatedAt: '2023-05-03T05:14:21.262Z',
        },
      },
    ],
    voteCount: {
      upvote: 0,
      downvote: 0,
      total: 0,
      userVote: 0
    },
  },
]

it('should sort resources in ascending order', () => {
  const { result } = renderHook(() =>
    useSortByDate(mockedResources, 'createdAt', 'asc')
  )

  expect(result.current.sortedItems[0].title).toBe('Resource Test')
})
it('should sort resources in descending order', () => {
  const { result } = renderHook(() =>
    useSortByDate(mockedResources, 'createdAt', 'desc')
  )

  expect(result.current.sortedItems[0].title).toBe('Resource')
})
