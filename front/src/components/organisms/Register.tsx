import { FC, HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UserRegisterSchema } from '@itacademy/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import {
  Title,
  Text,
  Button,
  CheckBox,
  ValidationMessage,
  Spinner,
  Icon,
} from '../atoms'
import InputGroup from '../molecules/InputGroup'
import SelectGroup from '../molecules/SelectGroup'
import { urls } from '../../constants'
import { colors, device, dimensions, FlexBox } from '../../styles'
import { TCategory } from '../../types'
import { useGetCategories } from '../../hooks'

const RegisterStyled = styled(FlexBox)`
  gap: ${dimensions.spacing.sm};
  padding: ${dimensions.spacing.lg};
`

const FlexErrorStyled = styled(FlexBox)`
  height: ${dimensions.spacing.none};
`

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media ${device.Tablet} {
    display: grid;
    grid-template-areas:
      'dni email'
      'name specialization'
      'password confirmPassword'
      'accept button';
    grid-template-columns: 1fr 1fr;
    gap: ${dimensions.spacing.xxxs};
  }
`

type TGridArea = HTMLAttributes<HTMLParagraphElement> & {
  gridArea: string
}

const GridAreaStyled = styled.div<TGridArea>`
  grid-area: ${(props) => props.gridArea};
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
type TButton = HTMLAttributes<HTMLParagraphElement> & {
  backgroundColor?: string
  padding?: string
}

const ButtonStyled = styled(Button)<TButton>`
  margin: ${dimensions.spacing.none};
  background-color: ${(props) => props.backgroundColor};
  border: 2px solid ${(props) => props.backgroundColor};
  padding: ${(props) => props.padding};
  &:hover,
  &:disabled {
    background-color: ${(props) => props.backgroundColor};
    border: 2px solid ${(props) => props.backgroundColor};
  }
`

const TitleStyled = styled(Title)`
  width: 100%;
  text-align: center;
`

const TextDecorationStyled = styled.span`
  text-decoration: underline;
  cursor: pointer;
`

type TForm = z.infer<typeof UserRegisterSchema>

type TRegister = {
  handleLoginModal: () => void
  handleRegisterModal: () => void
}
export function validatePassword(password: string): boolean {
  return /^(?=.*[A-Za-z\d])[A-Za-z\d]{8,}$/.test(password)
}

const registerNewUser = async (useData: TForm) => {
  const response = await fetch(urls.register, {
    method: 'POST',
    body: JSON.stringify(useData),
    headers: { 'Content-type': 'application/json' },
  })

  if (!response.ok)
    throw new Error(`Error al registrar usuario: ${response.statusText}`)

  return response.status === 204 ? null : response.json()
}

