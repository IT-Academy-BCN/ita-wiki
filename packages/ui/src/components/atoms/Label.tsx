import styled from "styled-components";
import { LabelHTMLAttributes } from "react";
import { colors, font } from "../../styles";

const LabelStyled = styled.label`
  color: ${colors.gray.gray2};
  font-size: ${font.xs};
  font-weight: 700;
  font-family: ${font.fontFamily};
`;

export type TLabel = Omit<LabelHTMLAttributes<HTMLLabelElement>, "htmlFor"> & {
  text: string;
  htmlFor: string;
  hiddenLabel?: boolean;
};

function Label({ htmlFor, text = "", hiddenLabel = false, ...rest }: TLabel) {
  return (
    <LabelStyled htmlFor={htmlFor} hidden={hiddenLabel} {...rest}>
      {text}
    </LabelStyled>
  );
}

export default styled(Label)``;
