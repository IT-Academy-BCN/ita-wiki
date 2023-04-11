import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Title, Text, Button, ValidationMessage } from '../components/atoms'
import InputGroup from '../components/molecules/InputGroup'
import { paths } from '../constants'
import { colors, dimensions, FlexBox } from '../styles'

const RegisterStyled = styled(FlexBox)`
  background-color: ${colors.gray.gray5};
  padding: ${dimensions.spacing.lg};
  gap: ${dimensions.spacing.sm};
  height: 100vh;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${dimensions.spacing.base};
  width: 100%;
`

const LinkLoginStyled = styled(Link)`
  color: black;
  margin-left: ${dimensions.spacing.xxxs};
`

const SelectStyled = styled.select`
  padding: 1rem;
  border-radius: ${dimensions.borderRadius.base};
  width: 100%;
  border: 1px solid ${colors.gray.gray4};
  color: ${colors.gray.gray3};
`

const validNIEPrefixes = ['X', 'Y', 'Z']
const validDNIPrefixes = [...Array(23).keys()].map((i) => (i + 1).toString())
const DNI_REGEX = /^(([XYZ]\d{7,8})|(\d{8}))([a-zA-Z])$/i
const DNISchema = z
  .string({ required_error: 'El campo es requerido' })
  .regex(DNI_REGEX)
  .transform((value) => value.toUpperCase())
  .refine((value) => {
    const firstLetter = value.charAt(0)
    return (
      validDNIPrefixes.includes(firstLetter) ||
      validNIEPrefixes.includes(firstLetter)
    )
  })

const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

const UserRegisterSchema = z
  .object({
    dni: DNISchema,
    email: z
      .string({ required_error: 'El campo es requerido' })
      .min(1, { message: 'Este campo es obligatorio' })
      .email('Debe ser un correo válido'),
    name: z
      .string({ required_error: 'El campo es requerido' })
      .min(1, { message: 'Este campo es obligatorio' }),
    specialization: z.string({ required_error: 'El campo es requerido' }),
    password: z
      .string({ required_error: 'El campo es requerido' })
      .min(8, { message: 'La contraseña debe tener mínimo 8 caracteres' })
      .regex(new RegExp(passRegex), {
        message:
          'La contraseña debe contener al menos un número, usar mayúsculas y minúsculas y un número',
      }),
    confirmPassword: z.string({ required_error: 'El campo es requerido' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Las contraseñas deben ser iguales',
  })

type TForm = {
  dni: string
  email: string
  name: string
  password: string
  confirmPassword: string
  specialization: string
  accept: string
  required: boolean
}

const Register: FC = () => {
  const [visibility, setVisibility] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<TForm>({ resolver: zodResolver(UserRegisterSchema) })

  const navigate = useNavigate()
  const url = 'http://localhost:8999/api/v1/auth/register'

  const registerNewUser = async (user: object) => {
    try {
      const response = await axios.post(url, user)
      if (response.status === 204) {
        navigate('/')
      }
    } catch (error) {
      throw new Error('Error registering new user')
    }
  }

  const onSubmit = handleSubmit((data) => {
    const { email, password, name, dni, specialization } = data
    registerNewUser({ email, password, name, dni, specialization })
    reset()
  })

  const options = [
    { id: 0, value: '', specialization: 'Especialidad' },
    { id: 1, value: 'react', specialization: 'React' },
    { id: 2, value: 'angular', specialization: 'Angular' },
    { id: 3, value: 'vue', specialization: 'Vue' },
    { id: 4, value: 'node', specialization: 'Node' },
    { id: 5, value: 'java', specialization: 'Java' },
    { id: 6, value: 'fullstack', specialization: 'Fullstack' },
    { id: 7, value: 'dataScience', specialization: 'Data Science' },
  ]

  return (
    <RegisterStyled>
      <Title as="h1" fontWeight="bold">
        Register
      </Title>
      <StyledForm onSubmit={onSubmit}>
        <FlexBox>
          <InputGroup
            required
            data-testid="DNI"
            id="dni"
            label="dni"
            type="text"
            placeholder="DNI"
            error={errors.dni && true}
            validationMessage={errors.dni?.message}
            validationType="error"
            {...register('dni')}
          />

          <InputGroup
            required
            data-testid="email"
            id="email"
            label="email"
            type="email"
            placeholder="Email"
            error={errors.email && true}
            validationMessage={errors.email?.message}
            validationType="error"
            {...register('email')}
          />

          <InputGroup
            required
            data-testid="name"
            id="name"
            label="name"
            type="text"
            placeholder="Username"
            error={errors.name && true}
            validationMessage={errors.name?.message}
            validationType="error"
            {...register('name')}
          />

          <InputGroup
            required
            data-testid="password"
            id="password"
            label="password"
            type={visibility ? 'text' : 'password'}
            placeholder="password"
            error={errors.password && true}
            validationMessage={errors.password?.message}
            validationType="error"
            color={colors.gray.gray4}
            icon={visibility ? 'visibility' : 'visibility_off'}
            onClick={() => setVisibility(!visibility)}
            {...register('password')}
          />

          <InputGroup
            required
            data-testid="confirmPassword"
            id="confirmPassword"
            label="confirmPassword"
            type={visibility ? 'text' : 'password'}
            placeholder="Confirmar password"
            icon={visibility ? 'visibility' : 'visibility_off'}
            // iconClick={() => setVisibility(!visibility)}
            color={colors.gray.gray4}
            error={errors.confirmPassword && true}
            // validationMessage={
            //   errors.confirmPassword &&
            //   errors.confirmPassword.type === 'validate'
            //     ? 'Las contraseñas no coinciden'
            //     : 'El campo es requerido'
            // }
            validationMessage={errors.confirmPassword?.message}
            validationType="error"
            {...register('confirmPassword', {
              required: true,
              validate: (value) => value === getValues('password'),
            })}
          />

          {/*  TODO create select component */}
          <SelectStyled
            data-testid="specialization"
            {...register('specialization', {
              required: true,
            })}
          >
            {options.map((opt) => (
              <option key={opt.id} value={opt.value}>
                {opt.specialization}
              </option>
            ))}
          </SelectStyled>
          {errors.specialization?.type === 'required' && (
            <ValidationMessage color="error" text="El campo es requerido" />
          )}

          {/* TODO generate checkbox component? */}
          <FlexBox direction="row">
            <input
              style={{ marginRight: '1rem' }}
              type="checkbox"
              {...register('accept', {
                required: true,
              })}
            />
            {errors.accept?.type === 'required' ? (
              <Text color={colors.error}>Acepto términos legales</Text>
            ) : (
              <Text>Acepto términos legales</Text>
            )}
          </FlexBox>
          {errors.accept && (
            <p>hay que aceptar</p>

            // <ValidationMessage
            //   color="error"
            //   text="Es necesario aceptar los términos legales"
            // />
          )}
          <Button type="submit">Registrarme</Button>
        </FlexBox>
      </StyledForm>
      <Text fontWeight="bold">
        ¿Tienes una cuenta?
        <LinkLoginStyled to={paths.login}>Entrar</LinkLoginStyled>
      </Text>
    </RegisterStyled>
  )
}
export default Register
