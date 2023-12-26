import { FC, HTMLAttributes } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Icon } from './Icon'
import { font, device, dimensions } from '../../styles'

const ButtonStyled = styled.button`
  margin-left: 0;
  font-weight: ${font.medium};
  display: flex;
  align-items: center;
  position: absolute;
  top: ${dimensions.spacing.base};
  left: ${dimensions.spacing.xxxs};
  border: none;
  background-color: transparent;

  @media only ${device.Tablet} {
    margin-left: 2%;
    cursor: pointer;
    position: static;
    top: 0;
    left: 0;
  }

  @media only ${device.Laptop} {
    margin-left: 5%;
  }

  @media only ${device.Desktop} {
    margin-left: 7%;
  }

  &:hover {
    opacity: 0.7;
  }
`

type TButton = HTMLAttributes<HTMLButtonElement>

export const BackButton: FC<TButton> = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()
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
            {t('Volver')}

        </ButtonStyled>
    )
}
