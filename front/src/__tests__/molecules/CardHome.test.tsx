import { screen } from '@testing-library/react'
import { render } from '../test-utils'
import { CardHome } from '../../components/molecules'

describe('CardHome', () => {
  it('Renders correctly', () => {
    render(
      <CardHome
        cardTitle="Test title"
        cardSubtitle="Test subtitle"
        icon="Test icon"
        indicator="/test"
      />
    )
    expect(screen.getByText('Test title')).toBeInTheDocument()
    expect(screen.getByText('Test subtitle')).toBeInTheDocument()
    expect(screen.getByText('/test')).toBeInTheDocument()
    expect(screen.getByTestId('testIcon')).toBeInTheDocument()
  })
})
