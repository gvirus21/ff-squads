import { CacheProvider, EmotionCache } from '@emotion/react'
import { Web3Provider } from '@ethersproject/providers'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Web3ReactProvider } from '@web3-react/core'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import * as React from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import Web3ReactManager from '../components/Web3ReactManager'
import Layout from '../components/Layout'
import createEmotionCache from '../config/createEmotionCache'
import theme from '../config/theme'

const Web3ProviderNetwork = dynamic(() => import('../components/Web3ProviderNetwork'), { ssr: false })

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function getLibrary(provider: any) {
  return new Web3Provider(provider)
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
              <CacheProvider value={emotionCache}>
                <Head>
                  <meta name="viewport" content="initial-scale=1, width=device-width" />
                </Head>
                <ThemeProvider theme={theme}>
                  {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                  <CssBaseline />
                  <Web3ReactManager>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </Web3ReactManager>
                </ThemeProvider>
              </CacheProvider>
            </Web3ProviderNetwork>
          </Web3ReactProvider>
        </Hydrate>
              {/* <ReactQueryDevtools initialIsOpen={false} />  */}
      </QueryClientProvider>
    </SessionProvider>
  )
}
