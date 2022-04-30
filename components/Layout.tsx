import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
          <Box sx={{ pt: 12 }}>{children}</Box>
      <Footer />
    </>
  );
}
