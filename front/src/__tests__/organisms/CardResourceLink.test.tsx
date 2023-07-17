import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { CardResourceLink } from '../../components/organisms/CardResourceLink'

describe('ResourceTitleLink', () => {
  const url = 'https://www.youtube.com/watch?v=n5qbzhZUMsY'

  it('renders correctly', async () => {
    render(
      <BrowserRouter>
        <CardResourceLink
          description="Test"
          title="Title Link"
          url={url}
          createdBy="John Doe"
          createdAt="2022-01-01"
          img="image.png"
          id="1"
          likes={10}
          updatedAt="2022-01-02"
          editable={false}
          handleAccessModal={() => {}}
          resourceType="BLOG"
          topics={[]}
        />
      </BrowserRouter>
    )
  })

  it('should opens the link in a new browser tab', () => {
    render(
      <BrowserRouter>
        <CardResourceLink
          description="Test"
          title="Title Link"
          url={url}
          createdBy="John Doe"
          createdAt="2022-01-01"
          img="image.png"
          id="1"
          likes={10}
          updatedAt="2022-01-02"
          editable={false}
          handleAccessModal={() => {}}
          resourceType="BLOG"
          topics={[]}
        />
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
