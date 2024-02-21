import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { ResourceTitleLink } from '../../components/molecules'

const mockClick = vi.fn()

const resourceTitleProps = {
  description: 'Test',
  title: 'Title Link',
  url: 'https://www.youtube.com/watch?v=n5qbzhZUMsY',
  onClick: mockClick,
}

describe('ResourceTitleLink', () => {
  it('renders correctly', () => {
    render(<ResourceTitleLink {...resourceTitleProps} />)
    expect(screen.getByTestId('resource-title')).toBeInTheDocument()
    expect(screen.getByText('Title Link')).toBeInTheDocument()
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('should call function when clicked', async () => {
    render(<ResourceTitleLink {...resourceTitleProps} />)

    const link = screen.getByTestId('resource-title')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')

    fireEvent.click(link)

    await waitFor(() => {
      expect(mockClick).toHaveBeenCalled()
    })
  })
})
