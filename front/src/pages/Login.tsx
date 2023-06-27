import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { UserLoginSchema } from '@itacademy/schemas'
import InputGroup from '../components/molecules/InputGroup'
import { Button, Text, Title, ValidationMessage } from '../components/atoms'
import { paths, urls } from '../constants'
import { dimensions, colors, FlexBox } from '../styles'

const FlexErrorStyled = styled(FlexBox)`
  height: ${dimensions.spacing.xxxs};
  margin-left: 0.2rem;
`

const LoginStyled = styled(FlexBox)`
  gap: ${dimensions.spacing.sm};
  padding: ${dimensions.spacing.lg};
`

const TitleStyled = styled(Title)`
  width: 100%;
`

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`

const LinkStyled = styled(Link)`
  color: ${colors.black.black1};
  font-weight: 500;
  margin-bottom: ${dimensions.spacing.xxl};
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
  const [isVisibility, setIsVisibility] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>({
    resolver: zodResolver(UserLoginSchema),
  })

  const navigate = useNavigate()

  const loginUser = async (user: object) => {
    try {
      const response = await axios.post(urls.login, user)

      if (response.status === 204) {
        navigate('/')
      }
    } catch (error) {
      throw new Error('Error logging in user')
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
        <InputGroup
          id="dni"
          label="dni"
          placeholder="DNI o NIE"
          {...register('dni')}
          name="dni"
          error={errors.dni && true}
        />
        <InputGroup
          type={isVisibility ? 'text' : 'password'}
          id="password"
          label="password"
          placeholder="Contraseña"
          {...register('password')}
          name="password"
          color={colors.gray.gray4}
          iconClick={() => setIsVisibility(!isVisibility)}
          icon="visibility_off"
          error={errors.password && true}
        />
        <FlexErrorStyled align="start">
          {errors?.dni || errors?.password ? (
            <ValidationMessage
              color="error"
              text="Identificador o contraseña incorrecto"
            />
          ) : null}
        </FlexErrorStyled>
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
