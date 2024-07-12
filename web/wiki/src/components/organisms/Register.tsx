import { FC, HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UserRegisterSchema } from '@itacademy/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Checkbox,
  FlexBox,
  Icon,
  InputGroup,
  SelectGroup,
  Spinner,
  Title,
  Text,
  ValidationMessage,
  colors,
  device,
  dimensions,
} from '@itacademy/ui'
import { TItinerary, TRegisterForm } from '../../types'
import { useGetItineraries, useRegister } from '../../hooks'

const RegisterStyled = styled(FlexBox)`
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
      'name itineraryId'
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

const CheckBoxStyled = styled(Checkbox)`
  margin-top: ${dimensions.spacing.base};
  margin-bottom: ${dimensions.spacing.base};

  > input {
    border: 1px solid ${colors.black.black1};
    margin-right: ${dimensions.spacing.xxxs};

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
  $backgroundColor?: string
  padding?: string
}

const ButtonStyled = styled(Button)<TButton>`
  margin: ${dimensions.spacing.none};
  background-color: ${(props) => props.$backgroundColor};
  border: 2px solid ${(props) => props.$backgroundColor};
  padding: ${(props) => props.padding};

  &:hover,
  &:disabled {
    background-color: ${(props) => props.$backgroundColor};
    border: 2px solid ${(props) => props.$backgroundColor};
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

type TRegister = {
  handleLoginModal: () => void
  handleRegisterModal: () => void
}

export const Register: FC<TRegister> = ({
  handleLoginModal,
  handleRegisterModal,
}) => {
  const [visibility, setVisibility] = useState(false)
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<TRegisterForm>({ resolver: zodResolver(UserRegisterSchema) })

  const { data } = useGetItineraries()
  const itinerariesMap = data?.map((itinerary: TItinerary) => ({
    value: itinerary.id,
    label: itinerary.name,
  }))

  const { registerUser, error, isLoading, isSuccess } =
    useRegister(handleRegisterModal)

  const onSubmit = handleSubmit(async (userData) => {
    const { email, password, name, dni, itineraryId, confirmPassword, accept } =
      userData

    const selectedCategory = itinerariesMap?.find(
      (itinerary: { label: string }) => itinerary.label === itineraryId
    )

    if (selectedCategory && password === confirmPassword && accept) {
      await registerUser.mutateAsync({
        email,
        password,
        name,
        dni,
        itineraryId: selectedCategory.value,
        confirmPassword,
        accept,
      })
    }
  })

  return (
    <RegisterStyled gap={dimensions.spacing.sm}>
      <TitleStyled as="h1" fontWeight="bold">
        {t('Registre')}
      </TitleStyled>
      {!!error && (
        <FlexErrorStyled align="start">
          <ValidationMessage color="error" text={error?.message ?? ''} />
        </FlexErrorStyled>
      )}
      <FormStyled onSubmit={onSubmit} autoComplete="on">
        <GridAreaStyled gridArea="dni">
          <InputGroup
            data-testid="DNI"
            id="dni"
            label="dni"
            type="text"
            placeholder={t('DNI')}
            error={!!errors.dni}
            validationMessage={errors.dni?.message && t('camp obligatori')}
            validationType="error"
            {...register('dni')}
            onBlur={() => {
              trigger('dni')
            }}
            hiddenLabel
          />
        </GridAreaStyled>
        <GridAreaStyled gridArea="email">
          <InputGroup
            data-testid="email"
            id="email"
            label="email"
            type="email"
            placeholder="Email"
            error={!!errors.email}
            validationMessage={errors.email?.message && t('camp obligatori')}
            validationType="error"
            {...register('email')}
            onBlur={() => {
              trigger('email')
            }}
            hiddenLabel
          />
        </GridAreaStyled>
        <GridAreaStyled gridArea="name">
          <InputGroup
            data-testid="name"
            id="name"
            label="name"
            type="text"
            placeholder="Username"
            error={!!errors.name}
            validationMessage={errors.name?.message && t('camp obligatori')}
            validationType="error"
            {...register('name')}
            onBlur={() => {
              trigger('name')
            }}
            hiddenLabel
          />
        </GridAreaStyled>
        <GridAreaStyled gridArea="password">
          <InputGroup
            data-testid="password"
            id="password"
            label="password"
            type={visibility ? 'text' : 'password'}
            placeholder={t('Password')}
            error={!!errors.password}
            validationMessage={errors.password?.message && t('password error')}
            validationType="error"
            color={colors.gray.gray4}
            icon={visibility ? 'visibility' : 'visibility_off'}
            iconClick={() => setVisibility(!visibility)}
            {...register('password')}
            onBlur={() => {
              trigger('password')
            }}
            hiddenLabel
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
            error={!!errors.confirmPassword}
            validationMessage={
              errors.confirmPassword?.message && t('confirmPasswordError')
            }
            validationType="error"
            {...register('confirmPassword')}
            onBlur={() => {
              trigger('confirmPassword')
            }}
            hiddenLabel
          />
        </GridAreaStyled>
        <GridAreaStyled gridArea="itineraryId">
          <SelectGroup
            data-testid="itineraryId"
            id="itineraryId"
            label="itineraryId"
            placeholder={t('Especialidad')}
            $error={!!errors.itineraryId}
            options={itinerariesMap}
            validationMessage={
              errors.itineraryId?.message && t('camp obligatori')
            }
            {...register('itineraryId')}
            onBlur={() => {
              trigger('itineraryId')
            }}
            hiddenLabel
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
              <ValidationMessage
                color="error"
                text={errors.accept?.message && t('error terminos legales')}
              />
            </FlexBox>
          )}
        </GridAreaStyled>
        <GridAreaStyled gridArea="button">
          {isSuccess ? (
            <ButtonStyled
              $backgroundColor={colors.success}
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
          data-testid="haveAnAccountLink"
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
