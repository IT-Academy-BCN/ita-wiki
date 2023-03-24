import { InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { colors, dimensions } from '../../styles'

const InputTextSyled = styled.input<TInput>`
  width: '100%';
  padding: ${dimensions.spacing.sm};
  border-radius: ${dimensions.borderRadius.base};
  border: 1px solid ${colors.gray.gray4};

  ${({ success }) => success && `border: 1px solid ${colors.success};`}
  ${({ warning }) => warning && `border: 1px solid ${colors.warning};`}
  ${({ error }) => error && `border: 1px solid ${colors.error};`}

  &:focus {
    outline: 0 none;
  }
`

type TInput = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean | string
  success?: boolean
  warning?: boolean
  type?: 'text' | 'password' | 'email'
}

function InputText({
  error = false,
  warning = false,
  success = false,
  type = 'text',
  ...rest
}: TInput) {
  return (
    <InputTextSyled
      type={type}
      error={!!error}
      success={success}
      warning={warning}
      {...rest}
    />
  )
}

export default styled(InputText)``

// import { InputHTMLAttributes } from 'react'
// import styled from 'styled-components'
// import { colors, dimensions } from '../../styles'

// type TInputStyled = {
//   success?: boolean
//   warning?: boolean
//   error?: boolean
// }

// const InputSyled = styled.input<TInputStyled>`
//   width: 100%;
//   padding: ${dimensions.spacing.sm};
//   border-radius: ${dimensions.borderRadius.base};
//   border: 1px solid ${colors.gray.gray4};
//   ${({ success }) => success && `border: 1px solid ${colors.success};`}
//   ${({ warning }) => warning && `border: 1px solid ${colors.warning};`}
//   ${({ error }) => error && `border: 1px solid ${colors.error};`}

//   &:focus {
//     outline: 0 none;
//   }
// `
// type TInput = InputHTMLAttributes<HTMLInputElement> & {
//   error?: boolean | string
//   success?: boolean
//   warning?: boolean
//   type?: 'text' | 'password' | 'email'
// }

// function Input({ error = false, type = 'text', ...rest }: TInput) {
//   return <InputSyled type={type} error={!!error} {...rest} />
// }

// export default styled(Input)``
