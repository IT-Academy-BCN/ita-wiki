import { vi } from 'vitest'
import { render, screen } from '../test-utils'
import { CardResource, TCardResource } from '../../components/molecules'
import icons from '../../assets/icons'

describe('CardResource component', () => {
  const handleAccessModal = vi.fn()
  afterEach(() => {
    vi.restoreAllMocks()
  })
  const mockCardResource: TCardResource = {
    id: 'resourceId1',
    title: 'Test resource title',
    description: 'Test resource description 12345',
    url: 'https://www.google.com',
    img: icons.profileAvatar,
    createdBy: 'Test author name',
    createdOn: '2022-08-09T09:42:25.717Z',
    likes: 124,
    resourceType: 'video',
    topics: [],
    editable: true,
    handleAccessModal,
  }
  it('renders correctly', () => {
    render(<CardResource {...mockCardResource} />)
    expect(screen.getByText('Test resource title')).toBeInTheDocument()
    expect(
      screen.getByText('Test resource description 12345')
    ).toBeInTheDocument()
    expect(screen.getByText('124')).toBeInTheDocument()

    const editIcon = screen.getByTestId('edit-icon')
    expect(editIcon).toBeInTheDocument()
  })
})
