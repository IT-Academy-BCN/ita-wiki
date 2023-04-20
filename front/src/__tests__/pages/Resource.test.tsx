import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Resource } from '../../pages'

describe('Resource', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <Resource />
      </BrowserRouter>
    )

    expect(screen.getByText(/resource/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cursos' })).toBeInTheDocument()
  })

  it('modal opens and closes correctly', () => {
    render(
      <BrowserRouter>
        <Resource />
      </BrowserRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: /\+/i }))

    const modalTitle = screen.getByRole('heading', { name: /nuevo recurso/i })

    expect(modalTitle).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(modalTitle).not.toBeInTheDocument()
  })
})
