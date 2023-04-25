import { InputHTMLAttributes, forwardRef, Ref } from 'react'
import styled from 'styled-components'
import { colors, dimensions, FlexBox } from '../../styles'
import Label from './Label'


export const CheckBoxWrapper = styled(FlexBox)`
  flex-direction: row;
  gap: ${dimensions.spacing.xxs};
  color: ${colors.gray.gray2};

    ${Label} {
      font-weight: normal;
      display: inline-block;
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

      &:checked {
        background-color: ${colors.primary};
        border-color: ${colors.primary};
      }

      &:checked::before {
        content: '\\2713';
        color: white;
        display: inline-block;
        padding-left: 0.3rem;
      }
    } 
`

type TCheckBox = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label: string | JSX.Element
  defaultChecked?: boolean
  required?: boolean
  className?: string
}

const CheckBox = forwardRef(
  (
    { id, label, defaultChecked = false, required = false, className }: TCheckBox,
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
      />
    <Label htmlFor={id} text={label} />
    </CheckBoxWrapper>
  )
)

export default styled(CheckBox)``
