import styled from 'styled-components'
import { FC, LabelHTMLAttributes } from 'react'
import { colors, font } from '../../styles'

export type TLabel = Omit<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'> & {
  text: string
  htmlFor: string
  hiddenLabel?: boolean
}

type TLabelStyled = Required<Pick<TLabel, 'hiddenLabel'>>

const LabelStyled = styled('label').withConfig({
  shouldForwardProp: (prop) => !['hiddenLabel'].includes(prop),
})<TLabelStyled>`
  color: ${colors.gray.gray2};
  font-size: ${font.xs};
  font-weight: 700;
  font-family: ${font.fontFamily};
  ${({ hiddenLabel }) =>
    hiddenLabel &&
    `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    `}
`

export const Label: FC<TLabel> = ({
  htmlFor,
  text = '',
  hiddenLabel = false,
  ...rest
}) => (
  <LabelStyled htmlFor={htmlFor} hiddenLabel={hiddenLabel} {...rest}>
    {text}
  </LabelStyled>
)
