/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { FC } from 'react'
import { Title } from '../components/atoms'
import { validateID } from '../utils/validateID'

const Login: FC = () => {
  const { error, message } = validateID('')

  return (
    <div>
      <Title as="h1">Login 👻</Title>
    </div>
  )
}

export default Login
