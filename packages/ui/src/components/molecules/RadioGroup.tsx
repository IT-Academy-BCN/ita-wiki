
import { forwardRef, Ref } from "react";
import styled from "styled-components";
import { colors, dimensions, FlexBox } from "../../styles";
import { Label, Radio, TRadio, ValidationMessage } from "../atoms";


export type TRadioGroup = {
  id: string
  label: string
  error?: boolean | string
  errorMessage?: string
  hiddenLabelGroup?: boolean
} & TRadio

const RadioGroupContainer = styled.div`
  margin-top: ${dimensions.spacing.xs};
  width: 100%;
`;

const RadioStyled = styled(Radio)`
  padding: ${dimensions.spacing.xs};
`;

const ValidationMessageStyled = styled(ValidationMessage)`
  margin-bottom: ${dimensions.spacing.none}!important;
`

const RadioGroupStyled = styled(FlexBox).withConfig({
  shouldForwardProp: (prop) => !['error'].includes(prop),
})<{ error?: boolean }>`
  padding: ${dimensions.spacing.xxxs};
  margin-top: ${dimensions.spacing.xs};
  border-radius: ${dimensions.borderRadius.base};

  ${({ error }) => error && `
    border: 1px solid ${colors.error};
  `}
`

export const RadioGroup = forwardRef(
  (
    {
      id,
      options,
      inputName,
      direction,
      label,
      hiddenLabelGroup,
      error,
      errorMessage,
      ...rest
    }: TRadioGroup,
    ref: Ref<HTMLInputElement>
  ) => {

    return (
      <RadioGroupContainer>
        <RadioGroupStyled direction='column' error={!!error} align='start' >
          <Label text={label} htmlFor={id} hiddenLabel={hiddenLabelGroup} />
          <RadioStyled {...rest} direction={direction} inputName={inputName} options={options} ref={ref}
            data-testid="resourceType"
          />
        </RadioGroupStyled>
        <ValidationMessageStyled
          text={typeof error === "string" ? error : errorMessage}
          color='error'
        />
      </RadioGroupContainer>
    )
  }
)