import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

export const GradientButton = styled(Button)`
  background: linear-gradient(88.41deg, #444cff 0%, #a93edc 100%);
  border-radius: 8px;
  font-size: 18px;
  height: 48px;
  padding: 0 24px;
  box-shadow: none;
  &:hover {
    opacity: 60%;
  }
  &:disabled {
    opacity: 50%;
    cursor: not-allowed;
  }
`

export default GradientButton
