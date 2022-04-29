import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet';
import { Button, Card, CardContent, CardHeader, Container, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import type { NextPage } from 'next';
import { useSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CommunityInfo from '../../../components/CommunityInfo';
import PageLoading from '../../../components/PageLoading';

import connectors, { ConnectorKey } from '../../../connectors';
import { useCommunity } from '../../../hooks/useCommunities';
import { useMemberInCommunity } from '../../../hooks/useMember';

const LoginPage: NextPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { activate, account } = useWeb3React();
  const [walletLoading, setWalletLoading] = useState(false);
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
  }, [member, session, account, id]);

  useEffect(() => {
    if (isCommunityError) {
      router.push(`/community`);
    }
  }, [isCommunityError]);

  if (status === 'loading' || (status === 'authenticated' && account) || !community || walletLoading) {
    return <PageLoading />;
  }

  return (
    <Container maxWidth="lg">
      {!account ? (
        <Grid container spacing={4} justifyContent="space-between" alignItems="center">
          <Grid item xs={12} sm={6}>
            <CommunityInfo community={community} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader
                avatar={<AccountBalanceWallet />}
                title="Connect Wallet"
                titleTypographyProps={{ variant: 'h6' }}
                sx={{ px: 10, pt: 10 }}
              />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 10, pt: 0 }}>
                <Typography variant="body1" textAlign="center" sx={{ width: '80%', py: 10 }}>
                  Connect your wallet to get access to the community's directory
                </Typography>
                <Button variant="contained" color="primary" onClick={handleClick} sx={{ mb: 8 }}>
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
              <CardHeader
                avatar={<Image src="/images/Discord.svg" alt="discord" width={20} height={20} />}
                title="Login with Discord"
                titleTypographyProps={{ variant: 'h6' }}
                sx={{ px: 4, pt: 8 }}
              />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 4, pt: 0 }}>
                <Typography variant="body1" textAlign="center" sx={{ width: '80%', py: 20 }}>
                  Login with your Discord account to help us verify that you're a member of the community.
                  <br />
                  We will bring you right back after logging in!
                </Typography>
                <Button variant="contained" color="primary" onClick={() => signIn('discord')} sx={{ mb: 4 }}>
                  Login with Discord
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default LoginPage;
