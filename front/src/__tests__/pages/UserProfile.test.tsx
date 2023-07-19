import { vi } from 'vitest'
import { render, screen } from '../test-utils'
import { UserProfile } from '../../pages'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { useGetMyResources } from '../../hooks/useGetMyResources'
import { useGetFavorites } from '../../hooks/useGetFavorites'

vi.mock("../../hooks/useGetMyResources", () => ({
  useGetMyResources: vi.fn(() => ({
    resources: [{ voteCount: { total: 4 } }],
  })),
}))

vi.mock("../../hooks/useGetFavorites", () => ({
  useGetFavorites: vi.fn(() => (
    [{
      "title": "My Resource in Javascript",
    }]
  )),
}))

describe('UserProfile', () => {
  it('renders correctly with users name, email, contributions and favorites', () => {
    vi.mock('../../context/AuthProvider', async () => {
      const actual = await vi.importActual('../../context/AuthProvider')
      return {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ...actual,
        useAuth: vi.fn(() => ({
        user: {
          name: "name",
          email: "test@test.com",
        },
      })),
      }
    })
    vi.mocked(useGetMyResources).mockReturnValueOnce({
      resources: [{ voteCount: { total: 1 } }, { voteCount: { total: 2 } }],
    })
    vi.mocked(useGetFavorites).mockReturnValueOnce([
      {
      "title": "My Resource in Javascript",
      }
    ])
    render(<UserProfile />)

    expect(screen.getByText(/volver/i)).toBeInTheDocument()
    expect(screen.getByText(/name/i)).toBeInTheDocument()
    expect(screen.getByText(/test@test.com/i)).toBeInTheDocument()
    const contributionsElement = screen.getByText(/2/)
    expect(contributionsElement).toBeInTheDocument()
    const favoritesElement = screen.getByText(/1/)
    expect(favoritesElement).toBeInTheDocument()

  })

  it('renders placeholder name and email text if user is null', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)
    vi.mocked(useGetMyResources).mockReturnValueOnce({
      resources: [],
    })
    vi.mocked(useGetFavorites).mockReturnValueOnce([])
    render(<UserProfile />)

    expect(screen.getByText('@userName')).toBeInTheDocument()
    expect(screen.getByText('user@user.com')).toBeInTheDocument()
    const contributionsElement = screen.getByText(/0/)
    expect(contributionsElement).toBeInTheDocument()
    const favoritesElement = screen.getByText(/0/)
    expect(favoritesElement).toBeInTheDocument()
  })

})



