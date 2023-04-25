import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ResourceTitleLink } from '../../components/molecules'

describe('ResourceTitleLink', () => {
  const url = 'https://www.youtube.com/watch?v=n5qbzhZUMsY'

  it('renders correctly', async () => {
    render(
      <BrowserRouter>
        <ResourceTitleLink description="Test" title="Title Link" url={url} />
      </BrowserRouter>
    )
  })

  it('should opens the link in a new browser tab', () => {
    render(
      <BrowserRouter>
        <ResourceTitleLink description="Test" title="Title Link" url={url} />
      </BrowserRouter>
    )

    fireEvent.click(screen.getByRole('link'))

    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank')
    expect(screen.getByRole('link')).toHaveAttribute(
      'rel',
      'noopener noreferrer'
    )
  })
})
