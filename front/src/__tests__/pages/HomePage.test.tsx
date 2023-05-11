import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Home } from '../../pages'

describe('Test HomePage', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
  })
})
