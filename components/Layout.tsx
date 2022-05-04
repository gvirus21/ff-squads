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
      <Box sx={{ pt: 12, pb: 20 }}>{children}</Box>
      <Footer />
    </>
  )
}
