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
  userName: z.string(),
  specialization: z.string(),
  password: z.string().min(8),
})

type TForm = {
  dni: string
  email: string
  userName: string
  password: string
  confirmPassword: string
  specialization: string
  accept: boolean
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
    console.log('user', user)
    try {
      const response = await axios.post(url, user)
      console.log('res', response)
      if (response) {
        localStorage.setItem('token', response.data.token)
        navigate('/')
      }
      if (response.data.code === 'error') {
        console.log('error')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = handleSubmit((data) => {
    const { dni, userName, specialization, password, accept } = data
    registerNewUser({ dni, userName, specialization, password, accept })
    reset()
  })

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
    <RegisterStyled>
      <Title as="h1" fontWeight="bold">
        Register
      </Title>
      <StyledForm onSubmit={onSubmit}>
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
          <SelectStyled
            {...register('specialization', {
              required: true,
            })}
          >
            {options.map((opt) => (
              <option key={opt.id}>{opt.specialization}</option>
            ))}
          </SelectStyled>

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
        ¿Tienes una cuenta?
        <LinkLoginStyled to={paths.login}>Entrar</LinkLoginStyled>
      </Text>
    </RegisterStyled>
  )
}
export default Register
