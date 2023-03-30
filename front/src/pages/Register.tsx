import { FC } from 'react'
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
  padding: 3rem;
  height: 100%;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const LinkLoginStyled = styled(Link)`
  color: black;
  margin-left: 0.5rem;
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
  .string()
  .regex(DNI_REGEX)
  .transform((value) => value.toUpperCase())
  .refine((value) => {
    const firstLetter = value.charAt(0)
    return (
      validDNIPrefixes.includes(firstLetter) ||
      validNIEPrefixes.includes(firstLetter)
    )
  })

const UserRegisterSchema = z.object({
  dni: DNISchema,
  email: z.string(),
  name: z.string(),
  specialization: z.string(),
  password: z.string().min(8),
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
            data-testid="DNI"
            id="dni"
            label="dni"
            type="text"
            placeholder="DNI"
            error={errors.dni && true}
            validationMessage="El campo es requerido"
            validationType="error"
            {...register('dni', {
              required: true,
            })}
          />

          <InputGroup
            data-testid="email"
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
            data-testid="name"
            id="name"
            label="name"
            type="text"
            placeholder="Username"
            error={errors.name && true}
            validationMessage="El campo es requerido"
            validationType="error"
            {...register('name', {
              required: true,
            })}
          />

          <InputGroup
            data-testid="password"
            id="password"
            label="password"
            type="password"
            placeholder="password"
            error={errors.password && true}
            validationMessage="El campo es requerido"
            validationType="error"
            color={colors.gray.gray4}
            icon="visibility_off"
            {...register('password', {
              required: true,
            })}
          />

          <InputGroup
            data-testid="confirmPassword"
            id="confirmPassword"
            label="confirmPassword"
            type="password"
            placeholder="Confirmar password"
            icon="visibility_off"
            color={colors.gray.gray4}
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
