import type { Meta, StoryObj } from '@storybook/react'
import { AccessModalContent } from '../../../components/molecules'
import customImg from './lock-dynamic-color.svg'

const meta = {
  title: 'Molecules/AccessModalContent',
  component: AccessModalContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    handleAccessModal: { control: 'function' },
    handleLoginModal: { control: 'function' },
    handleRegisterModal: { control: 'function' },
    title: { control: 'text' },
    userMsg: { control: 'text' },
    registerBtnTitle: { control: 'text' },
    loginBtnTitle: { control: 'text' },
    img: {
      svgSrc: { control: 'text' },
      svgAlt: { control: 'text' },
    },
  },
} satisfies Meta<typeof AccessModalContent>

export default meta
type AccessModalContentStory = StoryObj<typeof AccessModalContent>

export const Default: AccessModalContentStory = {
  args: {
    handleAccessModal: (): void => {},
    handleLoginModal: (): void => {},
    handleRegisterModal: (): void => {},
    title: 'AccessModalContent_title',
    userMsg: 'AccessModalContent_userMsg',
    registerBtnTitle: 'Register',
    loginBtnTitle: 'Login',
    img: {
      svgSrc: '',
      svgAlt: 'test alt',
    },
  },
}

export const WithIcon: AccessModalContentStory = {
  args: {
    handleAccessModal: (): void => {},
    handleLoginModal: (): void => {},
    handleRegisterModal: (): void => {},
    title: 'Acceso restringido',
    userMsg: 'Regístrate para subir o votar contenido',
    registerBtnTitle: 'Registrarme',
    loginBtnTitle: 'Entrar',
    img: {
      svgSrc: customImg,
      svgAlt: 'test alt',
    },
  },
}
