import React from 'react'
import styled from 'styled-components'
import colors from '../../styles/colors'
import font from '../../styles/font'


type TValidationMessageStyled = {
  color: 'success' | 'error' | 'warning'
}

const ValidationMessageStyled = styled.span<TValidationMessageStyled>`
  ${({ color }) => color === 'success' && `color: ${colors.success};`};
  ${({ color }) => color === 'error' && `color: ${colors.error};`};
  ${({ color }) => color === 'warning' && `color: ${colors.warning};`};
  font-size: ${font.normal};

  

`

type TValidationMessage = {
  text?: string
  color?: 'success' | 'error' | 'warning'
}

export const ValidationMessage = ({
  text = '',
  color = 'success',
}: TValidationMessage) => {
  if (!text) return null
  return <ValidationMessageStyled color={color}>{text}</ValidationMessageStyled>
}
