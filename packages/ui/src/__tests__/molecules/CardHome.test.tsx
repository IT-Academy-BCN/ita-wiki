import { screen, render } from '@testing-library/react'
import { CardHome } from '../../components/molecules'

describe('CardHome', () => {
  it('Renders correctly', () => {
    render(
      <CardHome
        cardTitle="Test title"
        cardSubtitle="Test subtitle"
        icon="Test icon"
        indicator="/test"
        backgroundImg="test.png"
      />
    )
    expect(screen.getAllByText('Test title')[0]).toBeInTheDocument()
    expect(screen.getByText('Test subtitle')).toBeInTheDocument()
    expect(screen.getByText('/test')).toBeInTheDocument()
    expect(screen.getByTestId('testIcon')).toBeInTheDocument()
  })
})
