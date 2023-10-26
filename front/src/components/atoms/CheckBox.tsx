import { forwardRef, InputHTMLAttributes, Ref } from 'react'
import styled from 'styled-components'
import { colors, dimensions, FlexBox } from '../../styles'
import Label from './Label'

export const CheckBoxWrapper = styled(FlexBox)`
  flex-direction: row;
  color: ${colors.gray.gray2};

  ${Label} {
    font-weight: normal;
    color: inherit;
  }

  > input {
    -webkit-appearance: none;
    appearance: none;
    width: ${dimensions.spacing.md};
    height: ${dimensions.spacing.md};
    border-radius: ${dimensions.borderRadius.xs};
    border: 2px solid ${colors.gray.gray3};
    color: ${colors.gray.gray2};
    cursor: pointer;
    margin-right: ${dimensions.spacing.xxs};

    &:checked {
      background-color: ${colors.primary};
      border-color: ${colors.primary};
    }

    &:checked::before {
      font-family: 'Material Symbols Outlined';
      content: '\\e5ca';
      font-size: 24px;
      color: white;
      position: relative;
      top: -3px;
      left: -2px;
    }
  }
`
type TCheckBox = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label: string
  hiddenLabel?: boolean
  defaultChecked?: boolean
  required?: boolean
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const CheckBox = forwardRef(
  (
    {
      id,
      label = '',
      hiddenLabel,
      defaultChecked = false,
      required = false,
      className,
      onChange,
      ...rest
    }: TCheckBox,
    ref: Ref<HTMLInputElement>
  ) => (
    <CheckBoxWrapper className={className}>
      <input
        type="checkbox"
        ref={ref}
        id={id}
        name={id}
        defaultChecked={defaultChecked}
        required={required}
        onChange={onChange}
        {...rest}
      />
      <Label htmlFor={id} text={label} hidden={hiddenLabel} />
    </CheckBoxWrapper>
  )
)

export default styled(CheckBox)``
