import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UserRegisterSchema } from '@itacademy/schemas'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Title, Text, Button, CheckBox, ValidationMessage } from '../atoms'
import InputGroup from '../molecules/InputGroup'
import { urls } from '../../constants'
import { colors, dimensions, FlexBox } from '../../styles'

const RegisterStyled = styled(FlexBox)`
  gap: ${dimensions.spacing.sm};
  padding: ${dimensions.spacing.lg};
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`

const CheckBoxStyled = styled(CheckBox)`
  margin-top: ${dimensions.spacing.base};
  margin-bottom: ${dimensions.spacing.base};

  > input {
    border: 1px solid ${colors.black.black1};

    &:checked {
      border: 2px solid ${colors.primary};
    }
  }
`

const TextStyled = styled(Text)`
  color: ${colors.black.black1};
`

const LegalTermsLinkStyled = styled(Link)`
  color: inherit;
`

const SelectStyled = styled.select`
  padding: 1rem;
  border-radius: ${dimensions.borderRadius.base};
  width: 100%;
  border: 1px solid ${colors.gray.gray4};
  color: ${colors.gray.gray3};
`

const ButtonStyled = styled(Button)`
  margin: ${dimensions.spacing.none};
`

const TitleStyled = styled(Title)`
  width: 100%;
`

const TextDecorationStyled = styled.span`
  text-decoration: underline;
  cursor: pointer;
`

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

type TRegister = {
  handleLoginModal: () => void
  handleRegisterModal: () => void
}

const Register: FC<TRegister> = ({ handleLoginModal, handleRegisterModal }) => {
  const [visibility, setVisibility] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TForm>({ resolver: zodResolver(UserRegisterSchema) })

  const navigate = useNavigate()

  const registerNewUser = async (user: object) => {
    try {
      const response = await axios.post(urls.register, user)
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
      <TitleStyled as="h1" fontWeight="bold">
        Registro
      </TitleStyled>
      <StyledForm onSubmit={onSubmit}>
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
          iconClick={() => setVisibility(!visibility)}
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
          iconClick={() => setVisibility(!visibility)}
          color={colors.gray.gray4}
          error={errors.confirmPassword && true}
          validationMessage={errors.confirmPassword?.message}
          validationType="error"
          {...register('confirmPassword')}
        />

        {/*  TODO create select component */}
        <SelectStyled
          required
          data-testid="specialization"
          {...register('specialization')}
        >
          {options.map((opt) => (
            <option key={opt.id} value={opt.value}>
              {opt.specialization}
            </option>
          ))}
        </SelectStyled>
        {errors.specialization?.type === 'required' && (
          <ValidationMessage
            color="error"
            text={errors.specialization?.message}
          />
        )}

        {errors.specialization?.type === 'required' && (
          <ValidationMessage
            color="error"
            text={errors.specialization?.message}
          />
        )}
        <FlexBox justify="flex-start" direction="row">
          <CheckBoxStyled
            required
            id="accept"
            label=""
            hiddenLabel
            {...register('accept')}
          />
          <TextStyled as="label" htmlFor="accept">
            Acepto{' '}
            <LegalTermsLinkStyled to="#">términos legales</LegalTermsLinkStyled>
          </TextStyled>
        </FlexBox>
        <FlexBox>
          {errors.accept && (
            <ValidationMessage color="error" text={errors.accept?.message} />
          )}
        </FlexBox>
        <ButtonStyled type="submit">Registrarme</ButtonStyled>
      </StyledForm>
      <Text fontWeight="bold">
        <TextDecorationStyled
          onClick={() => {
            handleLoginModal()
            handleRegisterModal()
          }}
        >
          ¿Tienes una cuenta?, entrar
        </TextDecorationStyled>
      </Text>
    </RegisterStyled>
  )
}
export default Register
