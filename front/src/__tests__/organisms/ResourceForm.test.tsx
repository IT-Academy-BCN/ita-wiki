import { vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '../test-utils'
import ResourceForm from '../../components/organisms/ResourceForm'
import { paths } from '../../constants'

const navigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual: Record<number, unknown> = await vi.importActual(
    'react-router-dom'
  )
  return {
    ...actual,
    useNavigate: vi.fn(() => navigate),
  }
})

const options = [
  {
    value: 'cli04v2l0000008mq5pwx7w5j',
    label: 'Listas',
  },
  {
    value: 'cli04uxud000609k37w9phejw',
    label: 'Renderizado condicional',
  },
  {
    value: 'cli04ut8j000509k389fv899t',
    label: 'Eventos',
  },
  {
    value: 'cli04up9q000409k3db4lcf6r',
    label: 'UseState & useEffect',
  },
  {
    value: 'cli04ukio000309k3eqr02v4s',
    label: 'Components',
  },
]

describe('ResourceForm', () => {
  it('renders correctly', () => {
    render(<ResourceForm selectOptions={options} />)

    expect(screen.getByLabelText(/título/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/descripción/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/url/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/video/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/curso/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/blog/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/tema/i)).toBeInTheDocument()
  })

  it('should show error message when form input is invalid', async () => {
    render(<ResourceForm selectOptions={options} />)

    fireEvent.change(screen.getByLabelText(/título/i), {
      target: { value: '' },
    })
    fireEvent.click(screen.getByText(/crear/i))
    await waitFor(() =>
      expect(screen.getByText('Este campo es obligatorio')).toBeInTheDocument()
    )
  })

  it('should correctly submit the form when all fields requested are complete', async () => {
    render(<ResourceForm selectOptions={options} />)

    const titleInput = screen.getByLabelText(/título/i) as HTMLInputElement

    fireEvent.change(titleInput, { target: { value: 'TEST TITLE' } })
    expect(titleInput.value).toBe('TEST TITLE')

    fireEvent.change(screen.getByLabelText(/descripción/i), {
      target: { value: 'TESTING DESCRIPTION' },
    })

    fireEvent.change(screen.getByLabelText(/url/i), {
      target: { value: 'https://dev.itadirectory.eurecatacademy.org/' },
    })

    fireEvent.change(screen.getByLabelText(/tema/i), {
      target: { value: 'cli04uxud000609k37w9phejw' },
    })
    expect(
      screen.getByDisplayValue('Renderizado condicional')
    ).toBeInTheDocument()

    const videoRadio = screen.getByLabelText(/video/i)
    fireEvent.click(videoRadio)

    const button = screen.getByText(/crear/i)
    fireEvent.click(button)
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith(paths.home)
    })
  })

  // TODO: Fix when error case onError is definedw ithin the ResourceForm component
  it.skip('should show an error if the POST request fails', async () => {
    render(<ResourceForm selectOptions={options} />)
  })

  it('should submit the form for updating a resource when initialValues is provided', async () => {
    const initialValues = {
      title: 'Initial Title',
      description: 'Initial Description',
      url: 'https://example.com',
      topics: ['cli04v2l0000008mq5pwx7w5j'],
      topicId: 'cli04v2l0000008mq5pwx7w5j',
      resourceType: 'VIDEO',
      userEmail: 'test@example.com',
    }
    const resourceId = 'resource-id'

    render(
      <ResourceForm
        selectOptions={options}
        initialValues={initialValues}
        resourceId={resourceId}
      />
    )
    const titleInput = screen.getByLabelText(/título/i) as HTMLInputElement

    fireEvent.change(titleInput, { target: { value: 'Updated Title' } })
    expect(titleInput.value).toBe('Updated Title')

    fireEvent.change(screen.getByLabelText(/descripción/i), {
      target: { value: 'Updated Description' },
    })

    fireEvent.change(screen.getByLabelText(/url/i), {
      target: { value: 'https://updated-example.com' },
    })

    fireEvent.change(screen.getByLabelText(/tema/i), {
      target: { value: 'cli04uxud000609k37w9phejw' },
    })
    expect(
      screen.getByDisplayValue('Renderizado condicional')
    ).toBeInTheDocument()

    const button = screen.getByText(/editar/i)
    fireEvent.click(button)
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith(paths.home)
    })
  })
  it('should show error message when updating a resource with invalid input', async () => {
    const initialValues = {
      title: 'Initial Title',
      description: 'Initial Description',
      url: 'https://example.com',
      topics: ['cli04v2l0000008mq5pwx7w5j'],
      topicId: 'cli04v2l0000008mq5pwx7w5j',
      resourceType: 'VIDEO',
      userEmail: 'test@example.com',
    }
    const resourceId = 'resource-id'

    render(
      <ResourceForm
        selectOptions={options}
        initialValues={initialValues}
        resourceId={resourceId}
      />
    )

    fireEvent.change(screen.getByLabelText(/título/i), {
      target: { value: '' },
    })
    fireEvent.click(screen.getByText(/editar/i))
    await waitFor(() =>
      expect(screen.getByText('Este campo es obligatorio')).toBeInTheDocument()
    )
  })
})
