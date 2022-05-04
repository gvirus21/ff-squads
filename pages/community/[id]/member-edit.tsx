import { Person as PersonIcon } from '@mui/icons-material'
import { Box, Card, CardContent, CardHeader, Grid } from '@mui/material'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'

import AuthGuard from '../../../components/AuthGuard'
import MemberProfileForm from '../../../components/MemberProfileForm'
import PageLoading from '../../../components/PageLoading'
import { useCommunity } from '../../../hooks/useCommunities'
import { useMemberInCommunity, useUpdateMember } from '../../../hooks/useMember'
import { MemberProfileInfo, MemberProfileRequest } from '../../../types'

const MemberEditPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: session } = useSession()
  const { data: community, isLoading: loadingCommunity } = useCommunity(id)
  const { data: member, isError: isMemberError } = useMemberInCommunity(
    id,
    `${session?.user?.profile.username}#${session?.user?.profile.discriminator}`
  )
  const { mutate: editMember, isLoading } = useUpdateMember(member?._id ?? '')

  const onSubmit = useCallback((profileInfo: MemberProfileInfo) => {
    const payload = {
      ...profileInfo,
      communityId: community?.shortId,
    }
    editMember(payload as MemberProfileRequest)
  }, [])

  React.useEffect(() => {
    if (!community && !loadingCommunity) {
      router.push(`/community`)
    }
  }, [community, loadingCommunity])

  React.useEffect(() => {
    if (isMemberError) {
      router.push(`/community/${id}`)
    }
  }, [isMemberError])

  if (!session?.user || loadingCommunity || !member) {
    return <PageLoading />
  }

  return (
    <AuthGuard>
      <Grid container spacing={2} display="flex" justifyContent="center" alignItems="center" mb={2}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ overflow: 'visible' }}>
            <CardHeader
              avatar={<PersonIcon color="success" />}
              title="Edit Profile"
              titleTypographyProps={{
                color: '#CDFCB1',
                fontWeight: 600,
                fontSize: '16px',
              }}
            />
            <CardContent>
              <MemberProfileForm member={member} onSubmit={onSubmit} submitting={isLoading} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AuthGuard>
  )
}

export default MemberEditPage
