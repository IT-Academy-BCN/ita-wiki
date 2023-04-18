import { InputHTMLAttributes, forwardRef, Ref } from 'react'
import styled from 'styled-components'
import { colors, dimensions, FlexBox } from '../../styles'


const CheckBoxWrapper = styled(FlexBox)`
  flex-direction: row;
  gap: ${dimensions.spacing.xxs};
  color: ${colors.gray.gray2};
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

    &:checked::before {
      content: '\\2713';
      color: white;
      display: inline-block;
      padding-left: 0.2rem;
    }
`

type TCheckBox = InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label: string;
    defaultChecked?: boolean;
}


const CheckBox = forwardRef( 
  (
    {
      id, 
      label, 
      defaultChecked=false
    }: TCheckBox,
    ref: Ref<HTMLInputElement> 
  ) => (
    <CheckBoxWrapper>
      <StyledCheckBox
        type="checkbox"
        ref={ref} 
        id={id}
        name={id}
        defaultChecked={defaultChecked}
        label={label}
      />
      <label htmlFor={id}>{label}</label>
    </CheckBoxWrapper>
  )
)

export default styled(CheckBox)``

