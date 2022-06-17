import { Box, Container, Typography, Snackbar, useMediaQuery, useTheme } from '@mui/material'
import type { NextPage } from 'next'
import { useSession, signIn } from 'next-auth/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAccount } from 'wagmi'

import GradientButton from 'components/common/GradientButton'
import PageLoading from 'components/common/PageLoading'
import Page from 'components/common/Page'

const LoginPage: NextPage = () => {
  const [openSnackbar, setopenSnackbar] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const router = useRouter()
  const { data: account, isLoading } = useAccount()
  const { data: session, status } = useSession()

  const { ref } = router.query

  const handleCloseSnackbar = () => {
    setopenSnackbar(false)
  }

  if (status === 'loading' || isLoading) {
    return <PageLoading />
  }

  if (account && status === 'authenticated') {
    if (ref === 'creator') {
      router.push('/community/forefront?ref=creator')
    } else {
      router.push('/community')
    }
    return <PageLoading />
  }

  return (
    <Page title="Login | Member Directory | Forefront">
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '90vh',
        }}
      >
        {!account ? (
          <Box sx={{ my: 'auto', textAlign: 'center' }}>
            <Box>
              <img src="/images/discord.svg" alt="Connect Discord" width="56px" />
            </Box>
            <Box mt={3}>
              <Typography sx={{ fontSize: '32px', lineHeight: '38px' }}>Connect wallet & Discord</Typography>
            </Box>

            <Box
              sx={{
                background: '#27282B',
                border: '1px solid #303236',
                boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)',
                borderRadius: '12px',
                mt: 5,
                py: 6,
                px: 5,
                mx: { lg: 'auto', md: 'auto', sm: 1, xs: 1 },
                textAlign: 'center',
              }}
            >
              <Typography color="text.secondary">
                To unlock Squads, please connect your wallet and your Discord account!
              </Typography>
            </Box>

            <Box sx={{ my: 5, display: 'flex' }}>
              <Box mx="auto">
                <ConnectButton.Custom>
                  {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
                    return (
                      <div
                        {...(!mounted && {
                          'aria-hidden': true,
                          style: {
                            opacity: 0,
                            pointerEvents: 'none',
                            userSelect: 'none',
                          },
                        })}
                      >
                        {(() => {
                          if (!mounted || !account || !chain) {
                            return <GradientButton onClick={openConnectModal}>Connect Wallet</GradientButton>
                          }

                          return (
                            <div style={{ display: 'flex', gap: 12 }}>
                              <GradientButton onClick={openAccountModal} type="button">
                                {account.displayName}
                              </GradientButton>
                            </div>
                          )
                        })()}
                      </div>
                    )
                  }}
                </ConnectButton.Custom>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box my="auto" pb={15}>
            <Box display="flex">
              <Box mx="auto">
                <img src="/images/discord.svg" alt="Connect Discord" width="56px" />
              </Box>
            </Box>

            <Box display="flex" mt={1.5}>
              <Box mx="auto">
                <Typography
                  sx={{
                    fontSize: '32px',
                    lineHeight: '38px',
                  }}
                >
                  Login with Discord
                </Typography>
              </Box>
            </Box>
            <Box display="flex" mt={5}>
              <Box
                sx={{
                  mx: 'auto',
                  maxWidth: '560px',
                  background: '#27282B',
                  border: '1px solid #303236',
                  boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)',
                  borderRadius: '12px',
                  pb: 6,
                }}
              >
                <Box
                  sx={{
                    pt: { lg: 6, md: 6, sm: 3, xs: 3 },
                    px: { lg: 5, md: 5, sm: 3, xs: 3 },
                    textAlign: 'center',
                  }}
                >
                  <Typography color="text.secondary">
                    {`Login with your Discord account to help us verify that you're a member of the community. We will bring you right back after logging in!`}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    px: { lg: 5, md: 5, sm: 3, xs: 3 },
                  }}
                  mt={4}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1 }}>
                    <Box sx={{ mx: 1 }}>
                      <img src="/images/right.svg" alt="Check" height="16px" />
                    </Box>
                    <Box sx={{ ml: 1, pr: { lg: 0, md: 0, sm: 1, xs: 2 } }}>
                      <Typography
                        sx={{
                          fontSize: '16px',
                          lineHeight: '19px',
                          fontWeight: 400,
                        }}
                      >
                        Member Directory will request access your username, avatar, and banner
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                    <Box sx={{ mx: 1 }}>
                      <img src="/images/right.svg" alt="Check" height="16px" />
                    </Box>
                    <Box sx={{ ml: 1, pr: { lg: 0, md: 0, sm: 1, xs: 2 } }}>
                      <Typography
                        sx={{
                          fontSize: '16px',
                          lineHeight: '19px',
                          fontWeight: 400,
                        }}
                      >
                        Member Directory will request access to your email address
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box display="flex" mt={5}>
              <Box mx="auto">
                <GradientButton onClick={() => signIn('discord')}>Authenticate Discord</GradientButton>
              </Box>
            </Box>
          </Box>
        )}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: isMobile ? 'center' : 'right',
          }}
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
