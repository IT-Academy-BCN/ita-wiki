import styled from 'styled-components'
import { FlexBox, colors, dimensions, font } from '../../styles'
import { Text } from '../atoms'

const AvatarContainerStyled = styled(FlexBox)`
  margin-top: ${dimensions.spacing.sm};

  ${Text} {
    margin: 0rem;
  }

  img {
    margin-left: -0.3rem;
  }
`
type TAvatarInfo = {
  createdBy: string
  createdOn: string
  img: string
}

export const AvatarInfo = ({ createdBy, createdOn, img }: TAvatarInfo) => (
  <AvatarContainerStyled direction="row" justify="flex-end">
    <img src={img} alt="Avatar icon" />
    <Text fontWeight="bold" color={colors.gray.gray4} fontSize={font.xss}>
      {createdBy},{' '}
      {new Date(createdOn).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
    </Text>
  </AvatarContainerStyled>
)
