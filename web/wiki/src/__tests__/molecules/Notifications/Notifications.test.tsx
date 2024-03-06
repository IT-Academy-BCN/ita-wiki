import { screen } from '@testing-library/react'
import { Notifications } from '../../../components/molecules/Notifications'
import { render } from '../../test-utils'

describe('Notifications', () => {
  it('Renders correctly without notifications', () => {
    render(<Notifications />)
  })
  expect(screen.queryByTestId('notifications-test')).toBeNull()
})
