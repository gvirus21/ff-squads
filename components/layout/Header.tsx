import React from 'react'
import { Toolbar, Link, Box, Typography } from '@mui/material'

export default function Header() {
  return (
    <Toolbar
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Link href="/" underline="none">
          <Box sx={{ display: 'flex' }}>
            <Box>
              <Typography variant="h4">Squads</Typography>
            </Box>
            <Box>
              <Typography variant="body1" color="text.secondary" p={0.5}>
                by forefront
              </Typography>
            </Box>
          </Box>
        </Link>
      </Box>

      <Box>
        <Link href="/" underline="none">
          <Typography variant="body1" p={0.5}>
            FAQ
          </Typography>
        </Link>
      </Box>
    </Toolbar>
  )
}
