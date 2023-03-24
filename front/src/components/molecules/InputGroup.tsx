import styled from 'styled-components'
import { dimensions } from '../../styles'
import { Input, Label, ValidationMessage } from '../atoms'

const InputGroupStyled = styled.div`
  ${ValidationMessage} {
    margin-top: ${dimensions.spacing.xxxs};
    margin-bottom: ${dimensions.spacing.none};
  }
  margin-bottom: ${dimensions.spacing.base};
`
type TInputGroup = {
  id: string
  validationType?: 'success' | 'warning' | 'error'
  validationMessage?: string
}

function InputGroup({
  id,
  validationMessage,
  validationType,
  ...rest
}: TInputGroup) {
  return (
    <InputGroupStyled>
      <Label text="" htmlFor={id} />
      <Input id={id} name={id} {...rest} />
      <ValidationMessage text={validationMessage} color={validationType} />
    </InputGroupStyled>
  )
}

export default styled(InputGroup)``
