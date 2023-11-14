import { vi } from 'vitest'
import { Routes, Route } from 'react-router-dom'
import { render, renderHook, screen, fireEvent } from '../test-utils'
import { VotesDateController } from '../../components/organisms'
import { useSortByDate } from '../../hooks/useSortByDate'
import { useSortByVotes } from '../../hooks/useSortByVotes'

const mockHandleSortOrder = vi.fn()
const mockHandleSortByVotes = vi.fn()
const mockHandleSortByDates = vi.fn()


describe('VotesDate component', () => {
  it('sorts resources by date in descending order', () => {
    const items = [
      { id: 1, date: '2023-11-01' },
      { id: 2, date: '2023-10-30' },
      { id: 3, date: '2023-10-28' }
    ]

    render(
      <Routes>
        <Route
          path="/category/:slug"
          element={
            <VotesDateController
              sortOrder='desc'
              handleSortOrder={mockHandleSortOrder}
              handleSortByVotes={mockHandleSortByVotes}
              handleSortByDates={mockHandleSortByDates}
            />
          }
        />
      </Routes>,
      {
        initialEntries: ['/category/react'],
      }
    )
  
    fireEvent.click(screen.getByText('Data'))
  
    const { result } = renderHook(() => useSortByDate(items, 'date', 'desc'))
  
    expect(result.current.sortedItems).toEqual([
      { id: 1, date: '2023-11-01' },
      { id: 2, date: '2023-10-30' },
      { id: 3, date: '2023-10-28' },
    ])
  })
  
  it('sorts resources by votes in ascending order', () => {
    const votes = [
      {
        id: 'resource1',
        title: 'Resource 1',
        voteCount: {
          downvote: 1,
          upvote: 2,
          total: 3,
          userVote: 1,
        },
      },
      {
        id: 'resource2',
        title: 'Resource 2',
        voteCount: {
          downvote: 0,
          upvote: 0,
          total: 0,
          userVote: 0,
        },
      },
      {
        id: 'resource3',
        title: 'Resource 3',
        voteCount: {
          downvote: 0,
          upvote: 0,
          total: 7,
          userVote: 0,
        },
      },
    ]
  
    render(
      <Routes>
        <Route
          path="/category/:slug"
          element={
            <VotesDateController
              sortOrder='desc'
              handleSortOrder={mockHandleSortOrder}
              handleSortByVotes={mockHandleSortByVotes}
              handleSortByDates={mockHandleSortByDates}
            />
          }
        />
      </Routes>,
      {
        initialEntries: ['/category/react'],
      }
    )
  
    fireEvent.click(screen.getByText('Vots'))
  
    const { result } = renderHook(() => useSortByVotes(votes, 'asc'))
    const sortedResources = result.current.sortedVotes
  
    const voteCounts = sortedResources.map((vote) => vote.voteCount.total)
  
    expect(voteCounts).toEqual([0, 3, 7])
  })
  
  it('changes Votos and Fecha styles on click', () => {
    render(
      <VotesDateController
        sortOrder='desc'
        handleSortOrder={mockHandleSortOrder}
        handleSortByVotes={mockHandleSortByVotes}
        handleSortByDates={mockHandleSortByDates}
      />)
  
    fireEvent.click(screen.getByText('Vots'))
  
    expect(screen.getByText('Vots')).toHaveStyle('font-weight: bold')
    expect(screen.getByText('Data')).toHaveStyle('font-weight: normal')
    expect(mockHandleSortByVotes).toHaveBeenCalled()
  
    fireEvent.click(screen.getByText('Data'))
  
    expect(screen.getByText('Data')).toHaveStyle('font-weight: bold')
    expect(screen.getByText('Vots')).toHaveStyle('font-weight: normal')
    expect(mockHandleSortByDates).toHaveBeenCalled()
  })
})
