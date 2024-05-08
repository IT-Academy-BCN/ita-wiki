import { errorHandlers } from '../../__mocks__/handlers'
import { server } from '../../__mocks__/server'
import { DeleteConfirmationModal } from '../../components/molecules/DeleteConfirmationModal'
import { fireEvent, render, screen, waitFor } from '../test-utils'

const defaultProps = {
  open: true,
  toggleModal: vi.fn(),
  idToDelete: '1',
}

describe('DeleteConfirmationModal', () => {
  it('renders correctly', async () => {
    render(<DeleteConfirmationModal {...defaultProps} />)

    await waitFor(() => {
      expect(
        screen.getByText('Estàs segur que vols eliminar aquest usuari?')
      ).toBeInTheDocument()
      expect(screen.getByTestId('confirm-button')).toBeInTheDocument()
      expect(screen.getByTestId('cancel-button')).toBeInTheDocument()
    })

    const cancelButton = screen.getByTestId('cancel-button')
    fireEvent.click(cancelButton)

    await waitFor(() => {
      expect(defaultProps.toggleModal).toHaveBeenCalled()
    })
  })

  it('handles successful deletion', async () => {
    render(<DeleteConfirmationModal {...defaultProps} />)

    await waitFor(() => {
      const confirmButton = screen.getByTestId('confirm-button')
      fireEvent.click(confirmButton)
    })

    await waitFor(() => {
      expect(
        screen.getByText('Usuario eliminado correctamente')
      ).toBeInTheDocument()
      expect(defaultProps.toggleModal).toHaveBeenCalled()
    })
  })

  it('handles deletion error', async () => {
    server.use(...errorHandlers)
    render(<DeleteConfirmationModal {...defaultProps} />)

    await waitFor(() => {
      const confirmButton = screen.getByTestId('confirm-button')
      fireEvent.click(confirmButton)
    })

    await waitFor(() => {
      expect(
        screen.getByText(/Error en eliminar l'usuari/i)
      ).toBeInTheDocument()
    })
  })
})
