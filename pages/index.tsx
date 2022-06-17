import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import type { NextPage } from 'next'
import * as React from 'react'

import Page from 'components/common/Page'
import GradientButton from 'components/common/GradientButton'

const Home: NextPage = () => {
  return (
    <Page>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '90vh',
        }}
      >
        <Box my="auto">
          <Box>
            <Typography
              sx={{
                fontSize: { lg: '80px', md: '80px', sm: '56px', xs: '56px' },
                lineHeight: { lg: '96px', md: '96px', sm: '60px', xs: '60px' },
                fontWeight: 400,
                fontFamily: 'Roobert',
                textAlign: 'center',
              }}
            >
              Welcome to Squads
            </Typography>
          </Box>
          <Box sx={{ maxWidth: '560px', mx: 'auto', mt: 2 }}>
            <Typography
              sx={{
                fontSize: '24px',
                textAlign: 'center',
                fontWeight: 400,
              }}
              color="text.secondary"
            >
              Find, connect, and plan projects with your fellow community members
            </Typography>
          </Box>
          <Box display="flex" mt={5}>
            <Box mx="auto">
              <GradientButton href="/get-started">Get Started</GradientButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </Page>
  )
}

export default Home
