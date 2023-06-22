import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ResourceForm } from '../../components/organisms'

const queryClient = new QueryClient()

describe('ResourceForm', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ResourceForm
            selectOptions={[
              {
                value: 'cli04uxud000609k37w9phejw',
                label: 'Renderizado condicional',
              },
              { value: 'cli04ut8j000509k389fv899t', label: 'Eventos' },
            ]}
          />
        </QueryClientProvider>
      </BrowserRouter>
    )

    expect(screen.getByLabelText(/título/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/descripción/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/url/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/video/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/curso/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/blog/i)).toBeInTheDocument()
  })

  it('should show error message when form input is invalid', async () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ResourceForm
            selectOptions={[
              {
                value: 'cli04uxud000609k37w9phejw',
                label: 'Renderizado condicional',
              },
              { value: 'cli04ut8j000509k389fv899t', label: 'Eventos' },
            ]}
          />
        </QueryClientProvider>
      </BrowserRouter>
    )

    fireEvent.change(screen.getByLabelText(/título/i), {
      target: { value: '' },
    })
    fireEvent.click(screen.getByText(/crear/i))
    await waitFor(() =>
      expect(screen.getByText('Este campo es obligatorio')).toBeInTheDocument()
    )
  })
})
