import { Box, Button, Card, CardContent, CardHeader, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import type { NextPage } from 'next';
import { useSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { WEB3_CONNECTOR_KEY } from '../../../config/constants';
import connectors, { ConnectorKey } from '../../../connectors';

const LoginPage: NextPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { activate, active: metamaskActive } = useWeb3React();
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleWeb3Login = (key: ConnectorKey) => {
    activate(connectors[key]);
    window.localStorage.setItem(WEB3_CONNECTOR_KEY, key);
    setAnchorEl(null);
  };

  useEffect(() => {
    if (id && status === 'authenticated' && metamaskActive) {
      router.push(`/community/${id}/create`);
    }
  }, [session, metamaskActive, id]);

  if (status === 'authenticated' && metamaskActive) return null;

  return (
    <Box>
      {!metamaskActive ? (
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader title="Connect Wallet" />
              <CardContent>
                <Typography variant="body1" textAlign="center" sx={{ width: '80%', py: 5 }}>
                  Connect your wallet to get access to the community's directory
                </Typography>
                <Button variant="contained" color="primary" onClick={handleClick}>
                  Connect Wallet
                </Button>
                <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
                  <MenuItem onClick={() => handleWeb3Login('injected')}>
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
            <Card>
              <CardHeader title="Login with Discord" />
              <CardContent>
                <Typography variant="body1" textAlign="center" sx={{ width: '80%', py: 5 }}>
                  Login with your Discord account to help us verify that you're a member of the community.
                  <br />
                  We will bring you right back after logging in!
                </Typography>
                <Button variant="contained" color="primary" onClick={() => signIn('discord')}>
                  Login with Discord
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default LoginPage;
