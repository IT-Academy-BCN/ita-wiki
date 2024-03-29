import { FC } from 'react'
import { FlexBox, Icon, colors, dimensions, font } from '@itacademy/ui'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { icons } from '../../assets/icons'

const LinkCategory = styled(Link)`
  color: ${colors.gray.gray3};
  font-size: ${font.xs};
  font-weight: 600;
  font-family: ${font.fontFamily};
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: ${colors.primary};
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${dimensions.spacing.xxxs};
  align-items: center;
`

const SideMenuStyled = styled(FlexBox)`
  height: 100%;
  min-width: 12rem;
  margin-top: ${dimensions.spacing.lg};

  ul {
    list-style: none;
    padding: ${dimensions.spacing.xxxs};
  }

  li {
    font-size: ${font.xs};
    font-weight: ${font.medium};
    margin-bottom: ${dimensions.spacing.xxl};

    &::before {
      font-size: larger;
      color: ${colors.primary};
      margin-right: 0.3rem;
    }
  }
`

const CategoryStyled = styled.span`
  color: ${colors.gray.gray3};
  font-size: ${font.xs};
  font-weight: 600;
  font-family: ${font.fontFamily};
  cursor: pointer;
  transition: transform 0.3s ease;
  outline: none;
  display: inline-block;
  border: 0px solid black;
  tabindex: 0;

  &:hover {
    color: ${colors.primary};
    transform: scale(1.05);
  }

  &:focus {
    color: ${colors.black.black1};
  }

  &:focus::before {
    content: '●';
    font-size: larger;
    color: ${colors.primary};
    margin-right: 0.3rem;
  }
`

const ImgStyled = styled(Icon)`
  height: 30px;
  margin-right: ${dimensions.spacing.xxxs};

  &[data-testid] {
    content: attr(data-testid);
`

const LogoImage = styled.img`
  max-width: 7.25rem;
  height: auto;
`

const menu = [
  {
    id: 1,
    title: 'Usuarios',
    icon: 'person',
    link: '/#',
  },
  {
    id: 2,
    title: 'Mentores',
    icon: 'person',
    link: '/#',
  },
  {
    id: 3,
    title: 'Connector',
    icon: 'bolt',
    link: '/#',
  },
  {
    id: 4,
    title: 'Configuración',
    icon: 'settings',
    link: '/#',
  },
]

export const SideMenu: FC = () => {
  const { t } = useTranslation()

  return (
    <SideMenuStyled justify="space-between" align="start">
      <LogoImage src={icons.itLogo} alt="IT Academy" />
      <ul>
        {menu.map((item) => (
          <li key={item.id}>
            <Grid>
              <ImgStyled
                data-testid={item.icon}
                name={item.icon}
                color={`${colors.black.black1}`}
              />
              <LinkCategory to={item.link} state={{}} key={1} tabIndex={0}>
                <CategoryStyled tabIndex={0}>{t(item.title)}</CategoryStyled>
              </LinkCategory>
            </Grid>
          </li>
        ))}
      </ul>
      <div style={{ height: '79px' }} />
    </SideMenuStyled>
  )
}
