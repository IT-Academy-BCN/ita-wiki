import styled from 'styled-components'
import { dimensions, FlexBox } from '../../styles'
import { Icon, Input, Label, ValidationMessage } from '../atoms'
import { TInput } from '../atoms/Input'
import { TValidationMessage } from '../atoms/ValidationMessage'

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
  name: string
  label: string
  validationType?: TValidationMessage['color']
  validationMessage?: TValidationMessage['text']
  icon?: string
  hiddenLabel?: boolean
} & TInput

function InputGroup({
  id,
  name,
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
        <Input id={id} name={name} {...rest} />
        {!!icon && <Icon name={icon} />}
      </FlexBox>
      <ValidationMessage text={validationMessage} color={validationType} />
    </InputGroupStyled>
  )
}

export default styled(InputGroup)``
