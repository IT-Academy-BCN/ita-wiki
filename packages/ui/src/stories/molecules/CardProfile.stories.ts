import type { Meta, StoryObj } from '@storybook/react'
import { CardProfile } from '../../components/molecules'
import logoutSvg from '../assets/logout.svg'
import profileAvatar from '../assets/profile-avatar.svg'

const meta = {
  title: 'Molecules/CardProfile',
  component: CardProfile,

  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {
    userData: {
      profilePicture: { control: 'string' },
      noProfilePictureAlt: { control: 'string' },
      userName: { control: 'string' },
      userEmail: { control: 'string' },
    },
    counterData: [
      {
        number: { control: 'number' },
        text: { control: 'string' },
        icon: { control: 'string' },
        isError: { control: 'boolean' },
        errorMessage: { control: 'string' },
      },
    ],
    logoutData: {
      logoutIcon: { control: 'string' },
      altLogout: { control: 'string' },
      handleLogOut: { control: 'function' },
      logoutMsg: { control: 'string' },
    },
  },
} satisfies Meta<typeof CardProfile>

export default meta
type CardProfileStory = StoryObj<typeof CardProfile>

export const Default: CardProfileStory = {
  args: {
    userData: {
      profilePicture: '',
      noProfilePictureAlt: '',
      userName: '',
      userEmail: '',
    },
    counterData: [
      {
        number: 1,
        text: '',
        icon: '',
        isError: false,
        errorMessage: '',
      },
    ],
    logoutData: {
      logoutIcon: '',
      altLogout: '',
      handleLogOut: () => {},
      logoutMsg: '',
    },
  },
}

export const WithImgs: CardProfileStory = {
  args: {
    userData: {
      profilePicture: profileAvatar,
      noProfilePictureAlt: 'no user image',
      userName: 'UserTest',
      userEmail: 'UserTest@itawiki.com',
    },
    counterData: [
      {
        number: 3,
        text: 'Aportaciones',
        icon: 'attach_file',
        isError: false,
        errorMessage: 'n/d',
      },
    ],
    logoutData: {
      logoutIcon: logoutSvg,
      altLogout: 'logout icon',
      handleLogOut: () => {},
      logoutMsg: 'Log out',
    },
  },
}

export const WithErrors: CardProfileStory = {
  args: {
    userData: {
      profilePicture: '',
      noProfilePictureAlt: 'no user image',
      userName: 'UserTest',
      userEmail: 'UserTest@itawiki.com',
    },
    counterData: [
      {
        number: 3,
        text: 'Aportaciones',
        icon: 'attach_file',
        isError: true,
        errorMessage: 'n/d',
      },
    ],
    logoutData: {
      logoutIcon: logoutSvg,
      altLogout: 'logout icon',
      handleLogOut: () => {},
      logoutMsg: 'Log out',
    },
  },
}
