import { render, screen } from '../test-utils'
import { CategoryBlock } from '../../components/molecules'

describe('CategoryBlock component', () => {
  it('renders correctly with given props', () => {
    const defaultProps = {
      slug: 'slug',
      img: 'test-image-url',
      name: 'Test Category',
      resources: 5,
      topics: 10,
    }

    render(<CategoryBlock {...defaultProps} />)
    const category = screen.getByTestId('categoryBlock')
    expect(category).toHaveAttribute('href', '/category/slug')
    const name = screen.getByText(defaultProps.name)
    expect(name).toBeInTheDocument()
  })
})
