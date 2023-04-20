// update the test with updated data structure

import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { CategoriesList } from '../../components/organisms'

describe('CategoriesList', () => {
  const categoriesMock = [
    {
      id: 1,
      category: 'Category 1',
      resources: 10,
      topics: 5,
      img: 'image1.jpg',
    },
    {
      id: 2,
      category: 'Category 2',
      resources: 8,
      topics: 3,
      img: 'image2.jpg',
    },
  ]
  it('renders CategoriesList component with title and categories', () => {
    render(
      <BrowserRouter>
        <CategoriesList categories={categoriesMock} />
      </BrowserRouter>
    )

    expect(screen.getByText('Categorías')).toBeInTheDocument()
    expect(screen.getByText('Category 1')).toBeInTheDocument()
    expect(screen.getByText('Category 2')).toBeInTheDocument()
  })
})
