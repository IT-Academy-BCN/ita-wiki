import { FC, HTMLAttributes } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from '.'
import { font, dimensions } from '../../styles'

const ButtonStyled = styled.button`
  margin: ${dimensions.spacing.none};
  font-weight: ${font.medium};
  display: flex;
  align-items: center;
  position: absolute;
  top: ${dimensions.spacing.base};
  left: ${dimensions.spacing.base};
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`

type TButton = HTMLAttributes<HTMLButtonElement>

export const BackButton: FC<TButton> = () => {
  const navigate = useNavigate()
  const handlePrevPage = () => {
    navigate(-1)
  }
  return (
    <ButtonStyled onClick={handlePrevPage}>
      <Icon
        name="arrow_back_ios"
        wght={700}
        style={{ fontSize: `${font.base}` }}
      />
      Volver
    </ButtonStyled>
  )
}
