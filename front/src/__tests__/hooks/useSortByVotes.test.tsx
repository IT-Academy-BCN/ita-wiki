import { renderHook } from '@testing-library/react'
import { useSortByVotes } from '../../hooks/useSortByVotes'

const mockedResources = [
    {
      id: 'cfkdsjfs435jfkd34900493t',
      title: 'Test',
      slug: 'resource-test',
      description: 'Resource ',
      url: 'https://es.react.dev/',
      resourceType: 'TUTORIAL',
      createdAt: '2023-11-07T12:45:34.122Z',
      updatedAt: '2023-11-08T16:25:02.222Z',
      status: 'NOT_SEEN',
      user: {
        name: 'user1',
        email: 'user1@user.xyz',
      },
      topics: [
        {
          topic: {
            id: 'rfkdrere533jfkd34900493',
            name: 'Components',
            slug: 'components',
            categoryId: 'c343439gfndjg94mg43g',
            createdAt: '2023-11-03T05:11:11.432Z',
            updatedAt: '2023-11-04T05:11:11.245Y',
          },
        },
      ],
      voteCount: {
        upvote: 3,
        downvote: 4,
        total: 8,
        userVote: 1
      },
    },
    {
      id: 'c434343rerlso4343fo',
      title: 'Resource',
      slug: 'resource-test',
      description: 'Test',
      url: 'https://es.react.dev/',
      resourceType: 'TUTORIAL',
      createdAt: '2023-11-07T11:01:42.570Z',
      updatedAt: '2023-11-08T15:35:27.342Z',
      status: 'NOT_SEEN',
      user: {
        name: 'user2',
        email: 'user2@user.xyz',
      },
      topics: [
        {
          topic: {
            id: 'crerej43943jfskdfs',
            name: 'Components',
            slug: 'components',
            categoryId: 'fdsmfkd8f9343fjsd3d',
            createdAt: '2023-11-03T08:04:41.532Z',
            updatedAt: '2023-11-03T09:55:23.252Y',
          },
        },
      ],
      voteCount: {
        upvote: 1,
        downvote: 2,
        total: 3,
        userVote: 0
      },
    },
  ]

  describe('useSortByVotes', () => {
  it('sorts votes in descending order', () => {
    const { result } = renderHook(() =>
      useSortByVotes(mockedResources, 'desc')
    )
    expect(result.current.sortedVotes[0].title).toBe('Test')
  })

  it('sorts votes in ascending order', () => {
    const { result } = renderHook(() =>
      useSortByVotes(mockedResources, 'asc')
    )
    expect(result.current.sortedVotes[0].title).toBe('Resource')
  })
})
