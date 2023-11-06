import { expect, vi } from 'vitest'
import { fireEvent, screen, render, waitFor } from '../test-utils'
import { ResourceTitleLink } from '../../components/molecules'
import { TAuthContext, useAuth } from '../../context/AuthProvider'

const mockUpdateStatus = vi.fn()

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

vi.mock('../../helpers/fetchers', async () => {
  const actual = await vi.importActual('../../helpers/fetchers')
  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ...actual,
    updateStatus: vi.fn(() => mockUpdateStatus('test')),
  }
})

const user = {
  name: 'Hola',
  avatar: 'Adios',
}

describe('ResourceTitleLink', () => {
  const url = 'https://www.youtube.com/watch?v=n5qbzhZUMsY'

  it('should open the link in a new browser tab', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user,
    } as TAuthContext)

    render(
      <ResourceTitleLink
        description="Test"
        title="Title Link"
        url={url}
        id="test"
      />
    )

    const link = screen.getByTestId('resource-title')
    expect(link).toBeInTheDocument()

    fireEvent.click(link)

    await waitFor(() => {
      expect(mockUpdateStatus).toHaveBeenCalledWith('test')
    })

    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
