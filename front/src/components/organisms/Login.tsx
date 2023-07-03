import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import styled from 'styled-components'
import { UserLoginSchema } from '@itacademy/schemas'
import InputGroup from '../molecules/InputGroup'
import { Button, Text, Title, ValidationMessage } from '../atoms'
import { urls } from '../../constants'
import { dimensions, colors, FlexBox } from '../../styles'

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

const Login: FC<TLogin> = ({ handleLoginModal, handleRegisterModal }) => {
  const [isVisibility, setIsVisibility] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>({
    resolver: zodResolver(UserLoginSchema),
  })

  const loginUser = async (user: object) => {
    try {
      const response = await axios.post(urls.logIn, user)

      if (response.status === 204) {
        window.location.reload()
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
