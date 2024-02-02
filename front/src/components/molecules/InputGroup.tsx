import { forwardRef, Ref } from 'react'
import styled from 'styled-components'
import {
  Input,
  Label,
  ValidationMessage,
  dimensions,
  FlexBox,
} from '@itacademy/ui'
import Icon from '../atoms/Icon'
import { TInput } from '../atoms/Input'
import { TValidationMessage } from '../atoms/ValidationMessage'
import { newId } from '../../utils/newId'

const InputGroupStyled = styled.div`
  width: 100%;

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

type TObjectWithDataTestId = {
  'data-testid'?: string
  [
    key: string
  ]: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
}

const iconDataTestId = (rest: TObjectWithDataTestId) => {
  const { 'data-testid': dataTestId } = rest
  if (!dataTestId) {
    return 'icon'
  }
  const upperCaseDataTestId =
    dataTestId.charAt(0).toUpperCase() + dataTestId.slice(1)
  return dataTestId ? `icon${upperCaseDataTestId}` : ''
}
type TInputGroup = {
  id: string
  name: string
  label: string
  validationType?: TValidationMessage['color']
  validationMessage?: TValidationMessage['text']
  icon?: string
  className?: string
  iconClick?: () => void
  hiddenLabel?: boolean
} & TInput
const InputGroup = forwardRef(
  (
    {
      id,
      name,
      label,
      validationMessage,
      validationType,
      hiddenLabel,
      icon,
      className,
      iconClick,
      ...rest
    }: TInputGroup,
    ref: Ref<HTMLInputElement>
  ) => {
    const uniqueTagId = newId()
    return (
      <InputGroupStyled className={className}>
        <Label text={label} htmlFor={uniqueTagId} hiddenLabel={hiddenLabel} />
        <FlexBox direction="row" justify="flex-end">
          <Input id={uniqueTagId} name={name} {...rest} ref={ref} />
          {!!icon && (
            <Icon
              name={icon}
              onClick={iconClick}
              {...rest}
              data-testid={iconDataTestId(rest)}
            />
          )}
        </FlexBox>
        <ValidationMessage text={validationMessage} color={validationType} />
      </InputGroupStyled>
    )
  }
)

export default styled(InputGroup)``
