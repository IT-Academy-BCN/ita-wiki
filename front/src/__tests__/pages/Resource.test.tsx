import { fireEvent, render, screen } from '@testing-library/react'
import { Resource } from '../../pages'

describe('Resource', () => {
  it('renders correctly', () => {
    render(<Resource />)

    expect(screen.getByText(/recursos react.js/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cursos' })).toBeInTheDocument()
  })

  it('modal opens and closes correctly', () => {
    render(<Resource />)

    fireEvent.click(screen.getByRole('button', { name: /\+/i }))

    const modalTitle = screen.getByRole('heading', { name: /nuevo recurso/i })

    expect(modalTitle).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(modalTitle).not.toBeInTheDocument()
  })
})
