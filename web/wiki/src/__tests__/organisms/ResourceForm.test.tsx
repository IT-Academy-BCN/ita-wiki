import { vi } from 'vitest'
import { useLocation } from 'react-router-dom'
import { fireEvent, render, screen, waitFor } from '../test-utils'
import { ResourceForm } from '../../components/organisms'
import { reloadPage } from '../../utils/navigation'
import { errorHandlers } from '../../__mocks__/handlers'
import { server } from '../../__mocks__/server'

const reload = vi.fn(() => reloadPage)

vi.mock('../utils/navigation', async () => {
  const actual: Record<number, unknown> = await vi.importActual(
    '../../utils/navigation'
  )
  return {
    ...actual,
    reloadPage: reload,
  }
})

beforeEach(() => {
  vi.mock('react-router-dom', async () => {
    const actual: Record<number, unknown> = await vi.importActual(
      'react-router-dom'
    )
    return {
      ...actual,
      useLocation: vi.fn(),
    }
  })
})

afterEach(() => {
  vi.restoreAllMocks()
  server.resetHandlers()
})

afterAll(() => server.close())

const options = [
  {
    value: 'cli04v2l0000008mq5pwx7w5j',
    label: 'Listas',
    id: 'cli04v2l0000008mq5pwx7w5j',
  },
  {
    value: 'cli04uxud000609k37w9phejw',
    label: 'Renderizado condicional',
    id: 'cli04uxud000609k37w9phejw',
  },
  {
    value: 'cli04ut8j000509k389fv899t',
    label: 'Eventos',
    id: 'cli04ut8j000509k389fv899t',
  },
  {
    value: 'cli04up9q000409k3db4lcf6r',
    label: 'UseState & useEffect',
    id: 'cli04up9q000409k3db4lcf6r',
  },
  {
    value: 'cli04ukio000309k3eqr02v4s',
    label: 'Components',
    id: 'cli04ukio000309k3eqr02v4s',
  },
]

const initialValues = {
  id: 'resource-id',
  title: 'Initial Title',
  description: 'Initial Description',
  url: 'https://example.com',
  topicId: 'cli04v2l0000008mq5pwx7w5j',
  resourceType: 'VIDEO',
}

const resourceId = 'resource-id'

