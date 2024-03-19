import { vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../test-utils'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { UserButton } from '../../components/molecules'
import { paths } from '../../constants'

vi.mock('../../context/AuthProvider', async () => {
  const actual = await vi.importActual('../../context/AuthProvider')
  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ...actual,
    useAuth: vi.fn(),
  }
})

const navigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual: Record<number, unknown> = await vi.importActual(
    'react-router-dom'
  )
  return {
    ...actual,
    useNavigate: vi.fn(() => navigate),
  }
})

describe('UserButton', () => {
  it('opens login modal when avatar is clicked and user is not authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)

    render(<UserButton />)

    const avatar = screen.getByAltText('Avatar')
    expect(avatar).toBeInTheDocument()

    fireEvent.click(avatar)
    expect(screen.getByTestId('loginModal')).toBeInTheDocument()
  })

  it('navigates to profile when avatar is clicked and user is authenticated', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'User',
        avatarId: 'Avatar',
      },
    } as TAuthContext)

    render(<UserButton />)

    const avatarAuthenticated = screen.getByAltText('Avatar authenticated')
    expect(avatarAuthenticated).toBeInTheDocument()

    fireEvent.click(avatarAuthenticated)
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith(paths.profile)
    })
  })
})
