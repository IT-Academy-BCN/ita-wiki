import { FC, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { FlexBox, colors, device, dimensions, font } from '../../../styles'
import { Icon, Text } from '../../atoms'
import { NActions, TNotification, TVariant } from './types'
import { NotificationsContext } from './context'
import { useNotifications } from './useNotifications'

const ContainerStyled = styled(FlexBox)<{ variant: TVariant }>`
  flex-direction: row;
  justify-content: space-between;
  align-self: end;
  color: ${colors.white};
  width: 50vw;
  padding: ${dimensions.spacing.xxs};
  border-radius: ${dimensions.borderRadius.base};
  margin: ${dimensions.spacing.xs};
  background-color: ${({ variant }) =>
    variant ? colors[variant] : colors.primary};

  @media only ${device.Laptop} {
    width: 25vw;
    margin-top: ${dimensions.spacing.base};
    margin-bottom: ${dimensions.spacing.base};
  }
`

const ContentStyled = styled(FlexBox)`
  align-items: start;
`

const HeaderStyled = styled.header`
  font-weight: ${font.medium};
  margin: ${dimensions.spacing.base};
  margin-bottom: 0;
  font-size: ${font.h2};
`

const TextStyled = styled(Text)`
  margin: ${dimensions.spacing.base};
`

const IconStyled = styled(Icon)`
  cursor: pointer;
  scale: 1.5;
  margin: ${dimensions.spacing.base};
`

const Notification: FC<TNotification> = ({
  id,
  title,
  description,
  autoClose = true,
  autoCloseTimeOut,
  variant,
}: TNotification) => {
  const { dispatch } = useContext(NotificationsContext)
  const { removeNotification } = useNotifications()

  useEffect(() => {
    if (autoClose) {
      setTimeout(() => {
        dispatch({
          type: NActions.removeNotification,
          payload: { id },
        })
      }, autoCloseTimeOut)
    }
  }, [autoClose, autoCloseTimeOut, dispatch, id])

  return (
    <ContainerStyled variant={variant} data-testid="notification-test">
      <ContentStyled>
        <HeaderStyled>{title}</HeaderStyled>
        <TextStyled color={colors.white}>{description}</TextStyled>
      </ContentStyled>
      <IconStyled
        name="close"
        wght={700}
        onClick={() => removeNotification(id)}
      />
    </ContainerStyled>
  )
}

export default Notification
