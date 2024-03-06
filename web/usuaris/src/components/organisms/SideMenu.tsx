import { FC } from 'react'
import styled from 'styled-components'
import { FlexBox, colors, dimensions, font } from '@itacademy/ui'
import { icons } from '../../assets/icons'

const SideMenuStyled = styled(FlexBox)`
  height: 100%;
  margin-top: ${dimensions.spacing.lg};
  color: ${colors.black.black3};

  ul {
    list-style: none;
    padding: ${dimensions.spacing.sm};
  }

  li {
    font-size: ${font.xs};
    font-weight: ${font.medium};
    margin-bottom: ${dimensions.spacing.xxl};
  }
`

const LogoImage = styled.img`
  max-width: 7.25rem;
  height: auto;
`

export const SideMenu: FC = () => (
  <SideMenuStyled justify="space-between" align="start">
    <LogoImage src={icons.itLogo} alt="IT Academy" />
    <ul>
      <li>Usuari@s</li>
      <li>Mentores</li>
      <li>Connector</li>
      <li>Configuración</li>
    </ul>
    <div style={{ height: '9.4rem' }} />
  </SideMenuStyled>
)
