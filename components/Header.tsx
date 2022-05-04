import { AppBar, Box, Toolbar, useMediaQuery, useTheme,  IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useWeb3React } from '@web3-react/core';
import Image from 'next/image';
import UserProfile from './UserProfile';
import Link from 'next/link'
import React from 'react'
 
 

import MobileHeader from './MobileHeader';


const AppBarWrapper = styled(AppBar)(({ theme }) => ({
  background: '#11151F',
  boxShadow: '4px 10px 70px 0px rgba(186, 195, 185, 0.15)',
}))

export default function Header() {
 

  const theme = useTheme();

  const { active } = useWeb3React();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBarWrapper position="fixed">
      <Toolbar>
              <Link href="/">
                  <Image src="/images/logo.png" width={170} height={17} alt="logo" style={{cursor:"pointer"}} />
              </Link>
              {active && 
              < Box sx={{ marginLeft: 'auto' }}>
              {isMobile ? (
                   <MobileHeader/>
              )
                  :
                   <UserProfile /> 
              }
              </Box>}
      </Toolbar>
    </AppBarWrapper>
  )
}
