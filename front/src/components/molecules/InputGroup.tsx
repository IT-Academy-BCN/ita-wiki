import styled from 'styled-components'
import { dimensions, FlexBox } from '../../styles'
import { Icon, Input, Label, ValidationMessage } from '../atoms'

const InputGroupStyled = styled.div`
  ${ValidationMessage} {
    margin-top: ${dimensions.spacing.xxxs};
    margin-bottom: ${dimensions.spacing.none};
  }
  ${Icon} {
    position: absolute;
    margin-right: ${dimensions.spacing.base};
  }
  margin-bottom: ${dimensions.spacing.base};
`
type TInputGroup = {
  id: string
  validationType?: 'success' | 'warning' | 'error'
  validationMessage?: string
  icon?: string
}

function InputGroup({
  id,
  validationMessage,
  validationType,
  icon,
  ...rest
}: TInputGroup) {
  return (
    <InputGroupStyled>
      <Label text="" htmlFor={id} />
      <FlexBox direction="row" justify="flex-end">
        <Input id={id} name={id} {...rest} />
        {!!icon && <Icon name={icon} />}
      </FlexBox>
      <ValidationMessage text={validationMessage} color={validationType} />
    </InputGroupStyled>
  )
}

export default styled(InputGroup)``
