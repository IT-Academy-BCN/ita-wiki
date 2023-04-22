import { render } from '@testing-library/react'
import { AvatarInfo } from '../../components/molecules/AvatarInfo'
import icons from '../../assets/icons'

describe('AvatarInfo', () => {
  it('renders correctly', () => {
    render(
      <AvatarInfo
        img={icons.profileAvatar}
        createdOn="2022-08-09T09:42:25.717Z"
        createdBy="Avatar Test"
      />
    )
  })
})
