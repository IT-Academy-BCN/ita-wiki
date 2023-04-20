// update the test with updated data structure

import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { CategoryBlock } from '../../components/molecules'

describe('CategoryBlock component', () => {
  it('renders correctly with given props', () => {
    const defaultProps = {
      id: 1,
      img: 'test-image-url',
      category: 'Test Category',
      resources: 5,
      topics: 10,
    }

    render(
      <BrowserRouter>
        <CategoryBlock {...defaultProps} />
      </BrowserRouter>
    )

    const imgElement = screen.getByAltText('Test Category logo')
    expect(imgElement).toBeInTheDocument()

    const categoryElement = screen.getByText(defaultProps.category)
    expect(categoryElement).toBeInTheDocument()
  })
})
