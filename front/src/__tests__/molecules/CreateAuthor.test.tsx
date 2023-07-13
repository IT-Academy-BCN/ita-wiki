import { render, screen } from '@testing-library/react'
import { CreateAuthor } from '../../components/molecules'
import icons from '../../assets/icons'

const dateFormatOption: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

describe('CreateAuthor', () => {
  it('renders correctly', () => {
    const createdBy = 'Author'
    const updatedOn = '2022-08-09T09:42:25.717Z'
    render(
      <CreateAuthor
        img={icons.profileAvatar}
        createdBy={createdBy}
        updatedOn={updatedOn}
      />
    )

    const metaInfo = `${createdBy}, ${new Date(updatedOn).toLocaleDateString(
      'es-ES',
      dateFormatOption
    )}`

    expect(screen.getByRole('img')).toHaveAttribute('src', icons.profileAvatar)
    expect(screen.getByAltText('Author icon')).toBeInTheDocument()
    expect(screen.getByText(metaInfo)).toBeInTheDocument()
  })

  it('Renders a user image if the prop img is not undefined', () => {
    const createdBy = 'Author'
    const updatedOn = '2022-08-09T09:42:25.717Z'
    render(
      <CreateAuthor
        img={icons.profileAvatar}
        createdBy={createdBy}
        updatedOn={updatedOn}
      />
    )

    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it("Renders a '😺' emoji if the image prop is undefined", () => {
    const createdBy = 'Author'
    const updatedOn = '2022-08-09T09:42:25.717Z'
    render(
      <CreateAuthor
        img={undefined}
        createdBy={createdBy}
        updatedOn={updatedOn}
      />
    )

    expect(screen.getByText('😺')).toBeInTheDocument()
  })
})
