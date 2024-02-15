import { FC } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Notifications,
  NotificationsProvider,
  useNotifications,
} from '../../../components/molecules'
import { Button } from '../../../components/atoms'
import { FlexBox } from '../../../styles'
import { TNotification } from '../../../components/molecules/Notifications/types'

const meta: Meta = {
  title: 'Molecules/Notifications',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'], // Ensure your Storybook version supports 'tags' in Meta, or you might need to remove this
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
    autoClose: { control: 'boolean' },
    autoCloseTimeOut: { control: 'number' },
  },
}

export default meta
type NotificationsContentStory = StoryObj<typeof meta>

const AddNotificationButton: FC<{
  variant: TNotification['variant']
  autoClose: boolean
  autoCloseTimeOut: number
}> = ({ variant, autoClose, autoCloseTimeOut }) => {
  const { addNotification } = useNotifications()

  const handleAddNotification = () => {
    addNotification({
      title: 'Notification title',
      description: 'Notification message',
      variant,
      autoClose,
      autoCloseTimeOut,
    })
  }

  return <Button onClick={handleAddNotification}>Add notification</Button>
}

export const Default: NotificationsContentStory = {
  args: {
    variant: 'success',
    autoClose: true,
    autoCloseTimeOut: 5000,
  },
  render: ({ variant, autoClose, autoCloseTimeOut }) => (
    <NotificationsProvider>
      <FlexBox direction="column" justify="center" align="center">
        <Notifications />
        <AddNotificationButton
          variant={variant}
          autoClose={autoClose}
          autoCloseTimeOut={autoCloseTimeOut}
        />
      </FlexBox>
    </NotificationsProvider>
  ),
  parameters: {
    docs: {
      // Use the `source` parameter to customize the code block
      source: {
        code: `
<NotificationsProvider>
  <FlexBox direction="column" justify="center" align="center">
    <Notifications />
      <AddNotificationButton
        variant={variant}
        autoClose={autoClose}
        autoCloseTimeOut={autoCloseTimeOut}
    />
  </FlexBox>
</NotificationsProvider>

// Within 'AddNotificationButton' component
const { addNotification } = useNotifications()

const handleAddNotification = () => {
  addNotification({
    title: 'Notification title',
    description: 'Notification message',
    variant: 'success',
    autoClose: true,
    autoCloseTimeOut: 5000,
  });
};
`,
        language: 'jsx',
      },
    },
  },
}
