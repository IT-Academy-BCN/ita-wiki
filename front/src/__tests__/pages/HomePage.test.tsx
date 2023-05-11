import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Home } from '../../pages'
import { queryClient } from '../setup'
import { QueryClientProvider } from '@tanstack/react-query'

describe('Test HomePage', () => {
  it('renders correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </QueryClientProvider>
    )
  })
})
