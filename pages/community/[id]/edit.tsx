import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import React, { useCallback } from 'react'

import AuthGuard from 'components/layout/AuthGuard'
import CommunityProfileForm from 'components/community/CommunityProfileForm'
import CommunityFormIcon from 'components/icons/CommunityFormIcon'
import Page from 'components/common/Page'
import PageLoading from 'components/common/PageLoading'
import { useCommunity, useUpdateCommunity } from 'hooks/useCommunity'
import { CommunityProfileInfo } from 'types'

const CommunityEditPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { data: community, isLoading: loadingCommunity } = useCommunity(id)
  const { mutate: updateCommunity, isLoading } = useUpdateCommunity(id as string, {
    onSuccess: () => {
      router.push('/community')
    },
  })

  const onSubmit = useCallback((info: CommunityProfileInfo) => {
    const payload = new FormData()
    payload.append('name', info.name)
    payload.append('description', info.description)
    payload.append('socialIds', JSON.stringify(info.socialIds))
    payload.append('socialLinks', JSON.stringify(info.socialLinks))
    payload.append('tokenInfo', JSON.stringify(info.tokenInfo))
    if (info.coverFile && info.coverFile.length > 0) {
      payload.append('coverFile', info.coverFile[0], info.coverFile[0].name)
    }
    if (info.logoFile && info.logoFile.length > 0) {
      payload.append('logoFile', info.logoFile[0], info.logoFile[0].name)
    }
    if (info.ensDomain) {
      payload.append('ensDomain', info.ensDomain)
    }
    payload.append('minimumHoldingForMembership', info.minimumHoldingForMembership.toString())
    updateCommunity(payload)
  }, [])

  if (!community || loadingCommunity) return <PageLoading />

  return (
    <Page title={`Edit ${community.name || ''} Community Profile | Member Directory | Forefront`}>
      <AuthGuard>
        <>
          <Grid container spacing={2} display="flex" justifyContent="center" alignItems="center" mt={1} mb={4}>
            <Grid item xs={12} sm={6}>
              <Card sx={{ overflow: 'visible', boxShadow: '4px 10px 35px rgba(245, 255, 244, 0.2)' }}>
                <CardHeader
                  avatar={<CommunityFormIcon color="success" />}
                  title="Edit Community Profile"
                  titleTypographyProps={{
                    color: '#CDFCB1',
                    fontWeight: 600,
                    fontSize: '16px',
                  }}
                />
                <CardContent sx={{ padding: 4 }}>
                  <CommunityProfileForm community={community} onSubmit={onSubmit} submitting={isLoading} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      </AuthGuard>
    </Page>
  )
}

export default CommunityEditPage
