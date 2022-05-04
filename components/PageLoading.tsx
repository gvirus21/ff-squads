import { Box, CircularProgress } from '@mui/material'

export const PageLoading = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    height="100vh"
    width="100%"
    position="absolute"
    sx={{ top: 0, left: 0 }}
  >
    <CircularProgress color="primary" />
  </Box>
)

export default PageLoading
