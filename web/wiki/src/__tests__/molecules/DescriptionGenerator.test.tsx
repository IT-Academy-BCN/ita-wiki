import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../test-utils'
import { DescriptionGenerator } from '../../components/molecules'
import { useGenerateDescription } from '../../hooks'

const mocks = vi.hoisted(() => ({
  useGenerateDescription: vi.fn(),
}))

vi.mock('../../hooks', () => ({
  useGenerateDescription: mocks.useGenerateDescription,
}))

describe('DescriptionGenerator', () => {
  const setDescriptionMock = vi.fn()
  const mutateMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useGenerateDescription).mockReturnValue({
      mutate: mutateMock,
    } as any)
  })

  it('renders correctly', () => {
    render(<DescriptionGenerator setDescription={setDescriptionMock} />)

    expect(screen.getByTestId('description-generator-text')).toHaveTextContent(
      'Para generar una descripción con IA, rellena título, URL y tema.'
    )
    expect(screen.getByTestId('description-generator-button')).toBeDisabled()
  })

  it('enables the button when all required fields are provided', () => {
    render(
      <DescriptionGenerator
        title="Test Title"
        url="https://example.com"
        topic="Test Topic"
        setDescription={setDescriptionMock}
      />
    )

    const button = screen.getByTestId('description-generator-button')
    expect(button).not.toBeDisabled()
  })

  it('calls generateDescription.mutate with the correct parameters when clicked', async () => {
    render(
      <DescriptionGenerator
        title="Test Title"
        url="https://example.com"
        topic="Test Topic"
        setDescription={setDescriptionMock}
      />
    )

    const button = screen.getByTestId('description-generator-button')
    fireEvent.click(button)

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith({
        title: 'Test Title',
        url: 'https://example.com',
        topic: 'Test Topic',
        language: 'es',
      })
    })
  })

  it('does not call generateDescription.mutate when required fields are missing', async () => {
    render(
      <DescriptionGenerator
        title=""
        url="https://example.com"
        topic="Test Topic"
        setDescription={setDescriptionMock}
      />
    )

    const button = screen.getByTestId('description-generator-button')
    fireEvent.click(button)

    await waitFor(() => {
      expect(mutateMock).not.toHaveBeenCalled()
    })
  })

  it('calls setDescription on success', async () => {
    const onSuccess = (description: string) => {
      setDescriptionMock(description)
    }

    const mutateMockSuccess = vi.fn(() => onSuccess('Generated Description'))
    vi.mocked(useGenerateDescription).mockReturnValue({
      mutate: mutateMockSuccess,
    } as any)

    render(
      <DescriptionGenerator
        title="Test Title"
        url="https://example.com"
        topic="Test Topic"
        setDescription={setDescriptionMock}
      />
    )

    const button = screen.getByTestId('description-generator-button')
    fireEvent.click(button)

    await waitFor(() => {
      expect(setDescriptionMock).toHaveBeenCalledWith('Generated Description')
    })
  })
})
