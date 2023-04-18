import { InputHTMLAttributes, forwardRef, Ref } from 'react'
import styled from 'styled-components'
import { colors, dimensions, FlexBox } from '../../styles'


const CheckBoxWrapper = styled(FlexBox)<{ legal: boolean }>`
  flex-direction: row;
  gap: ${dimensions.spacing.xxs};
  color: ${colors.gray.gray2};

    ${({ legal }) =>
    legal &&
    `
      color: ${colors.black.black1};
    `} 
`

const StyledCheckBox = styled.input<TCheckBox>`
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

    &:checked::before{
      content: "✓✓";
      color: transparent;
      background: url('data:image/svg+xml;utf8,<svg width="16" height="12" viewBox="1 -1 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.68505 11.2C5.44505 11.2 5.22503 11.12 5.04503 10.94L1.06505 6.95999C0.705054 6.59999 0.705054 6.04 1.06505 5.68C1.42505 5.32 1.98503 5.32 2.34503 5.68L5.70504 9.01999L13.6851 1.05999C14.0451 0.699991 14.6051 0.699991 14.9651 1.05999C15.3251 1.41999 15.3251 1.98 14.9651 2.34L6.34503 10.94C6.14503 11.12 5.92505 11.2 5.68505 11.2Z" fill="white"/></svg>');
      background-position: center;
      background-repeat: no-repeat; 
      background-size: 72%;
    }

  ${({ legal }) =>
    legal &&
    `
      width: ${dimensions.spacing.sm};
      height: ${dimensions.spacing.sm};
      border: 1px solid ${colors.black.black1};
      color: ${colors.black.black1};
        &:checked {
          background-color: ${colors.primary};
          border-color: ${colors.primary};
        }
        &:checked::before{
          content: "✓_";
          color: transparent;
          background: url('data:image/svg+xml;utf8,<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.68505 11.2C5.44505 11.2 5.22503 11.12 5.04503 10.94L1.06505 6.95999C0.705054 6.59999 0.705054 6.04 1.06505 5.68C1.42505 5.32 1.98503 5.32 2.34503 5.68L5.70504 9.01999L13.6851 1.05999C14.0451 0.699991 14.6051 0.699991 14.9651 1.05999C15.3251 1.41999 15.3251 1.98 14.9651 2.34L6.34503 10.94C6.14503 11.12 5.92505 11.2 5.68505 11.2Z" fill="white"/></svg>');
          background-position: center;
          background-repeat: no-repeat; 
          background-size: 72%;
        }
  `}

`

type TCheckBox = InputHTMLAttributes<HTMLInputElement> & {
    type?: string;
    id: string;
    label: string;
    legal?: boolean;
    defaultChecked?: boolean;
}


const CheckBox = forwardRef( 
  (
    {
      type = "checkbox", 
      id, 
      label, 
      legal = false, 
      defaultChecked = false
    }: TCheckBox,
    ref: Ref<HTMLInputElement> 
  ) => (
    <CheckBoxWrapper legal = {legal}>
      <StyledCheckBox
        ref = {ref} 
        type = {type}
        id = {id}
        name = {id}
        defaultChecked = {defaultChecked}
        legal = {legal}
        label = {label}
      />
      <label htmlFor={id}>{label}</label>
    </CheckBoxWrapper>
  )
)

export default styled(CheckBox)``

