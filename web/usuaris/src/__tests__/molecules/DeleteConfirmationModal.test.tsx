import { errorHandlers } from '../../__mocks__/handlers'
import { server } from '../../__mocks__/server'
import { DeleteConfirmationModal } from '../../components/molecules/DeleteConfirmationModal'
import { fireEvent, render, screen, waitFor } from '../test-utils'

const defaultDeleteUser = {
  open: true,
  toggleModal: vi.fn(),
  idToDelete: '1',
}

const defaultDeleteMultipleUsers = {
  open: true,
  toggleModal: vi.fn(),
  idsToDelete: ['1', '3', '4'],
}

describe('DeleteConfirmationModal', () => {
  it('renders correctly', async () => {
    render(<DeleteConfirmationModal {...defaultDeleteUser} />)

    await waitFor(() => {
      expect(
        screen.getByText('Estàs segur que vols eliminar aquest/s usuari/s?')
      ).toBeInTheDocument()
      expect(screen.getByTestId('confirm-button')).toBeInTheDocument()
      expect(screen.getByTestId('cancel-button')).toBeInTheDocument()
    })

    const cancelButton = screen.getByTestId('cancel-button')
    fireEvent.click(cancelButton)

    await waitFor(() => {
      expect(defaultDeleteUser.toggleModal).toHaveBeenCalled()
    })
  })

  it('handles successful deletion', async () => {
    render(<DeleteConfirmationModal {...defaultDeleteUser} />)

    await waitFor(() => {
      const confirmButton = screen.getByTestId('confirm-button')
      fireEvent.click(confirmButton)
    })

    await waitFor(() => {
      expect(
        screen.getByText('Usuari/s eliminat/s correctament')
      ).toBeInTheDocument()
      expect(defaultDeleteUser.toggleModal).toHaveBeenCalled()
    })
  })

  it('handles deletion error', async () => {
    server.use(...errorHandlers)
    render(<DeleteConfirmationModal {...defaultDeleteUser} />)

    await waitFor(() => {
      const confirmButton = screen.getByTestId('confirm-button')
      fireEvent.click(confirmButton)
    })

    await waitFor(() => {
      expect(
        screen.getByText(`Error en eliminar l'usuari/s`)
      ).toBeInTheDocument()
    })
  })

  it('handles multiple deletion successfully', async () => {
    render(<DeleteConfirmationModal {...defaultDeleteMultipleUsers} />)

    await waitFor(() => {
      const confirmButton = screen.getByTestId('confirm-button')
      fireEvent.click(confirmButton)
    })

    await waitFor(
      () => {
        expect(
          screen.getByText('Usuari/s eliminat/s correctament')
        ).toBeInTheDocument()

        expect(defaultDeleteMultipleUsers.toggleModal).toHaveBeenCalled()
      },
      { timeout: 5000 }
    )
  })

  it('handles multiple deletion error', async () => {
    server.use(...errorHandlers)
    render(<DeleteConfirmationModal {...defaultDeleteMultipleUsers} />)

    await waitFor(() => {
      const confirmButton = screen.getByTestId('confirm-button')
      fireEvent.click(confirmButton)
    })

    await waitFor(() => {
      expect(
        screen.getByText(`Error en eliminar l'usuari/s`)
      ).toBeInTheDocument()
    })
  })
})
