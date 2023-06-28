import { fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { render, screen } from '../test-utils'
import { Category } from '../../pages'

vi.mock('react-router-dom', async () => {
  const actual: Record<number, unknown> = await vi.importActual(
    'react-router-dom'
  )
  return {
    ...actual,
    useParams: () => ({ categoryId: 1 }),
  }
})

describe('Resource', () => {
  it('renders correctly', () => {
    render(<Category />)

    expect(screen.getByTestId('category-title')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cursos' })).toBeInTheDocument()
  })

  it('modal opens and closes correctly', () => {
    render(<Category />)

    fireEvent.click(screen.getByRole('button', { name: /\+/i }))
    const modalTitle = screen.getByRole('heading', {
      name: /acceso restringido/i,
    })
    expect(modalTitle).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(modalTitle).not.toBeInTheDocument()
  })
})
