import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'

import { wallet, connectorsForWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { chain, createClient, configureChains, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import Layout from 'components/layout'
import createEmotionCache from 'config/createEmotionCache'
import theme from 'config/theme'

import '@rainbow-me/rainbowkit/styles.css'
import 'styles/fonts.css'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const { chains } = configureChains(
  [chain.mainnet],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
)

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      wallet.metaMask({ chains }),
      wallet.coinbase({ chains, appName: 'Squads by Forefront' }),
      wallet.rainbow({ chains }),
      wallet.walletConnect({ chains }),
    ],
  },
])

const wagmiClient = createClient({
  connectors,
  autoConnect: true,
})

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider
              chains={chains}
              theme={darkTheme({
                accentColor: 'linear-gradient(88.41deg, #444cff 0%, #a93edc 100%)',
                accentColorForeground: 'white',
                borderRadius: 'small',
                fontStack: 'system',
              })}
              appInfo={{
                appName: 'Squads by Forefront',
                learnMoreUrl: 'https://forefront.market/',
              }}
            >
              <CacheProvider value={emotionCache}>
                <Head>
                  <meta name="viewport" content="initial-scale=1, width=device-width" />
                </Head>
                <ThemeProvider theme={theme}>
                  {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                  <CssBaseline />
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </ThemeProvider>
              </CacheProvider>
            </RainbowKitProvider>
          </WagmiConfig>
        </Hydrate>
        {/* <ReactQueryDevtools initialIsOpen={false} />  */}
      </QueryClientProvider>
    </SessionProvider>
  )
}
