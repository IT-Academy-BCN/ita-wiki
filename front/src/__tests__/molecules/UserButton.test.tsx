import { vi } from 'vitest'
import { render, screen, fireEvent } from '../test-utils'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import UserButton from '../../components/molecules/UserButton'
import userEvent from '@testing-library/user-event'

vi.mock('../../context/AuthProvider', async () => {
  const actual = await vi.importActual('../../context/AuthProvider')
  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ...actual,
    useAuth: vi.fn(),
  }
})

describe('UserButton', () => {
  it('should render the component and handle dropdown menu', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)
  })

  it('shows avatar image if user is set', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'User',
        avatar: 'Avatar',
      },
    } as TAuthContext)

    render(<UserButton />)
    expect(screen.getByTestId('avatarImage')).toBeInTheDocument()
  })
})
