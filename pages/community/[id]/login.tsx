import { KeyboardArrowDown, AccountBalanceWallet } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import type { NextPage } from 'next'
import { useSession, signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import CommunityInfo from '../../../components/CommunityInfo'
import DiscordIcon from '../../../components/icons/DiscordIcon'
import PageLoading from '../../../components/PageLoading'
import connectors, { ConnectorKey } from '../../../connectors'
import { useCommunity } from '../../../hooks/useCommunities'
import { useMemberInCommunity } from '../../../hooks/useMember'

const LoginPage: NextPage = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { activate, account } = useWeb3React()
  const { data: session, status } = useSession()
  const router = useRouter()
  const { id } = router.query
  const { data: community, isError: isCommunityError } = useCommunity(id)
  const { data: member } = useMemberInCommunity(
    id,
    `${session?.user?.profile.username}#${session?.user?.profile.discriminator}`
  )

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleWeb3Login = async (key: ConnectorKey) => {
    await activate(connectors[key])
    setAnchorEl(null)
  }

  useEffect(() => {
    if (id && status === 'authenticated' && account) {
      if (member) {
        router.push(`/community/${id}`)
      } else {
        router.push(`/community/${id}/member-create`)
      }
    }
  }, [member, session, account, id])

  useEffect(() => {
    if (isCommunityError) {
      router.push(`/community`)
    }
  }, [isCommunityError])

  if (status === 'loading' || (status === 'authenticated' && account) || !community) {
    return <PageLoading />
  }

  return (
    <Container maxWidth="lg">
      {!account ? (
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" sx={{ mt: 4 }}>
              Forefront Studio
            </Typography>
            <Box display="flex">
              <Typography variant="h6">Member Directory.</Typography>
              <Typography variant="caption" color="#a3ecaa" sx={{ ml: 0.5 }}>
                BETA
              </Typography>
            </Box>
            <Typography variant="h3" sx={{ mt: 7 }}>
              Find, connect, and plan projects with community members
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader
                avatar={<AccountBalanceWallet color="success" />}
                title="Connect Wallet"
                titleTypographyProps={{
                  color: '#CDFCB1',
                  fontWeight: 600,
                }}
              />
              <CardContent
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: { sm: 0, md: 12 } }}
              >
                <Typography variant="body1" textAlign="center" fontWeight={300} sx={{ width: '80%', py: 8 }}>
                  To unlock Member Directory (BETA), connect your wallet and create a profile with your Discord account!
                </Typography>
                <CommunityInfo community={community} />
                <Button variant="contained" color="secondary" onClick={handleClick} sx={{ mt: 7, mb: 2 }}>
                  Connect Wallet
                  <Divider orientation="vertical" flexItem sx={{ borderColor: '#11151f', ml: 1, mr: 0.5 }} />
                  <KeyboardArrowDown />
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
                avatar={<DiscordIcon color="success" />}
                title="Login with Discord"
                titleTypographyProps={{
                  color: '#CDFCB1',
                  fontWeight: 600,
                }}
              />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body1" textAlign="center" sx={{ width: '80%', py: 8 }}>
                  Login with your Discord account to help us verify that you&apos;re a member of the community.
                  <br />
                  We will bring you right back after logging in!
                </Typography>
                <Button variant="contained" color="primary" onClick={() => signIn('discord')} sx={{ mb: 24 }}>
                  Login with Discord
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  )
}

export default LoginPage