const Register: FC<TRegister> = ({ handleLoginModal, handleRegisterModal }) => {
  const [visibility, setVisibility] = useState(false)
  const [responseError, setResponseError] = useState('')
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<TForm>({ resolver: zodResolver(UserRegisterSchema) })

  const { data } = useGetCategories()
  const categoriesMap = data?.map((category: TCategory) => ({
    value: category.id,
    label: category.name,
  }))

  const registerUser = useMutation(registerNewUser, {
    onMutate: () =>
      new Promise((resolve) => {
        setTimeout(resolve, 500)
      }),
    onSuccess: () => {
      setTimeout(handleRegisterModal, 2000)
    },
    onError: (error: Error) => {
      setResponseError(error.message)
    },
  })

  const { isLoading, isSuccess } = registerUser

  const onSubmit = handleSubmit(async (userData) => {
    const {
      email,
      password,
      name,
      dni,
      specialization,
      confirmPassword,
      accept,
    } = userData

    const selectedCategory = categoriesMap.find(
      (category: { label: string }) => category.label === specialization
    )
    if (!validatePassword(password)) {
      setResponseError(t('password error'))
      return
    }
    if (selectedCategory && password === confirmPassword && accept) {
      await registerUser.mutateAsync({
        email,
        password,
        name,
        dni,
        specialization: selectedCategory.value,
        confirmPassword,
        accept,
      })
    }
  })

  return (
    <RegisterStyled>
      <TitleStyled as="h1" fontWeight="bold">
        {t('Registre')}
      </TitleStyled>
      {responseError && (
        <FlexErrorStyled align="start">
          <ValidationMessage color="error" text={responseError} />
        </FlexErrorStyled>
      )}
      <FormStyled onSubmit={onSubmit}>
        <GridAreaStyled gridArea="dni">
          <InputGroup
            data-testid="DNI"
            id="dni"
            label="dni"
            type="text"
            placeholder={t('DNI')}
            error={errors.dni && true}
            validationMessage={errors.dni?.message}
            validationType="error"
            {...register('dni')}
            onBlur={() => {
              trigger('dni')
            }}
          />
        </GridAreaStyled>
        <GridAreaStyled gridArea="email">
          <InputGroup
            data-testid="email"
            id="email"
            label="email"
            type="email"
            placeholder="Email"
            error={errors.email && true}
            validationMessage={errors.email?.message}
            validationType="error"
            {...register('email')}
            onBlur={() => {
              trigger('email')
            }}
          />
        </GridAreaStyled>
        <GridAreaStyled gridArea="name">
          <InputGroup
            data-testid="name"
            id="name"
            label="name"
            type="text"
            placeholder="Username"
            error={errors.name && true}
            validationMessage={errors.name?.message}
            validationType="error"
            {...register('name')}
            onBlur={() => {
              trigger('name')
            }}
          />
        </GridAreaStyled>
        <GridAreaStyled gridArea="password">
          <InputGroup
            data-testid="password"
            id="password"
            label="password"
            type={visibility ? 'text' : 'password'}
            placeholder={t('Password')}
            error={
              errors.password &&
              'La contraseña debe tener al menos 8 caracteres y contener solo letras y números'
            }
            validationMessage={
              errors.password?.message &&
              'La contraseña debe tener al menos 8 caracteres y contener solo letras y números'
            }
            validationType="error"
            color={colors.gray.gray4}
            icon={visibility ? 'visibility' : 'visibility_off'}
            iconClick={() => setVisibility(!visibility)}
            {...register('password')}
            onBlur={() => {
              trigger('password')
            }}
          />
        </GridAreaStyled>
        <GridAreaStyled gridArea="confirmPassword">
          <InputGroup
            data-testid="confirmPassword"
            id="confirmPassword"
            label="confirmPassword"
            type={visibility ? 'text' : 'password'}
            placeholder={t('repetirpassword')}
            icon={visibility ? 'visibility' : 'visibility_off'}
            iconClick={() => setVisibility(!visibility)}
            color={colors.gray.gray4}
            error={errors.confirmPassword && true}
            validationMessage={errors.confirmPassword?.message}
            validationType="error"
            {...register('confirmPassword')}
            onBlur={() => {
              trigger('confirmPassword')
            }}
          />
        </GridAreaStyled>
        <GridAreaStyled gridArea="specialization">
          <SelectGroup
            data-testid="specialization"
            id="specialization"
            label="specialization"
            placeholder={t('Especialidad')}
            error={errors.specialization && true}
            options={categoriesMap}
            validationMessage={errors.specialization?.message}
            {...register('specialization')}
            onBlur={() => {
              trigger('specialization')
            }}
          />
        </GridAreaStyled>
        <GridAreaStyled gridArea="accept">
          <FlexBox justify="flex-start" direction="row">
            <CheckBoxStyled
              data-testid="accept"
              id="accept"
              label=""
              hiddenLabel
              {...register('accept')}
            />
            <TextStyled as="label" htmlFor="accept">
              {t('acepto')}{' '}
              <LegalTermsLinkStyled to="#">
                {t('terminos legales')}
              </LegalTermsLinkStyled>
            </TextStyled>
          </FlexBox>
          {errors.accept && (
            <FlexBox align="start">
              <ValidationMessage color="error" text={errors.accept?.message} />
            </FlexBox>
          )}
        </GridAreaStyled>
        <GridAreaStyled gridArea="button">
          {isSuccess ? (
            <ButtonStyled
              backgroundColor={colors.success}
              padding={dimensions.spacing.xs}
              data-testid="registerSuccess"
              disabled
            >
              <Icon name="done" />
            </ButtonStyled>
          ) : (
            <Button disabled={isLoading} data-testid="submitButton">
              {isLoading ? <Spinner size="xsmall" /> : t('RegistrarmeBtn')}
            </Button>
          )}
        </GridAreaStyled>
      </FormStyled>
      <Text fontWeight="bold">
        <TextDecorationStyled
          onClick={() => {
            handleLoginModal()
            handleRegisterModal()
          }}
        >
          {t('tienes una cuenta?')}
        </TextDecorationStyled>
      </Text>
    </RegisterStyled>
  )
}
export default Register
