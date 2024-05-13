import { Button, FlexBox, colors, dimensions, font } from '@itacademy/ui'
import styled from 'styled-components'
import { UserStatus } from '../../../types'

export const TableContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`
export const CellStyled = styled.span``

type TDisabled = {
  disabled: boolean | undefined
}

export const DisabledStyled = styled.div<TDisabled>`
  opacity: ${({ disabled }) => {
    if (!disabled) return '1'
    return '0.6'
  }};
`

export const IconStyled = styled.img`
  padding-left: ${dimensions.spacing.xxxs};
`

type TStatusStyled = {
  status: UserStatus
}

export const StatusStyled = styled.div<TStatusStyled>`
  width: max-content;
  padding: ${dimensions.spacing.xxxs} ${dimensions.spacing.base}
    ${dimensions.spacing.xxxs} ${dimensions.spacing.base};
  border-radius: ${dimensions.borderRadius.xs};
  background-color: ${({ status }) => {
    switch (status) {
      case UserStatus.PENDING:
        return '#FCD9D9'
      case UserStatus.BLOCKED:
        return '#FCDEC0'
      default:
        return '#C6F1DA'
    }
  }};
  font-weight: ${font.medium};
  color: ${colors.black.black3};
`

export const ButtonStyled = styled(Button)`
  width: auto;
  padding: ${dimensions.spacing.xxxs} ${dimensions.spacing.base}
    ${dimensions.spacing.xxxs} ${dimensions.spacing.base};
  border: solid 1px ${colors.black.black3};
  font-weight: ${font.medium};
  color: ${colors.black.black3};

  &:disabled {
    opacity: 0.6;
  }
`
export const ActionsHeader = styled(FlexBox)`
  padding-right: ${dimensions.spacing.xxl};
`

export const ActionsContainer = styled(FlexBox)`
  width: auto;
  min-width: 11rem;
`

export const DeleteButton = styled(Button)`
  width: ${dimensions.spacing.xl};
  padding: ${dimensions.spacing.xxxs} ${dimensions.spacing.base}
    ${dimensions.spacing.xxxs} ${dimensions.spacing.base};
  background-color: #f4ebec;
  border: solid 1px #d9d9d9;

  &:disabled {
    opacity: 0.6;
  }
`

export const DeleteIcon = styled.img`
  height: ${dimensions.spacing.base};
`
