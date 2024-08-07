import { FC, HTMLAttributes, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import styled from 'styled-components'
import { UserLoginSchema } from '@itacademy/schemas'
import { useTranslation } from 'react-i18next'
import {
  Button,
  FlexBox,
  Icon,
  InputGroup,
  Spinner,
  Text,
  Title,
  ValidationMessage,
  dimensions,
  colors,
  device,
} from '@itacademy/ui'
import { ValidationError } from '../../openapi/openapiSchemas'
import {
  type PostLoginRequestBody,
  usePostLogin,
} from '../../openapi/openapiComponents'

const FlexErrorStyled = styled(FlexBox)`
  height: ${dimensions.spacing.none};
`

const LoginStyled = styled(FlexBox)`
  padding: ${dimensions.spacing.lg};

  @media ${device.Tablet} {
    width: 80%;
    margin: auto;
  }

  @media ${device.Laptop} {
    width: 70%;
  }
`

const TitleStyled = styled(Title)`
  width: 100%;
  text-align: center;
`

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`

type TButton = HTMLAttributes<HTMLParagraphElement> & {
  backgroundColor?: string
  padding?: string
}

const ButtonStyled = styled(Button).withConfig({
  shouldForwardProp: (prop) => !['backgroundColor', 'padding'].includes(prop),
})<TButton>`
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

const TextDecorationStyled = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: ${dimensions.spacing.base};
`

type TLogin = {
  handleLoginModal: () => void
  handleRegisterModal: () => void
}

export const Login: FC<TLogin> = ({
  handleLoginModal,
  handleRegisterModal,
}) => {
  const [isVisibility, setIsVisibility] = useState(false)
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setError,
  } = useForm<PostLoginRequestBody>({
    resolver: zodResolver(UserLoginSchema),
  })

  const { mutate, error, isLoading, isSuccess } = usePostLogin({
    onMutate: () =>
      new Promise((resolve) => {
        setTimeout(resolve, 500)
      }),
    onSuccess: () => {
      setTimeout(() => window.location.reload(), 2000)
    },
  })
  const onSubmit = handleSubmit(async (data) => {
    const { dni, password } = data
    mutate({
      body: {
        dni,
        password,
      },
    })
  })
  const errorMessage = useMemo(() => {
    const { payload, status } = error ?? {}
    if (typeof payload === 'string') {
      return t(`${payload}`)
    }
    if (typeof payload !== 'string' && typeof payload?.message === 'string') {
      return t(`${payload?.message}`)
    }
    if (status === 400) {
      const { code, message, path } = (payload as ValidationError).message[0]
      if (path.includes('dni')) {
        setError('dni', { type: code, message })
      }
      return t(message)
    }
    if (error) {
      return 'Error'
    }
    return undefined
  }, [setError, error, t])
  return (
    <LoginStyled
      data-testid="loginModal"
      align="stretch"
      gap={dimensions.spacing.sm}
    >
      <TitleStyled as="h1" fontWeight="bold">
        Login
      </TitleStyled>
      {errorMessage && (
        <FlexErrorStyled align="start">
          <ValidationMessage color="error" text={t(`${errorMessage}`)} />
        </FlexErrorStyled>
      )}
      {(errors.dni || errors.password) && (
        <FlexErrorStyled align="start">
          <ValidationMessage
            color="error"
            text={t('Error 401 - Credenciales incorrectas')}
          />
        </FlexErrorStyled>
      )}

      <FormStyled onSubmit={onSubmit} autoComplete="on">
        <InputGroup
          id="dni"
          label="dni"
          type="text"
          placeholder={t('DNI')}
          {...register('dni')}
          name="dni"
          error={errors.dni && true}
          onBlur={() => {
            trigger('dni')
          }}
          hiddenLabel
        />
        <InputGroup
          type={isVisibility ? 'text' : 'password'}
          id="password"
          label="password"
          placeholder={t('Password')}
          {...register('password')}
          name="password"
          color={colors.gray.gray4}
          iconClick={() => setIsVisibility(!isVisibility)}
          icon="visibility_off"
          error={errors.password && true}
          onBlur={() => {
            trigger('password')
          }}
          hiddenLabel
        />
        <FlexBox align="end">
          <TextDecorationStyled
            onClick={() => {
              handleRegisterModal()
              handleLoginModal()
            }}
          >
            <Text>{t('recordar/cambiar')}</Text>
          </TextDecorationStyled>
        </FlexBox>
        {isSuccess ? (
          <ButtonStyled
            backgroundColor={colors.success}
            padding={dimensions.spacing.xs}
            disabled
          >
            <Icon data-testid="done-icon" name="done" />
          </ButtonStyled>
        ) : (
          <Button disabled={isLoading}>
            {isLoading ? <Spinner size="xsmall" /> : 'Login'}
          </Button>
        )}
      </FormStyled>
      <Text fontWeight="bold">
        <TextDecorationStyled
          onClick={() => {
            handleRegisterModal()
            handleLoginModal()
          }}
        >
          {t('no tienes una cuenta?')}
        </TextDecorationStyled>
      </Text>
    </LoginStyled>
  )
}
