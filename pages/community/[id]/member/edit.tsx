import { Person as PersonIcon } from '@mui/icons-material';
import { Box, Card, CardContent, CardHeader } from '@mui/material';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import AuthGuard from '../../../../components/AuthGuard';
import MemberProfileForm from '../../../../components/MemberProfileForm';
import PageLoading from '../../../../components/PageLoading';
import { useCommunity } from '../../../../hooks/useCommunities';
import { useCreateMember, useMemberInCommunity } from '../../../../hooks/useMember';
import { MemberProfileInfo, MemberProfileRequest } from '../../../../types';

const MemberEditPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const { data: community, isLoading: loadingCommunity } = useCommunity(id);
  const { data: member } = useMemberInCommunity(
    id,
    `${session?.user?.profile.username}#${session?.user?.profile.discriminator}`
  );
  const { mutate: editMember, isLoading } = useCreateMember();

  const onSubmit = useCallback((profileInfo: MemberProfileInfo) => {
    const payload = {
      ...profileInfo,
      communityId: community?.shortId,
    };
    editMember(payload as MemberProfileRequest);
  }, []);
  console.log('id: ', id);

  // React.useEffect(() => {
  //   if (!session?.user) {
  //     router.push(`/community/${id}/login`);
  //   }
  // }, [session]);

  // React.useEffect(() => {
  //   if (!community && !loadingCommunity) {
  //     router.push(`/community`);
  //   }
  // }, [community, loadingCommunity]);

  // React.useEffect(() => {
  //   if (!member) {
  //     router.push(`/community/${id}`);
  //   }
  // }, [member]);

  if (!session?.user || loadingCommunity || !member) {
    return <PageLoading />;
  }

  return (
    <AuthGuard>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box sx={{ width: '50vw' }}>
          <Card sx={{ overflow: 'visible' }}>
            <CardHeader avatar={<PersonIcon />} title="Edit Profile" titleTypographyProps={{ variant: 'h6' }} />
            <CardContent sx={{ padding: 4 }}>
              <MemberProfileForm member={member} onSubmit={onSubmit} submitting={isLoading} />
            </CardContent>
          </Card>
        </Box>
      </Box>
    </AuthGuard>
  );
};

export default MemberEditPage;
