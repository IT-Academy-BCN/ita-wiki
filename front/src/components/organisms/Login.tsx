import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import styled from 'styled-components'
import { UserLoginSchema } from '@itacademy/schemas'
import InputGroup from '../molecules/InputGroup'
import { Button, Text, Title, ValidationMessage } from '../atoms'
import { urls } from '../../constants'
import { dimensions, colors, FlexBox } from '../../styles'

const FlexErrorStyled = styled(FlexBox)`
  height: ${dimensions.spacing.xxxs};
  margin-left: 0.2rem;
  margin-bottom: ${dimensions.spacing.xxxs};
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

const ButtonStyled = styled(Button)`
  margin: ${dimensions.spacing.none};
`

const TextDecorationStyled = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: ${dimensions.spacing.base};
`

type TForm = {
  dni: string
  password: string
}

type TLogin = {
  handleLoginModal: () => void
  handleRegisterModal: () => void
}

type TErrorResponse = {
  message: string
}

const Login: FC<TLogin> = ({ handleLoginModal, handleRegisterModal }) => {
  const [isVisibility, setIsVisibility] = useState(false)
  const [responseError, setResponseError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>({
    resolver: zodResolver(UserLoginSchema),
  })

  const loginUser = async (user: object) => {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }

    try {
      const response = await fetch(urls.logIn, config)

      if (response.status === 204) {
        setResponseError('')
        window.location.reload()
      }

      if (response.status === 404) throw new Error('Usuario no encontrado')
      if (response.status === 422) throw new Error('Contraseña incorrecta')
    } catch (error) {
      setResponseError((error as TErrorResponse).message)
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
        <FlexErrorStyled align="start">
          {errors?.dni ? (
            <ValidationMessage color="error" text="Identificador incorrecto" />
          ) : null}
        </FlexErrorStyled>
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
          {responseError ? (
            <ValidationMessage color="error" text={responseError} />
          ) : null}
        </FlexErrorStyled>
        <FlexBox align="end">
          <TextDecorationStyled
            onClick={() => {
              handleRegisterModal()
              handleLoginModal()
            }}
          >
            <Text>Recordar/cambiar contraseña</Text>
          </TextDecorationStyled>
        </FlexBox>
        <ButtonStyled type="submit">Login</ButtonStyled>
      </FormStyled>
      <Text fontWeight="bold">
        <TextDecorationStyled
          onClick={() => {
            handleRegisterModal()
            handleLoginModal()
          }}
        >
          ¿No tienes cuenta?, crear una
        </TextDecorationStyled>
      </Text>
    </LoginStyled>
  )
}

export default Login
