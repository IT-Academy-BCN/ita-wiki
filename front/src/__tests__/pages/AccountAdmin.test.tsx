import { vi } from 'vitest'
import React from 'react'
import { render, screen, fireEvent, waitFor } from '../test-utils'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AccountAdmin } from '../../pages'

const mockUsers = [
  {
    id: '1',
    email: 'user1@example.com',
    dni: '12345678',
    name: 'User One',
    status: 'ACTIVE',
    role: 'user',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
]
vi.mock('/api/users', () => mockUsers)
const queryClient = new QueryClient()

const renderWithQueryClient = (component: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  )
}

describe('AccountAdmin Component', () => {
  it('renders loading text while fetching users', async () => {
    render(<AccountAdmin />)
    const loadingText = screen.getByText('Loading...')
    expect(loadingText).toBeInTheDocument()
  })
  it('renders error text when fetching users fails', async () => {
    render(<AccountAdmin />)
    const errorText = await screen.findByText('Error fetching users')
    expect(errorText).toBeInTheDocument()
  })
  it('renders users when fetching users succeeds', async () => {
    async () => {
      renderWithQueryClient(<AccountAdmin />)
      await screen.findByText('User One')
      const user1 = await screen.findByText('User One')
      expect(user1).toBeInTheDocument()
    }
  })
  it('updates user status when clicking on the status button', async () => {
    async () => {
      renderWithQueryClient(<AccountAdmin />)
      const user1 = await screen.findByText('User One')
      expect(user1).toBeInTheDocument()
      const statusButton = screen.getByRole('button', { name: 'ACTIVE' })
      fireEvent.click(statusButton)
      await waitFor(() =>
        expect(
          screen.getByRole('button', { name: 'INACTIVE' })
        ).toBeInTheDocument()
      )
    }
  })
  it('filters users by DNI', async () => {
    ;async () => {
      renderWithQueryClient(<AccountAdmin />)
      const user1 = await screen.findByText('User One')
      expect(user1).toBeInTheDocument()
      const searchInput = screen.getByPlaceholderText('Search by DNI')
      fireEvent.change(searchInput, { target: { value: '12345678' } })
      await waitFor(() =>
        expect(screen.getByText('User One')).toBeInTheDocument()
      )
    }
  })
})
