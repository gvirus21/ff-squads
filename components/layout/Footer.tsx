import React from 'react'
import { Typography, Box, Link } from '@mui/material'

export default function Footer() {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        py: 0,
        my: 0,
        background: 'linear-gradient(180deg, #1F2023 0%, #1F2023 100%)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { lg: 'row', md: 'row', sm: 'column', xs: 'column' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: {
              lg: 'flex-start',
              md: 'flex-start',
              sm: 'center',
              xs: 'center',
            },
            p: 1,
            mx: 1,
          }}
        >
          <Box>
            <Link href="/" underline="none">
              <Typography color="text.secondary" sx={{ fontSize: '14px' }}>
                Help & Support
              </Typography>
            </Link>
          </Box>
          <Box ml={3}>
            <Link href="/" underline="none">
              <Typography color="text.secondary" sx={{ fontSize: '14px' }}>
                Feedback
              </Typography>
            </Link>
          </Box>
          <Box ml={3}>
            <Link href="/" underline="none">
              <Typography color="text.secondary" sx={{ fontSize: '14px' }}>
                About
              </Typography>
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            p: 1,
            mx: 1,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Box
            sx={{
              px: 1,
              mr: { lg: 1, md: 1, sm: 2, xs: 2 },
            }}
          >
            <Link href="/" underline="none">
              <img src="/images/PoweredBy.svg" alt="Powered By Forefront" />
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
