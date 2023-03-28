import styled from 'styled-components'
import { dimensions, FlexBox } from '../../styles'
import { Icon, Input, Label, ValidationMessage } from '../atoms'
import { TInput } from '../atoms/Input'

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
  inputName: string
  label: string
  validationType?: 'success' | 'warning' | 'error'
  validationMessage?: string
  icon?: string
  hiddenLabel?: boolean
} & TInput

function InputGroup({
  id,
  inputName,
  label,
  validationMessage,
  validationType,
  hiddenLabel,
  icon,
  ...rest
}: TInputGroup) {
  return (
    <InputGroupStyled>
      <Label text={label} htmlFor={id} hiddenLabel={hiddenLabel} />
      <FlexBox direction="row" justify="flex-end">
        <Input id={id} name={inputName} {...rest} />
        {!!icon && <Icon name={icon} />}
      </FlexBox>
      <ValidationMessage text={validationMessage} color={validationType} />
    </InputGroupStyled>
  )
}

export default styled(InputGroup)``
