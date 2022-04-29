import { Box, Container } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import AuthGuard from '../../../components/AuthGuard';

export default function DaoMemberPage() {
  return (
    <AuthGuard>
      <Container>
        <Box py={12}>DAO Member Page</Box>
      </Container>
    </AuthGuard>
  );
}
