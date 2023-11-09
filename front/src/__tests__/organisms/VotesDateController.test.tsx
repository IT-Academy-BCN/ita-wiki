import { render, renderHook, screen, fireEvent } from '../test-utils'
import { Category } from '../../pages'
import { useSortByDate } from '../../hooks/useSortByDate'
import { useSortByVotes } from '../../hooks/useSortByVotes'

describe('VotesDate component', () => {
  it('sorts resources by date in descending order', () => {
    const items = [
      { id: 1, date: '2023-11-01' },
      { id: 2, date: '2023-10-30' },
      { id: 3, date: '2023-10-28' }
    ]
  
    render(<Category />)
  
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
  
    render(<Category />)
  
    fireEvent.click(screen.getByText('Vots'))
  
    const { result } = renderHook(() => useSortByVotes(votes, 'asc'))
    const sortedResources = result.current.sortedVotes
  
    const voteCounts = sortedResources.map((vote) => vote.voteCount.total)
  
    expect(voteCounts).toEqual([0, 3, 7])
  })
  
  it('changes Votos and Fecha styles on click', () => {
    render(<Category />)
  
    const sortVotesButton = screen.getByText('Vots')
    const sortDatesButton = screen.getByText('Data')
  
    fireEvent.click(sortVotesButton)
  
    expect(screen.getByText('Vots')).toHaveStyle('font-weight: bold')
  
    fireEvent.click(sortDatesButton)
  
    expect(screen.getByText('Data')).toHaveStyle('font-weight: bold')
  })
})
