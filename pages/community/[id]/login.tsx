import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet';
import { Button, Card, CardContent, CardHeader, Container, Grid, Menu, MenuItem, Typography, Box, Snackbar,    } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import type { NextPage } from 'next';
import { useSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CommunityInfoShort from '../../../components/CommunityInfoShort';
import PageLoading from '../../../components/PageLoading';

import connectors, { ConnectorKey } from '../../../connectors';
import { useCommunity } from '../../../hooks/useCommunities';
import { useMemberInCommunity } from '../../../hooks/useMember';

const LoginPage: NextPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { activate, account } = useWeb3React();
    const [walletLoading, setWalletLoading] = useState(false);
    const [openSnackbar, setopenSnackbar] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const { data: community, isError: isCommunityError } = useCommunity(id);
  const { data: member } = useMemberInCommunity(
    id,
    `${session?.user?.profile.username}#${session?.user?.profile.discriminator}`
  );

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleWeb3Login = async (key: ConnectorKey) => {
    await activate(connectors[key]);
    setAnchorEl(null);
  };

  useEffect(() => {
      if (id && status === 'authenticated' && account) {
         
      if (member) {
        router.push(`/community/${id}`);
      } else {
        router.push(`/community/${id}/member/create`);
      }
      }
      let isCancelled = false;

      if (!isCancelled) {
          if (account) {
              setopenSnackbar(true);
          }
      }

      return () => {
          isCancelled = true;
      }

  }, [member, session, account, id]);

  useEffect(() => {
    if (isCommunityError) {
      router.push(`/community`);
    }
  }, [isCommunityError]);

  if (status === 'loading' || (status === 'authenticated' && account) || !community || walletLoading) {
    return <PageLoading />;
    }

    const handleCloseSnackbar = () => {
        setopenSnackbar(false);
    }

  return (
    <Container maxWidth="lg">
      {!account ? (
        <Grid container spacing={1} justifyContent="space-between" alignItems="center">
          <Grid item xs={12} sm={6}>
                      <Box>
                          <Box>
                          <Typography variant="font16" xs={{ fontWeight: 300,   }}>
                                  Forfront Studio 
                          </Typography>
                          </Box>
                          <Box>
                          <Typography variant="font18" xs={{ fontWeight: 600  }}  >
                              Member Directory.
                              <Image src="/images/BETA.svg" width={35} height={25} alt="logo" />
                              </Typography>
                          </Box>
                          <Box pt={5}>
                              <Typography variant="font40"  xs={{ fontWeight: 400, lineHeight: "56px",  }}>
                                  Find, connect, and plan projects with community members
                          </Typography>
                          </Box>
            </Box>
                         
          </Grid>
          <Grid item xs={12} sm={6}>
                      <Card sx={{ boxShadow: "2px 10px 45px #E5ECE3;"}}>
              <CardHeader
                avatar={<AccountBalanceWallet />}
                title="Connect Wallet"
                titleTypographyProps={{ variant: 'h6' }}
                sx={{ px: 10, pt: 1, color: "#4AAA7B"}}
              />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 10, pt: 0 }}>
                <Typography variant="body1" textAlign="center" sx={{ width: '80%', py: 2}}>
                                  To unlock Member Directory (BETA), connect your wallet and create a profile with your Discord account!
                </Typography>
                <CommunityInfoShort community={community} />
                              <Button variant="contained" onClick={handleClick} sx={{
                                  mb: 8, background: '#83BCFF', color: "#000", fontWeight: 700 , ':hover': {
                                      opacity: .7, background: '#83BCFF', color: "#000"
                                  }, }} endIcon={<WalletConnectIcon />}>
                  Connect Wallet
                </Button>
                <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
                                  <MenuItem onClick={() => handleWeb3Login('injected')} sx={{width:'200px'}}>
                    <Image src="/images/metamask.svg" width={40} height={20} alt="metamask" />
                    <span>Metamask</span>
                  </MenuItem>
                  <MenuItem onClick={() => handleWeb3Login('walletConnect')}>
                    <Image src="/images/walletconnect.svg" width={40} height={20} alt="walletConnect" />
                    <span>WalletConnect</span>
                  </MenuItem>
                  <MenuItem onClick={() => handleWeb3Login('coinbaseWallet')}>
                    <Image src="/images/coinbase.svg" width={40} height={20} alt="coinbaseWallet" />
                    <span>Coinbase Wallet</span>
                  </MenuItem>
                </Menu>
              </CardContent>
            </Card>
            </Grid>
                  
                 
        </Grid>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={6}>
                          <Card sx={{ boxShadow: "2px 10px 45px #E5ECE3"}}>
              <CardHeader
                avatar={<Image src="/images/DiscordGreen.svg" alt="discord" width={20} height={20} />}
                title="Login with Discord"
                titleTypographyProps={{ variant: 'h6' }}
                sx={{ px: 4, pt: 2, color: '#4AAA7B' }}
              />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 4, pt: 0 }}>
                <Typography variant="body1" textAlign="center" sx={{ width: '80%', py: 5}}>
                  Login with your Discord account to help us verify that you're a member of the community.
                  <br />
                  We will bring you right back after logging in!
                </Typography>
                <Button variant="contained" color="primary" onClick={() => signIn('discord')} sx={{ mb: 20 }}>
                  Login with Discord
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
              )}

      
          <Snackbar
              open={openSnackbar}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
       
          >
              <Box  sx={{ background: '#4AAA99' , color : "#fff" , px : 3 , py : 2 }}>
                  Nice! Your wallet is now connected.
              </Box >
          </Snackbar>
    </Container>
  );
};

export default LoginPage;


const WalletConnectIcon = () => {
    return (
        <Box  >
            <Image src="/images/Line1.svg" width={20} height={17} alt="logo" />
            <Image src="/images/Vector.svg" width={20} height={17} alt="logo" />
        </Box>
        )
}
