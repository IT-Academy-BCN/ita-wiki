import { vi } from 'vitest'
import { QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, screen, render } from '../test-utils'
import { ResourceTitleLink } from '../../components/molecules'
import { queryClient } from '../setup'
import { TAuthContext, useAuth } from '../../context/AuthProvider'

const renderWithQueryClient = (component: React.ReactNode) =>
  render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  )

const user = {
  name: 'Hola',
  avatar: 'Adios',
}
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

  it('should open the link in a new browser tab', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user,
    } as TAuthContext)

    renderWithQueryClient(
      <ResourceTitleLink
        description="Test"
        title="Title Link"
        url={url}
        id="test"
      />
    )

    const link = screen.getByTestId('resource-title')
    expect(link).toBeInTheDocument()

    const title = screen.getByText("Title Link");
    expect(title).toBeInTheDocument();

    fireEvent.click(link)

    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
