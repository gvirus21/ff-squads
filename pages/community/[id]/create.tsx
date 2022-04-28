import { Box, Card, CardContent, CardHeader } from '@mui/material';
import type { NextPage } from 'next';

import AuthGuard from '../../../components/AuthGuard';
import MemberProfileForm from '../../../components/MemberProfileForm';

const CreatePage: NextPage = () => {
  return (
    // <AuthGuard>
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box sx={{ width: '50vw' }}>
        <Card sx={{ overflow: 'visible' }}>
          <CardHeader title="Create Profile" />
          <CardContent sx={{ padding: 4 }}>
            <MemberProfileForm />
          </CardContent>
        </Card>
      </Box>
    </Box>
    // </AuthGuard>
  );
};

export default CreatePage;
