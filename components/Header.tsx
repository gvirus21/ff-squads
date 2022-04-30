import { AppBar, Box, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useWeb3React } from '@web3-react/core';
import Image from 'next/image';
import UserProfile from './UserProfile';
import Link from 'next/link'

const AppBarWrapper = styled(AppBar)(({ theme }) => ({
    background: '#fff',
    boxShadow: 'none'
}));

export default function Header() {
  const { active } = useWeb3React();

  return (
    <AppBarWrapper position="fixed">
      <Toolbar>
              <Link href="/">
                  <Image src="/images/logo.svg" width={170} height={17} alt="logo" style={{cursor:"pointer"}} />
               </Link>
                <Box sx={{ marginLeft: 'auto' }}>{active && <UserProfile />}</Box>
      </Toolbar>
    </AppBarWrapper>
  );
}
