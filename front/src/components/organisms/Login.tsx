import { FC, HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import styled from 'styled-components'
import { UserLoginSchema } from '@itacademy/schemas'
import InputGroup from '../molecules/InputGroup'
import { Button, Icon, Spinner, Text, Title, ValidationMessage } from '../atoms'
import { urls } from '../../constants'
import { dimensions, colors, FlexBox, device } from '../../styles'

const FlexErrorStyled = styled(FlexBox)`
  height: ${dimensions.spacing.none};
`

const LoginStyled = styled(FlexBox)`
  gap: ${dimensions.spacing.sm};
  padding: ${dimensions.spacing.lg};
  align-items: stretch;

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

const ButtonStyled = styled(Button)<TButton>`
  margin: ${dimensions.spacing.none};
  background-color: ${(props) => props.backgroundColor};
  border: 2px solid ${(props) => props.backgroundColor};
  padding: ${(props) => props.padding};
  &:hover {
    background-color: ${(props) => props.backgroundColor};
    border: 2px solid ${(props) => props.backgroundColor};
  }
`

const TextDecorationStyled = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: ${dimensions.spacing.base};
`

const StyledSpinner = styled(Spinner)`
  width: 1.15rem;
  height: 1.15rem;
  border: 3px solid ${colors.outlineHover};
  border-top-color: ${colors.primary};
  border-right-color: ${colors.primary};
`

type TForm = {
  dni: string
  password: string
}

type TLogin = {
  handleLoginModal: () => void
  handleRegisterModal: () => void
}

type TErrorResponse = {
  message: string
}

const Login: FC<TLogin> = ({ handleLoginModal, handleRegisterModal }) => {
  const [isVisibility, setIsVisibility] = useState(false)
  const [responseError, setResponseError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<TForm>({
    resolver: zodResolver(UserLoginSchema),
  })
  const [isLoading, setIsLoading] = useState(false)
  const [onSuccess, setOnSuccess] = useState(false)

  const loginUser = async (user: object) => {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }

    const errorMessage: { [key: number]: string } = {
      403: 'Usuario en proceso de activación. Por favor, inténtelo más tarde.',
      404: 'Acceso restringido. Por favor, contacte con el personal de IT Academy.',
      422: 'Identificador o contraseña incorrectos.',
    }

    try {
      const response = await fetch(urls.logIn, config)

      if (response.status === 204) {
        setResponseError('')
        setIsLoading(false)
        setOnSuccess(true)
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }

      if (Object.hasOwnProperty.call(errorMessage, response.status)) {
        throw new Error(errorMessage[response.status])
      }
    } catch (error) {
      setIsLoading(false)
      setResponseError((error as TErrorResponse).message)
    }
  }

  const onSubmit = handleSubmit((data) => {
    const { dni, password } = data
    setIsLoading(true)
    setTimeout(() => {
      loginUser({ dni, password })
    }, 500)
  })

  return (
    <LoginStyled>
      <TitleStyled as="h1" fontWeight="bold">
        Login
      </TitleStyled>
      {responseError && (
        <FlexErrorStyled align="start">
          <ValidationMessage color="error" text={responseError} />
        </FlexErrorStyled>
      )}
      {(errors.dni || errors.password) && (
        <FlexErrorStyled align="start">
          <ValidationMessage
            color="error"
            text="Identificador o contraseña incorrectos"
          />
        </FlexErrorStyled>
      )}
      <FormStyled onSubmit={onSubmit}>
        <InputGroup
          id="dni"
          label="dni"
          placeholder="DNI o NIE"
          {...register('dni')}
          name="dni"
          error={errors.dni && true}
          onBlur={() => {
            trigger('dni')
          }}
        />
        <InputGroup
          type={isVisibility ? 'text' : 'password'}
          id="password"
          label="password"
          placeholder="Contraseña"
          {...register('password')}
          name="password"
          color={colors.gray.gray4}
          iconClick={() => setIsVisibility(!isVisibility)}
          icon="visibility_off"
          error={errors.password && true}
          onBlur={() => {
            trigger('password')
          }}
        />
        <FlexBox align="end">
          <TextDecorationStyled
            onClick={() => {
              handleRegisterModal()
              handleLoginModal()
            }}
          >
            <Text>Recordar/cambiar contraseña</Text>
          </TextDecorationStyled>
        </FlexBox>
        {onSuccess ? (
          <ButtonStyled
            backgroundColor={colors.success}
            padding={dimensions.spacing.xs}
          >
            <Icon data-testid="done-icon" name="done" />
          </ButtonStyled>
        ) : (
          <ButtonStyled type="submit" disabled={isLoading}>
            {isLoading ? <StyledSpinner /> : 'Login'}
          </ButtonStyled>
        )}
      </FormStyled>
      <Text fontWeight="bold">
        <TextDecorationStyled
          onClick={() => {
            handleRegisterModal()
            handleLoginModal()
          }}
        >
          ¿No tienes cuenta?, crear una
        </TextDecorationStyled>
      </Text>
    </LoginStyled>
  )
}

export default Login
