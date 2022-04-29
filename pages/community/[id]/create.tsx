import { Box, Card, CardContent, CardHeader } from '@mui/material';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

import AuthGuard from '../../../components/AuthGuard';
import MemberProfileForm from '../../../components/MemberProfileForm';
import { useMemberInCommunity } from '../../../hooks/useMember';

const CreatePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  console.log(session?.user);
  const { data: member } = useMemberInCommunity(id, session?.user);
  React.useEffect(() => {}, []);

  return (
    <AuthGuard>
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
    </AuthGuard>
  );
};

export default CreatePage;
