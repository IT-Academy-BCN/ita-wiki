import { render, screen } from '@testing-library/react'
import { TUserButton, UserButton } from '../../components/molecules'
import { TUser } from '../../components/molecules/UserButton'

describe('UserButton', () => {
  const testUser: TUser = {
    name: 'Test User',
    avatarId: 'test',
    role: 'ADMIN',

  }
  it('should render with given props', () => {
    const testUserButtonProps: TUserButton = {
      onClick: () => null,
      user: testUser,
      children: 'Test Children'
    }
    render(<UserButton {...testUserButtonProps} />)

    const userButtonElement = screen.getByText('Test Children')
    expect(userButtonElement).toBeInTheDocument()

    const userProp = testUserButtonProps.user
    expect(userProp).toBeDefined()
    expect(testUser?.role).toBe('ADMIN')
  })
})
