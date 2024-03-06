import { vi } from 'vitest'
import { render, screen } from '../test-utils'
import CardResource from '../../components/organisms/CardResource'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { TCardResource } from '../../types'

beforeEach(() => {
  vi.mock('../../context/AuthProvider', async () => {
    const actual = await vi.importActual('../../context/AuthProvider')
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...actual,
      useAuth: vi.fn(),
    }
  })
})

const handleAccessModal = vi.fn()
afterEach(() => {
  vi.resetAllMocks()
})

const mockCardResource: TCardResource = {
  id: 'resourceId1',
  title: 'Test resource title',
  description: 'Test resource description 12345',
  url: 'https://www.google.com',
  img: 'profileAvatar.jpg',
  createdBy: 'Test author name',
  createdAt: '2022-08-09T09:42:25.717Z',
  updatedAt: '2023-07-09T09:42:25.717Z',
  voteCount: {
    upvote: 1,
    downvote: 0,
    total: 124,
    userVote: 1,
  },
  resourceType: 'video',
  topics: [],
  editable: true,
  isFavorite: false,
  handleAccessModal,
}

describe('CardResource component', () => {
  it('renders correctly', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)

    render(<CardResource {...mockCardResource} />)
    expect(screen.getByText('Test resource title')).toBeInTheDocument()
    expect(
      screen.getByText('Test resource description 12345')
    ).toBeInTheDocument()
    expect(screen.getByText('124')).toBeInTheDocument()
  })

  it('renders correctly when user is logged in', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Test author name',
        avatarId: 'profileAvatar.jpg',
      },
    } as TAuthContext)
    render(<CardResource {...mockCardResource} />)

    expect(screen.getByText('Test resource title')).toBeInTheDocument()
    expect(
      screen.getByText('Test resource description 12345')
    ).toBeInTheDocument()
    expect(screen.getByText('124')).toBeInTheDocument()

    const editIcon = screen.getByTestId('edit-icon')
    expect(editIcon).toBeInTheDocument()
    const favIcon = screen.getByTitle('Afegeix a preferits')
    expect(favIcon).toBeInTheDocument()
  })

  it('renders correctly when user is logged in', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Hola',
        avatarId: 'Adios',
      },
    } as TAuthContext)
    render(<CardResource {...mockCardResource} editable={false} />)

    expect(screen.getByText('Test resource title')).toBeInTheDocument()
    expect(
      screen.getByText('Test resource description 12345')
    ).toBeInTheDocument()
    expect(screen.getByText('124')).toBeInTheDocument()

    const editIcon = screen.queryByTestId('edit-icon')
    expect(editIcon).not.toBeInTheDocument()
    const favIcon = screen.getByTitle('Afegeix a preferits')
    expect(favIcon).toBeInTheDocument()
  })
})
