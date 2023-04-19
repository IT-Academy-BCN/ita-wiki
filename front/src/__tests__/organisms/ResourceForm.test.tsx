import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ResourceForm } from '../../components/organisms'

describe('ResourceForm', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <ResourceForm />
      </BrowserRouter>
    )

    expect(screen.getByLabelText(/título/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/descripción/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/url/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/tema/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/video/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/curso/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/blog/i)).toBeInTheDocument()
  })

  it('should show error message when form input is invalid', async () => {
    render(
      <BrowserRouter>
        <ResourceForm />
      </BrowserRouter>
    )

    fireEvent.change(screen.getByLabelText(/título/i), {
      target: { value: '' },
    })
    fireEvent.click(screen.getByText(/guardar/i))
    await waitFor(() =>
      expect(screen.getByText('Este campo es obligatorio')).toBeInTheDocument()
    )
  })
})
