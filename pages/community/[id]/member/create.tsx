import { Person as PersonIcon } from '@mui/icons-material';
import { Box, Card, CardContent, CardHeader , Grid } from '@mui/material';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import AuthGuard from '../../../../components/AuthGuard';
import MemberProfileForm, { memberProfileFormDefault } from '../../../../components/MemberProfileForm';
import PageLoading from '../../../../components/PageLoading';
import { useCommunity } from '../../../../hooks/useCommunities';
import { useCreateMember, useMemberInCommunity } from '../../../../hooks/useMember';
import { MemberProfileInfo, MemberProfileRequest } from '../../../../types';

const MemberCreatePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const { data: community, isLoading: loadingCommunity } = useCommunity(id);
  const { data: member } = useMemberInCommunity(
    id,
    `${session?.user?.profile.username}#${session?.user?.profile.discriminator}`
  );
  const { mutate: createMember, isLoading } = useCreateMember();

  const onSubmit = useCallback((profileInfo: MemberProfileInfo) => {
    const payload = {
      ...profileInfo,
      communityId: community?.shortId,
    };
    createMember(payload as MemberProfileRequest);
  }, []);

  React.useEffect(() => {
    if (!session?.user) {
      router.push(`/community/${id}/login`);
    }
  }, [session]);

  React.useEffect(() => {
    if (!community && !loadingCommunity) {
      router.push(`/community`);
    }
  }, [community, loadingCommunity]);

  React.useEffect(() => {
    if (member) {
      router.push(`/community/${id}`);
    }
  }, [member]);

  if (!session?.user || loadingCommunity) {
    return <PageLoading />;
  }

  return (
    <AuthGuard>
          <Grid container spacing={2} display="flex" justifyContent="center" alignItems="center" mb={20} >
              <Grid item xs={12} sm={6}>

                  <Box >
           <Card sx={{ overflow: 'visible', background: '#FCFDF0', boxShadow: '2px 10px 45px #E5ECE3', mx: 4 }}>
            <CardHeader avatar={<PersonIcon sx={{ color: '#4AAA7B' }} />} title="Create Profile" titleTypographyProps={{ variant: 'h6', color: '#4AAA7B' }} />
            <CardContent sx={{ padding: 4 }}>
              <MemberProfileForm
                member={{
                  ...memberProfileFormDefault,
                  email: session.user.email,
                  username: session.user.name,
                  discordHandle: `${session.user.profile.username}#${session.user.profile.discriminator}`,
                  logoUrl: session.user.picture,
                }}
                onSubmit={onSubmit}
                submitting={isLoading}
                submitText="Complete Profile"
              />
            </CardContent>
          </Card>
                  </Box>
              </Grid>
          </Grid>
    
    </AuthGuard>
  );
};

export default MemberCreatePage;
