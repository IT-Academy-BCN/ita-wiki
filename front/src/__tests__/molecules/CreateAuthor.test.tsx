import { render, screen } from '@testing-library/react'
import { CreateAuthor } from '../../components/molecules'
import icons from '../../assets/icons'

describe('CreateAuthor', () => {
  it('renders correctly', () => {
    const createdBy = 'Author'
    const createdOn = '2022-08-09T09:42:25.717Z'
    render(
      <CreateAuthor
        img={icons.profileAvatar}
        createdBy={createdBy}
        createdOn={createdOn}
      />
    )

    const res = `${createdBy}, ${new Date(createdOn).toLocaleDateString(
      'es-ES',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    )}`

    expect(screen.getByAltText('Author icon')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', icons.profileAvatar)
    expect(screen.getByText(res)).toBeInTheDocument()
  })
})
