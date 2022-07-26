import { Person as PersonIcon } from '@mui/icons-material'
import { Box, Card, CardContent, CardHeader, Grid } from '@mui/material'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'

import PageLoading from 'components/common/PageLoading'
import AuthGuard from 'components/layout/AuthGuard'
import MemberProfileForm, { memberProfileFormDefault } from 'components/member/MemberProfileForm'
import { useCommunity } from 'hooks/useCommunity'
import { useCreateMember, useMemberInCommunity } from 'hooks/useMember'
import { MemberProfileInfo, MemberProfileRequest } from 'types'

const MemberCreatePage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: session } = useSession()
  const { data: community, isLoading: loadingCommunity } = useCommunity(id)
  const { data: member } = useMemberInCommunity(
    id,
    `${session?.user?.profile.username}#${session?.user?.profile.discriminator}`
  )
  const { mutate: createMember, isLoading } = useCreateMember()

  const onSubmit = useCallback((profileInfo: MemberProfileInfo) => {
    const payload = {
      ...profileInfo,
      communityId: community?.shortId,
    }
    createMember(payload as MemberProfileRequest)
  }, [])

  React.useEffect(() => {
    if (!session?.user) {
      router.push(`/community/${id}/login`)
    }
  }, [session])

  React.useEffect(() => {
    if (!community && !loadingCommunity) {
      router.push(`/community`)
    }
  }, [community, loadingCommunity])

  React.useEffect(() => {
    if (member) {
      router.push(`/community/${id}`)
    }
  }, [member])

  if (!session?.user || loadingCommunity) {
    return <PageLoading />
  }

  return (
    <AuthGuard>
      <Grid container spacing={2} display="flex" justifyContent="center" alignItems="center" mb={2}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ overflow: 'visible' }}>
            <CardHeader
              avatar={<PersonIcon sx={{ fontSize: '22px' }} />}
              title="Create Profile"
              titleTypographyProps={{
                color: '#CDFCB1',
                fontWeight: 600,
                fontSize: '16px',
              }}
            />
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
        </Grid>
      </Grid>
    </AuthGuard>
  )
}

export default MemberCreatePage
