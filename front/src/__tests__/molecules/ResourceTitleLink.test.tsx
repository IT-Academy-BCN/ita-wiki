import { vi } from 'vitest'
import { QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ResourceTitleLink } from '../../components/molecules'
import { queryClient } from '../setup'

const renderWithQueryClient = (component: React.ReactNode) =>
  render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  )

vi.mock('../../context/AuthProvider', async () => {
  const actual = (await vi.importActual(
    '../../context/AuthProvider'
  )) as typeof import('../../context/AuthProvider')
  return {
    ...actual,
    useAuth: vi.fn(() => ({
      user: null,
    })),
  }
})

describe('ResourceTitleLink', () => {
  const url = 'https://www.youtube.com/watch?v=n5qbzhZUMsY'

  it('renders correctly', async () => {
    renderWithQueryClient(
      <BrowserRouter>
        <ResourceTitleLink
          description="Test"
          title="Title Link"
          url={url}
          id="test"
        />
      </BrowserRouter>
    )
  })

  it('should opens the link in a new browser tab', () => {
    renderWithQueryClient(
      <BrowserRouter>
        <ResourceTitleLink
          description="Test"
          title="Title Link"
          url={url}
          id="test"
        />
      </BrowserRouter>
    )

    fireEvent.click(screen.getByRole('link'))

    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank')
    expect(screen.getByRole('link')).toHaveAttribute(
      'rel',
      'noopener noreferrer'
    )
  })
})
