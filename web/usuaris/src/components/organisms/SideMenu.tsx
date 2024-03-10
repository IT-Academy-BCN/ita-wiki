import { FC } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FlexBox, colors, dimensions, font } from '@itacademy/ui'
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

const ImgStyled = styled.img`
  height: 30px;
  margin-right: ${dimensions.spacing.xxxs};
`

const LogoImage = styled.img`
  max-width: 7.25rem;
  height: auto;
`

const menu = [
  {
    id: 1,
    title: 'Usuari@s',
    icon: icons.user,
    link: '/#',
  },
  {
    id: 2,
    title: 'Mentores',
    icon: icons.user,
    link: '/#',
  },
  {
    id: 3,
    title: 'Connector',
    icon: icons.thunder,
    link: '/#',
  },
  {
    id: 4,
    title: 'Configuración',
    icon: icons.settings,
    link: '/#',
  },
]

export const SideMenu: FC = () => (
  <SideMenuStyled justify="space-between" align="start">
    <LogoImage src={icons.itLogo} alt="IT Academy" />
    <ul>
      {menu.map((item) => (
        <li key={item.id}>
          <Grid>
            <ImgStyled src={item.icon} alt={item.title} title={item.title} />
            <LinkCategory to={item.link} state={{}} key={1} tabIndex={0}>
              <CategoryStyled tabIndex={0}>{item.title}</CategoryStyled>
            </LinkCategory>
          </Grid>
        </li>
      ))}
    </ul>
    <div style={{ height: '79px' }} />
  </SideMenuStyled>
)

// import { FC } from 'react'
// import styled from 'styled-components'
// import { FlexBox, colors, dimensions, font } from '@itacademy/ui'
// import { icons } from '../../assets/icons'

// const SideMenuStyled = styled(FlexBox)`
//   height: 100%;
//   margin-top: ${dimensions.spacing.lg};
//   color: ${colors.black.black3};

//   ul {
//     list-style: none;
//     padding: ${dimensions.spacing.sm};
//   }

//   li {
//     font-size: ${font.xs};
//     font-weight: ${font.medium};
//     margin-bottom: ${dimensions.spacing.xxl};
//   }
// `

// const LogoImage = styled.img`
//   max-width: 7.25rem;
//   height: auto;
// `

// export const SideMenu: FC = () => (
//   <SideMenuStyled justify="space-between" align="start">
//     <LogoImage src={icons.itLogo} alt="IT Academy" />
//     <ul>
//       <li>Usuari@s</li>
//       <li>Mentores</li>
//       <li>Connector</li>
//       <li>Configuración</li>
//     </ul>
//     <div style={{ height: '9.4rem' }} />
//   </SideMenuStyled>
// )

// a {
//   color: ${colors.gray.gray3};
//   text-decoration: none;
// }

// a:hover{
//   color: ${colors.primary};
// }

// a&::before {
//   content: '●';
//   font-size: larger;
//   color: ${colors.primary};
//   margin-right: 0.3rem;
// }

// a:focus {
//   color: ${colors.gray.gray1};
// }
