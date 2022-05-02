import { Box, CircularProgress } from '@mui/material'

export const PageLoading = () => (
  <Box display="flex" alignItems="center" justifyContent="center" height="80vh" width="100%">
    <CircularProgress color="primary" />
  </Box>
)

export default PageLoading
