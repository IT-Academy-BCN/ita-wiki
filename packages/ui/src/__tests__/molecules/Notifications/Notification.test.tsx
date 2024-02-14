import { render, screen } from '@testing-library/react'
import { Notification } from '../../../components/molecules/Notifications/Notification'
import { colors } from '../../../styles'

describe('Notification', () => {
  it('Renders correctly', () => {
    render(
      <Notification
        id="testId"
        title="title"
        description="description"
        variant="success"
      />
    )

    expect(screen.getByText('title')).toBeInTheDocument()
    expect(screen.getByText('description')).toBeInTheDocument()
    expect(screen.getByTestId('notification-test')).toHaveStyle(
      `background-color: ${colors.success}`
    )
  })

  it('Renders correctly with variant info', () => {
    render(
      <Notification
        id="testId"
        title="title"
        description="description"
        variant="info"
      />
    )
    expect(screen.getByTestId('notification-test')).toHaveStyle(
      `background-color: ${colors.info}`
    )
  })

  it('Renders correctly with variant warning', () => {
    render(
      <Notification
        id="testId"
        title="title"
        description="description"
        variant="warning"
      />
    )
    expect(screen.getByTestId('notification-test')).toHaveStyle(
      `background-color: ${colors.warning}`
    )
  })

  it('Renders correctly with variant error', () => {
    render(
      <Notification
        id="testId"
        title="title"
        description="description"
        variant="error"
      />
    )
    expect(screen.getByTestId('notification-test')).toHaveStyle(
      `background-color: ${colors.error}`
    )
  })
})
