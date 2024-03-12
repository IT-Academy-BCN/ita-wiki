import type { Meta, StoryObj } from '@storybook/react'
import { CardProfile } from '../../../components/molecules'
import profileAvatar from './profile-avatar.svg'

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
      profilePictureAlt: { control: 'string' },
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
      logoutIcon: {
        name: { control: 'string' },
        $fill: { control: 'number' },
        $wght: { contron: 'number' },
        $grad: { control: 'number' },
        $opsz: { control: 'number' },
        className: { control: 'string' },
        color: { control: 'string' },
        cursor: { control: 'string' },
      },
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
      profilePicture: undefined,
      profilePictureAlt: '',
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
      logoutIcon: undefined,
      handleLogOut: () => {},
      logoutMsg: '',
    },
  },
}

export const WithImgs: CardProfileStory = {
  args: {
    userData: {
      profilePicture: profileAvatar,
      profilePictureAlt: 'user image',
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
      logoutIcon: { name: 'power_settings_new' },
      handleLogOut: () => {},
      logoutMsg: 'Log out',
    },
  },
}

export const WithErrors: CardProfileStory = {
  args: {
    userData: {
      profilePicture: undefined,
      profilePictureAlt: 'no user image',
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
      logoutIcon: { name: 'power_settings_new' },
      handleLogOut: () => {},
      logoutMsg: 'Log out',
    },
  },
}
