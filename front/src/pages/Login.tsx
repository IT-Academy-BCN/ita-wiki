import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  Button,
  Input,
  Text,
  Title,
  ValidationMessage,
} from '../components/atoms'
import { paths } from '../constants'
import { colors } from '../styles'

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`

const LoginStyled = styled.div`
  background-color: ${colors.gray.gray5};
  height: 100vh;
  margin: 0;
  padding: 3rem;
  gap: 2rem;
  display: flex;
  flex-direction: column;
`
const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const LinkRegisterStyled = styled(Link)`
  color: black;
`

type TForm = {
  id: string
  password: string
}

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>()

  const loginUser = (user: object) => {
    console.log('user:', user)
  }

  const onSubmit = handleSubmit((data) => {
    const { id, password } = data
    loginUser({ id, password })
  })

  return (
    <LoginStyled>
      <Title as="h1" fontWeight="bold">
        Login
      </Title>

      <FormStyled onSubmit={onSubmit}>
        <FlexBox>
          <Input
            placeholder="DNI o NIE"
            {...register('id', {
              // TODO -> validate: validateID()
              required: true,
              pattern: /^[XYZ]?\d{5,8}[A-Z]$/,
            })}
            error={errors.id && true}
          />
          {/* {errors.id && (
            <ValidationMessage color="error" text="DNI o NIE incorrecto..." />
          )} */}
          {errors.id?.type === 'required' && (
            <ValidationMessage color="error" text="El campo es requerido" />
          )}
          {errors.id?.type === 'pattern' && (
            <ValidationMessage color="error" text="El formato es incorrecto" />
          )}
        </FlexBox>
        <FlexBox>
          <Input
            type="password"
            placeholder="Contraseña"
            {...register('password', {
              required: true,
            })}
            error={errors.password && true}
          />
          {errors.password?.type === 'required' && (
            <ValidationMessage color="error" text="El campo es requerido" />
          )}
        </FlexBox>

        <Text>Recordar/cambiar contraseña</Text>
        <Button type="submit">Login</Button>
      </FormStyled>

      <LinkRegisterStyled to={`${paths.register}`}>
        <Text fontWeight="bold">¿No tienes cuenta?, crear una</Text>
      </LinkRegisterStyled>
    </LoginStyled>
  )
}

export default Login
