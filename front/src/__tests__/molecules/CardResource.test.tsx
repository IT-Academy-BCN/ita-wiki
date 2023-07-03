import { vi } from 'vitest'
import { render, screen } from '../test-utils'
import { CardResource } from '../../components/molecules'
import icons from '../../assets/icons'

describe('CardResource component', () => {
  const handleAccessModal = vi.fn()
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('renders correctly', () => {
    render(
      <CardResource
        id="resourceId1"
        title="Test resource title"
        description="Test resource description 12345"
        url="https://www.google.com"
        img={icons.profileAvatar}
        createdBy="Test author name"
        createdOn="2022-08-09T09:42:25.717Z"
        likes={124}
        handleAccessModal={handleAccessModal}
      />
    )
    expect(screen.queryByAltText('Editar recurso')).not.toBeInTheDocument()
    expect(screen.getByText('Test resource title')).toBeInTheDocument()
    expect(
      screen.getByText('Test resource description 12345')
    ).toBeInTheDocument()
    expect(screen.getByText('124')).toBeInTheDocument()
  })
})
