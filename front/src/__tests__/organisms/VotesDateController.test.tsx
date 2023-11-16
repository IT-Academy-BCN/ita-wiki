import { vi } from 'vitest'
import { render, screen, fireEvent } from '../test-utils'
import { VotesDateController } from '../../components/organisms'

const mockHandleSortOrder = vi.fn()
const mockHandleSortByVotes = vi.fn()
const mockHandleSortByDates = vi.fn()

describe('VotesDate component', () => {
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
    expect(mockHandleSortByVotes).toHaveBeenCalledTimes(1)
  
    fireEvent.click(screen.getByText('Data'))
  
    expect(screen.getByText('Data')).toHaveStyle('font-weight: bold')
    expect(screen.getByText('Vots')).toHaveStyle('font-weight: normal')
    expect(mockHandleSortByDates).toHaveBeenCalledTimes(1)
  })
})
