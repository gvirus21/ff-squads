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
  Snackbar,
  useMediaQuery,
  useTheme,
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
import { useCommunity } from '../../../hooks/useCommunity'
import { useMemberInCommunity } from '../../../hooks/useMember'

import Page from '../../../components/page'

const LoginPage: NextPage = () => {
  const [openSnackbar, setopenSnackbar] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

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
    let isCancelled = false

    if (!isCancelled) {
      if (account) {
        setopenSnackbar(true)
      }
    }

    return () => {
      isCancelled = true
    }
  }, [member, session, account, id])

  useEffect(() => {
    if (isCommunityError) {
      router.push(`/community`)
    }
  }, [isCommunityError])

  const handleCloseSnackbar = () => {
    setopenSnackbar(false)
  }

  if (status === 'loading' || (status === 'authenticated' && account) || !community) {
    return <PageLoading />
  }

  return (
    <Page title="Login | Member Directory | Forefront">
      <Container maxWidth="lg">
        {!account ? (
          <Grid container spacing={4} justifyContent="space-between" my={'auto'}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ mt: 4, fontWeight: 300 }}>
                Forefront Studio
              </Typography>
              <Box display="flex">
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Member Directory.
                </Typography>
                <Typography variant="caption" color="#a3ecaa" sx={{ ml: 0.5 }}>
                  BETA
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ mt: 6 }}>
                Find, connect, and plan projects with community members
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mb: { sm: 10, xs: 10, md: 0 } }}>
              <Card>
                <CardHeader
                  avatar={<AccountBalanceWallet color="success" />}
                  title="Connect Wallet"
                  titleTypographyProps={{
                    color: '#CDFCB1',
                    fontWeight: 600,
                    fontSize: '16px',
                  }}
                />
                <CardContent
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: { sm: 0, md: 12 } }}
                >
                  <Typography variant="body1" textAlign="center" fontWeight={300} sx={{ width: '80%', mt: 8 }}>
                    To unlock Member Directory (BETA), connect your wallet and create a profile with your Discord
                    account!
                  </Typography>
                  <CommunityInfo community={community} />
                  <Button variant="contained" color="secondary" onClick={handleClick} sx={{ mt: 2, mb: 2 }}>
                    Connect Wallet
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ borderColor: '#11151f', background: '#11151f', width: '2px', margin: '5px 2px 5px 10px' }}
                    />
                    <KeyboardArrowDown />
                  </Button>
                  <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
                    <MenuItem onClick={() => handleWeb3Login('injected')} sx={{ width: '200px' }}>
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
          <Grid
            container
            spacing={4}
            justifyContent="center"
            sx={{ mt: { sm: 'auto', xs: 0, md: 'auto' }, mb: { sm: 20, xs: 20, md: 5 } }}
          >
            <Grid item xs={12} sm={6}>
              <Card>
                <CardHeader
                  avatar={<DiscordIcon color="success" sx={{ mt: 1 }} />}
                  title="Login with Discord"
                  titleTypographyProps={{
                    color: '#CDFCB1',
                    fontWeight: 600,
                    fontSize: '16px',
                  }}
                />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography
                    variant="body1"
                    color="#F5FFF4"
                    textAlign="center"
                    sx={{ width: '80%', my: 5, fontWeight: 300 }}
                  >
                    Login with your Discord account to help us verify that you&apos;re a member of the community.
                    <br />
                    We will bring you right back after logging in!
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => signIn('discord')}
                    sx={{
                      mb: { xs: 5, sm: 5, md: 10 },
                      background: '#3E41BB',
                      ':hover': {
                        opacity: 0.7,
                        background: '#3E41BB',
                      },
                    }}
                  >
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
          anchorOrigin={{ vertical: 'bottom', horizontal: isMobile ? 'center' : 'right' }}
        >
          <Box
            sx={{
              background: '#A3ECAA',
              px: 3,
              py: 2,
              borderRadius: '5px',
              boxShadow: ' 0px 5px 10px rgba(0, 0, 0, 0.12)',
              mb: { xs: 14, sm: 14, md: 0 },
            }}
          >
            <Typography sx={{ color: '#11151F', fontWeight: 300 }}>Nice! Your wallet is now connected.</Typography>
          </Box>
        </Snackbar>
      </Container>
    </Page>
  )
}

export default LoginPage