describe('ResourceForm', () => {
  it('renders correctly', () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: '',
      state: { name: 'React', id: 'cln1er1vn000008mk79bs02c5' },
    }) as unknown as Location
    render(<ResourceForm selectOptions={options} />)

    expect(screen.getByLabelText(/títol/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/descripció/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/url/i)).toBeInTheDocument()
    expect(screen.getByTestId('resourceType')).toBeInTheDocument()
    expect(screen.getByTestId('resourceTopic')).toBeInTheDocument()

    expect(screen.getByText(/crear/i)).toBeInTheDocument()
  })

  it('renders correctly on edit resource with initial values', () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: '',
      state: { name: 'React', id: 'cln1er1vn000008mk79bs02c5' },
    }) as unknown as Location

    render(
      <ResourceForm selectOptions={options} initialValues={initialValues} />
    )

    expect(screen.getByDisplayValue('Initial Title')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Initial Description')).toBeInTheDocument()
    expect(screen.getByDisplayValue('https://example.com')).toBeInTheDocument()
    expect(screen.getByDisplayValue('VIDEO')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Listas')).toBeInTheDocument()
  })

  it('should show error message when form input is invalid', async () => {
    render(<ResourceForm selectOptions={options} />)

    fireEvent.change(screen.getByLabelText(/títol/i), {
      target: { value: '' },
    })
    fireEvent.click(screen.getByText(/crear/i))
    await waitFor(() =>
      expect(screen.getAllByText('Aquest camp és obligatori')).toHaveLength(2)
    )
  })

  it('should correctly submit the form when all fields requested are complete', async () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: '',
      state: { name: 'React', id: 'cln1er1vn000008mk79bs02c5' },
    }) as unknown as Location
    render(<ResourceForm selectOptions={options} />)

    const titleInput = screen.getByLabelText(/títol/i) as HTMLInputElement

    fireEvent.change(titleInput, { target: { value: 'TEST TITLE' } })

    const descriptionInput = screen.getByLabelText(
      /descripció/i
    ) as HTMLInputElement
    fireEvent.change(descriptionInput, {
      target: { value: 'TESTING DESCRIPTION' },
    })
    const urlInput = screen.getByLabelText(/url/i) as HTMLInputElement
    fireEvent.change(urlInput, {
      target: { value: 'https://dev.itawiki.eurecatacademy.org/' },
    })

    const temaSelect = screen.getByLabelText(/tema/i) as HTMLSelectElement
    fireEvent.change(temaSelect, {
      target: { value: 'cli04uxud000609k37w9phejw' },
    })

    const videoRadio = screen.getByLabelText('Video') as HTMLInputElement
    fireEvent.click(videoRadio)

    const button = screen.getByText(/crear/i)
    fireEvent.click(button)

    await waitFor(() => {
      expect(titleInput.value).toBe('TEST TITLE')
      expect(descriptionInput.value).toBe('TESTING DESCRIPTION')
      expect(urlInput.value).toBe('https://dev.itawiki.eurecatacademy.org/')
      expect(temaSelect.value).toBe('cli04uxud000609k37w9phejw')
      expect(videoRadio).toBeChecked()

      expect(button).toBeEnabled()
    })

    await waitFor(() => {
      expect(screen.getByTestId('done-icon')).toBeInTheDocument()
    })
  })

  it('should show an error if the POST request fails', async () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: '',
      state: { name: 'React', id: 'cln1er1vn000008mk79bs02c5' },
    }) as unknown as Location

    server.use(...errorHandlers)

    render(<ResourceForm selectOptions={options} />)

    fireEvent.change(screen.getByLabelText(/títol/i), {
      target: { value: 'Title' },
    })
    fireEvent.change(screen.getByLabelText(/descripció/i), {
      target: { value: 'Description text' },
    })
    fireEvent.change(screen.getByLabelText(/url/i), {
      target: { value: 'https://repeatedUrl/' },
    })
    const temaSelect = screen.getByTestId('resourceTopic') as HTMLSelectElement
    fireEvent.change(temaSelect, {
      target: { value: 'cli04uxud000609k37w9phejw' },
    })
    const blogRadio = screen.getByLabelText('Blog') as HTMLInputElement
    fireEvent.click(blogRadio)

    fireEvent.click(screen.getByRole('button', { name: 'Crear' }))

    await waitFor(() =>
      expect(screen.getByTestId('error-message')).toBeInTheDocument()
    )
    expect(
      screen.getByText(
        'Aquest recurs ja existeix. Si us plau, introdueix un recurs diferent.'
      )
    ).toBeInTheDocument()

    expect(screen.queryByTestId('done-icon')).not.toBeInTheDocument()
  })

  it('should show an error if the PATCH request fails', async () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: '',
      state: { name: 'React', id: 'cln1er1vn000008mk79bs02c5' },
    }) as unknown as Location

    server.use(...errorHandlers)

    render(
      <ResourceForm
        selectOptions={options}
        initialValues={initialValues}
        resourceId={resourceId}
      />
    )

    fireEvent.change(screen.getByLabelText(/títol/i), {
      target: { value: 'Edited Title' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Edita' }))

    await waitFor(() =>
      expect(screen.getByTestId('error-message')).toBeInTheDocument()
    )

    expect(
      screen.getByText(
        'Error en la base de dades. Per favor, intenta-ho més tard.'
      )
    ).toBeInTheDocument()

    expect(screen.queryByTestId('done-icon')).not.toBeInTheDocument()
  })

  it('should submit the form for updating a resource when initialValues is provided', async () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: '',
      state: { name: 'React', id: 'cln1er1vn000008mk79bs02c5' },
    }) as unknown as Location

    render(
      <ResourceForm
        selectOptions={options}
        initialValues={initialValues}
        resourceId={resourceId}
      />
    )
    const titleInput = screen.getByLabelText(/títol/i) as HTMLInputElement

    fireEvent.change(titleInput, { target: { value: 'Updated Title' } })
    expect(titleInput.value).toBe('Updated Title')

    fireEvent.change(screen.getByLabelText(/descripció/i), {
      target: { value: 'Updated Description' },
    })

    fireEvent.change(screen.getByLabelText(/url/i), {
      target: { value: 'https://updated-example.com' },
    })

    const temaSelect = screen.getByLabelText(/tema/i) as HTMLSelectElement
    fireEvent.change(temaSelect, { target: { value: initialValues.topicId } })

    const button = screen.getByTestId('submit-button')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByTestId('done-icon')).toBeInTheDocument()
    })
  })

  it('should show error message when updating a resource with invalid input', async () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: '',
      state: { name: 'React', id: 'cln1er1vn000008mk79bs02c5' },
    }) as unknown as Location

    render(
      <ResourceForm
        selectOptions={options}
        initialValues={initialValues}
        resourceId={resourceId}
      />
    )

    fireEvent.change(screen.getByLabelText(/títol/i), {
      target: { value: '' },
    })

    const button = screen.getByTestId('submit-button')
    fireEvent.click(button)

    await waitFor(() =>
      expect(screen.getByText('Aquest camp és obligatori')).toBeInTheDocument()
    )
  })
})
