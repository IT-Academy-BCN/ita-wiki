import { render, screen, fireEvent } from '../test-utils'
import { CardResourceLink } from '../../components/organisms/CardResourceLink'

const voteCount = {
  upvote: 1,
  downvote: 0,
  total: 0,
  userVote: 1,
}

describe('ResourceTitleLink', () => {
  const url = 'https://www.youtube.com/watch?v=n5qbzhZUMsY'

  it('renders correctly', async () => {
    render(
      <CardResourceLink
        description="Test"
        title="Title Link"
        url={url}
        createdBy="John Doe"
        createdAt="2022-01-01"
        img="image.png"
        id="1"
        voteCount={voteCount}
        updatedAt="2022-01-02"
        editable={false}
        handleAccessModal={() => {}}
        resourceType="BLOG"
        topics={[]}
        isFavorite={false}
      />
    )
  })

  it('should opens the link in a new browser tab', () => {
    render(
      <CardResourceLink
        description="Test"
        title="Title Link"
        url={url}
        createdBy="John Doe"
        createdAt="2022-01-01"
        img="image.png"
        id="1"
        voteCount={voteCount}
        updatedAt="2022-01-02"
        editable={false}
        handleAccessModal={() => {}}
        resourceType="BLOG"
        topics={[]}
        isFavorite={false}
      />
    )

    fireEvent.click(screen.getByRole('link'))

    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank')
    expect(screen.getByRole('link')).toHaveAttribute(
      'rel',
      'noopener noreferrer'
    )
  })
})
