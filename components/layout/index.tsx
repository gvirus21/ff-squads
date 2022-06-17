import { Box } from '@mui/material'

import Footer from 'components/layout/Footer'
import Header from 'components/layout/Header'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Box>{children}</Box>
      <Footer />
    </>
  )
}
