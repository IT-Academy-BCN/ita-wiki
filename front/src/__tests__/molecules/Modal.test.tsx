import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { Modal } from '../../components/molecules'
import { Text } from '../../components/atoms'

describe('Modal', () => {
  const mockToggleModal = vi.fn()

  it('renders correctly', () => {
    render(
      <Modal isOpen toggleModal={mockToggleModal} title="Test Modal">
        <Text>Modal content</Text>
      </Modal>
    )

    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  it('calls toggleModal function when close icon is clicked', () => {
    render(
      <Modal isOpen toggleModal={mockToggleModal} title="Test Modal">
        <Text>Modal content</Text>
      </Modal>
    )
    const closeIcon = screen.getByRole('img')

    fireEvent.click(closeIcon)

    expect(mockToggleModal).toHaveBeenCalledTimes(1)
  })
})
