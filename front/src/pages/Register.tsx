import { FC } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import {
  Title,
  Input,
  Button,
  Label,
  ValidationMessage,
} from '../components/atoms'

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
  required?: boolean
  validate?: any
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
    { id: 0, specialty: 'Especialidad' },
    { id: 1, specialty: 'React' },
    { id: 2, specialty: 'Angular' },
    { id: 3, specialty: 'Vue' },
    { id: 4, specialty: 'Node' },
    { id: 5, specialty: 'Java' },
    { id: 6, specialty: 'Fullstack' },
  ]

  return (
    <div>
      <Title as="h1">Register 👋</Title>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        {/* ==> EMAIL */}
        <Label text="Email" htmlFor="email" />
        <Input
          type="email"
          placeholder="Email"
          {...register('email', {
            required: true,
            pattern: /\S+@\S+\.\S+/,
          })}
          error={errors.email && true}
        />
        {errors.email?.type === 'required' && (
          <ValidationMessage color="error" text="El campo es requerido" />
        )}
        {errors.email?.type === 'pattern' && (
          <ValidationMessage color="error" text="Debe ser un email válido" />
        )}

        {/* ==> USERNAME */}
        <Label text="Username" htmlFor="userName" />
        <Input
          type="text"
          placeholder="Username"
          {...register('userName', {
            required: true,
          })}
        />
        {errors.userName && (
          <ValidationMessage color="error" text="El campo es requerido" />
        )}

        {/* ==> CONTRASEÑA 1 */}
        <Label text="Contraseña" htmlFor="password" />
        <Input
          type="password"
          placeholder="Contraseña"
          {...register('password', {
            required: true,
            minLength: 8,
          })}
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

        {/* ==> CONTRASEÑA 2 */}
        <Label text="Repetir contraseña" htmlFor="confirmPassword" />
        <Input
          type="password"
          placeholder="Repetir contraseña"
          {...register('confirmPassword', {
            required: true,
            minLength: 8,
          })}
        />

        {watch('confirmPassword') !== watch('password') && (
          <ValidationMessage
            color="error"
            text="Las contraseñas no coinciden"
          />
        )}

        {/*  TODO create select component */}
        <select>
          {options.map((opt) => (
            <option key={opt.id}>{opt.specialty}</option>
          ))}
        </select>

        {/* ==> TODO generate an style */}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <input type="checkbox" />
          <p>Acepto términos legales</p>
        </div>
        <Button type="submit">Registrarme</Button>
      </StyledForm>
      <p>¿Tienes una cuenta? Entrar</p>
    </div>
  )
}
export default Register
