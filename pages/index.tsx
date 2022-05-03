
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { NextPage } from 'next';
import * as React from 'react';
import Link from 'next/link'



const Home: NextPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
              ForeFront Member Directory
      </Typography>
      <Typography variant="h4" component="h4" gutterBottom>
              Visit the Community Page <Link href="/community" >here</Link>
      </Typography>
    </Box>
  )
}

export default Home
