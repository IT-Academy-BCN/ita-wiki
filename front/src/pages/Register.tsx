import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  Title,
  Input,
  Button,
  Label,
  ValidationMessage,
} from '../components/atoms'
import InputGroup from '../components/molecules/InputGroup'
import { paths } from '../constants'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  width: 50%;
`

type TForm = {
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
    watch,
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
        <div>
          <Label text="contraseña" htmlFor="password" />
          <Input
            type="password"
            placeholder="Repetir contraseña"
            {...register('password', {
              required: true,
              minLength: 8,
            })}
            error={errors.password && true}
          />
          {errors.password?.type === 'required' && (
            <ValidationMessage color="error" text="El campo es requerido" />
          )}
          {errors.password?.type === 'minLength' && (
            <ValidationMessage
              color="error"
              text="La contraseña debe tener mínimo 8 caracteres"
            />
          )}
        </div>

        <div>
          <Label text="Repetir contraseña" htmlFor="confirmPassword" />
          <Input
            type="password"
            placeholder="Repetir contraseña"
            {...register('confirmPassword', {
              required: true,
              minLength: 8,
            })}
            error={errors.confirmPassword && true}
          />
          {watch('confirmPassword') !== watch('password') && (
            <ValidationMessage
              color="error"
              text="Las contraseñas no coinciden"
            />
          )}
        </div>
        {/*  TODO create select component */}
        <div style={{ marginTop: '1rem' }}>
          <select
            {...register('specialization', {
              required: true,
            })}
          >
            {options.map((opt) => (
              <option key={opt.id}>{opt.specialization}</option>
            ))}
          </select>
        </div>

        {/* TODO generate an style or a checkbox component */}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <input
            type="checkbox"
            {...register('accept', {
              required: true,
            })}
          />
          <p>Acepto términos legales</p>
        </div>
        {errors.accept?.type === 'required' && (
          <ValidationMessage color="error" text="El campo es requerido" />
        )}
        <Button type="submit">Registrarme</Button>
      </StyledForm>
      <p>
        ¿Tienes una cuenta? <Link to={paths.login}>Entrar</Link>{' '}
      </p>
    </div>
  )
}
export default Register
