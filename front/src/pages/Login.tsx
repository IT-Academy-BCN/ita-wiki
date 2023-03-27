/* eslint-disable no-console */
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import {
  Button,
  Input,
  Text,
  Title,
  ValidationMessage,
} from '../components/atoms'
import { UserLoginSchema } from '../../../back/src/schemas/UserLoginSchema'
import { paths } from '../constants'
import { dimensions, colors, FlexBox } from '../styles'

const FlexBoxStyled = styled(FlexBox)`
  gap: 0.5rem;
  width: 100%;
`
const LoginStyled = styled(FlexBox)`
  background-color: ${colors.gray.gray5};
  gap: ${dimensions.spacing.sm};
  height: 100vh;
  padding: ${dimensions.spacing.lg};
`

const TitleStyled = styled(Title)`
  width: 100%;
  margin: 3rem 0rem 0rem 0.2rem;
`
const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${dimensions.spacing.base};
  width: 100%;
  margin-top: -5rem;
`

const LinkStyled = styled(Link)`
  color: ${colors.black.black1};
  font-weight: 500;
  margin: ${dimensions.spacing.md} ${dimensions.spacing.xxxs};
`
const LinkRegisterStyled = styled(Link)`
  color: ${colors.black.black1};
`
const ButtonStyled = styled(Button)`
  margin: ${dimensions.spacing.none};
`

type TForm = {
  dni: string
  password: string
}

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>({
    resolver: zodResolver(UserLoginSchema),
  })
  const navigate = useNavigate()
  const urls = 'http://localhost:8999/api/v1/auth'
  const authToken = localStorage.getItem('token')

  const loginUser = async (user: object) => {
    try {
      const response = await axios.post(urls, user)
      console.log('response:', response)

      if (response) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('refresh_token', response.data.refreshToken)
        navigate('/')
        const userData = await axios
          .create({
            url: urls,
            headers: { Authorization: `Bearer ${authToken}` },
          })
          .get(urls)
          .then((res) => res.data)

        if (userData) {
          // login(userData)
        }
      }

      if (response.data.code === 'error') {
        console.log('data.error')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = handleSubmit((data) => {
    const { dni, password } = data
    loginUser({ dni, password })
  })

  return (
    <LoginStyled justify="space-between">
      <TitleStyled as="h1" fontWeight="bold">
        Login
      </TitleStyled>

      <FormStyled onSubmit={onSubmit}>
        <FlexBoxStyled>
          <Input
            placeholder="DNI o NIE"
            {...register('dni')}
            error={errors.dni && true}
          />
        </FlexBoxStyled>
        <FlexBoxStyled align="start">
          <Input
            type="password"
            placeholder="Contraseña"
            {...register('password')}
            error={errors.password && true}
          />
          {errors.password && (
            <ValidationMessage color="error" text="El campo es requerido" />
          )}
        </FlexBoxStyled>
        <FlexBox align="end">
          <LinkStyled to={`${paths.register}`}>
            Recordar/cambiar contraseña
          </LinkStyled>
        </FlexBox>
        <ButtonStyled type="submit">Login</ButtonStyled>
      </FormStyled>

      <LinkRegisterStyled to={`${paths.register}`}>
        <Text fontWeight="bold">¿No tienes cuenta?, crear una</Text>
      </LinkRegisterStyled>
    </LoginStyled>
  )
}

export default Login
