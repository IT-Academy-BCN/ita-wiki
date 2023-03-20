import styled from 'styled-components'
import colors from '../../styles/colors'
import dimensions from '../../styles/dimensions'

type TErrorMessage = {
  margin: number
  fontSize: string
  fontStyle: string
  color: string
}
const ErrorMessage = styled.p<TErrorMessage>`
  margin: 0px 0px 8px 10px;
  font-size: ${dimensions.spacing.sm};
  font-style: italic;
  color: ${colors.error};
`

export default ErrorMessage
