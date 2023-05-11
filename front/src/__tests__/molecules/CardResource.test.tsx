import { screen } from '@testing-library/react'
import { render } from '../test-utils'
import { CardResource } from '../../components/molecules'
import icons from '../../assets/icons'

describe('CardResource component', () => {
  it('renders correctly', () => {
    render(
      <CardResource
        key="resourceId1"
        title="Test resource title"
        description="Test resource description 12345"
        url="https://www.google.com"
        img={icons.profileAvatar}
        createdBy="Test author name"
        createdOn="2022-08-09T09:42:25.717Z"
      />
    )
    expect(screen.queryByAltText('Editar recurso')).not.toBeInTheDocument()
    expect(screen.getByText('Test resource title')).toBeInTheDocument()
    expect(
      screen.getByText('Test resource description 12345')
    ).toBeInTheDocument()
  })
})
