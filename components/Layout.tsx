import { Box } from '@mui/material'
import Footer from './Footer'
import Header from './Header'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Box sx={{ pt: 8, pb: 13 }}>{children}</Box>
      <Footer />
    </>
  )
}
