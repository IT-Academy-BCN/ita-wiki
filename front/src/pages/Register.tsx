import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Title, Text, Button, ValidationMessage } from '../components/atoms'
import InputGroup from '../components/molecules/InputGroup'
import { paths } from '../constants'
import { FlexBox } from '../styles'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  width: 50%;
`
const LinkLoginStyled = styled(Link)`
  color: black;
`

type TForm = {
  dni: string
  email: string
  userName: string
  password: string
  confirmPassword: string
  specialization: string
  accept: string
  required: boolean
}

const Register: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<TForm>()

  const onSubmit = (data: object) => {
    console.log(data)
  }

  const options = [
    { id: 0, specialization: 'Especialidad' },
    { id: 1, specialization: 'React' },
    { id: 2, specialization: 'Angular' },
    { id: 3, specialization: 'Vue' },
    { id: 4, specialization: 'Node' },
    { id: 5, specialization: 'Java' },
    { id: 6, specialization: 'Fullstack' },
  ]

  return (
    <div>
      <Title as="h1">Register 👋</Title>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FlexBox>
          <InputGroup
            id="dni"
            label="dni"
            type="text"
            placeholder="DNI"
            error={errors.userName && true}
            validationMessage="El campo es requerido"
            validationType="error"
            {...register('dni', {
              required: true,
            })}
          />
          <InputGroup
            id="email"
            label="email"
            type="email"
            placeholder="Email"
            error={errors.email && true}
            validationMessage="El campo es requerido"
            validationType="error"
            {...register('email', {
              required: true,
            })}
          />

          <InputGroup
            id="userName"
            label="userName"
            type="text"
            placeholder="Username"
            error={errors.userName && true}
            validationMessage="El campo es requerido"
            validationType="error"
            {...register('userName', {
              required: true,
            })}
          />

          <InputGroup
            id="password"
            label="password"
            type="password"
            placeholder="password"
            error={errors.password && true}
            validationMessage="El campo es requerido"
            validationType="error"
            {...register('password', {
              required: true,
            })}
          />

          <InputGroup
            id="confirmPassword"
            label="confirmPassword"
            type="password"
            placeholder="confirmPassword"
            error={errors.confirmPassword && true}
            validationMessage={
              errors.confirmPassword &&
              errors.confirmPassword.type === 'validate'
                ? 'Las contraseñas no coinciden'
                : 'El campo es requerido'
            }
            validationType="error"
            {...register('confirmPassword', {
              required: true,
              validate: (value) => value === getValues('password'),
            })}
          />

          {/*  TODO create select component */}

          <select
            {...register('specialization', {
              required: true,
            })}
          >
            {options.map((opt) => (
              <option key={opt.id}>{opt.specialization}</option>
            ))}
          </select>

          {/* TODO generate checkbox component? */}
          <FlexBox direction="row">
            <input
              type="checkbox"
              {...register('accept', {
                required: true,
              })}
            />
            <Text>Acepto términos legales</Text>
          </FlexBox>
          {errors.accept?.type === 'required' && (
            <ValidationMessage
              color="error"
              text="Es necesario aceptar términos legales"
            />
          )}
          <Button type="submit">Registrarme</Button>
        </FlexBox>
      </StyledForm>
      <Text fontWeight="bold">
        ¿Tienes una cuenta?{' '}
        <LinkLoginStyled to={paths.login}>Entrar</LinkLoginStyled>
      </Text>
    </div>
  )
}
export default Register
