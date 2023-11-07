import { expect, vi } from 'vitest'
import { fireEvent, screen, render, waitFor } from '../test-utils'
import { ResourceTitleLink } from '../../components/molecules'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import * as fetchers from '../../helpers/fetchers'

vi.mock('../../context/AuthProvider', async () => {
  const actual = (await vi.importActual(
    '../../context/AuthProvider'
  )) as typeof import('../../context/AuthProvider')
  return {
    ...actual,
    useAuth: vi.fn(() => ({
      user: null,
    })),
  }
})

vi.mock('../../helpers/fetchers', async () => {
  const actual = await vi.importActual('../../helpers/fetchers')
  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ...actual,
    updateStatus: vi.fn(),
  }
})

const user = {
  name: 'Hola',
  avatar: 'Adios',
}

const resourceTitleProps = {
  description: 'Test',
  title: 'Title Link',
  url: 'https://www.youtube.com/watch?v=n5qbzhZUMsY',
  id: 'test',
}

describe('ResourceTitleLink', () => {
  it('renders correctly', () => {
    render(<ResourceTitleLink {...resourceTitleProps} />)
    expect(screen.getByTestId('resource-title')).toBeInTheDocument()
    expect(screen.getByText('Title Link')).toBeInTheDocument()
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('should call updateStatus when the user is logged in', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user,
    } as TAuthContext)

    const spy = vi.spyOn(fetchers, 'updateStatus')

    render(<ResourceTitleLink {...resourceTitleProps} />)

    const link = screen.getByTestId('resource-title')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')

    fireEvent.click(link)

    await waitFor(() => {
      expect(spy).toHaveBeenCalled()
      expect(spy).toHaveBeenCalledWith(resourceTitleProps.id)
    })
  })

  it('should call updateStatus when the user is logged in', async () => {
    const spy = vi.spyOn(fetchers, 'updateStatus')

    render(<ResourceTitleLink {...resourceTitleProps} />)

    const link = screen.getByTestId('resource-title')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')

    fireEvent.click(link)

    await waitFor(() => {
      expect(spy).not.toHaveBeenCalled()
    })
  })
})
